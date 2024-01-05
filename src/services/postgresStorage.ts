// @ts-nocheck

import pg from 'pg';
import { Sequelize, DataTypes, Op } from 'sequelize'
import { Storage, Status, Order as OrderType, Filter, Page, Pagination, Result } from './storage'
import { keccak256 } from 'viem'
import { getConfig } from '../config'

const sequelize = new Sequelize({
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  dialect: 'postgres',
  dialectModule: pg
});

const Order = sequelize.define('Order', {
  permitHash: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  networkId: DataTypes.INTEGER,
  active: DataTypes.BOOLEAN,
  signer: DataTypes.STRING,
  token: DataTypes.STRING,
  value: DataTypes.INTEGER,
  deadline: DataTypes.INTEGER,
  reward: DataTypes.INTEGER,
  permitSignature: DataTypes.STRING,
  rewardSignature: DataTypes.STRING
})

const Block = sequelize.define('Block', {
  timestamp: DataTypes.INTEGER
})

class PostgresStorage extends Storage {

  synced: boolean = false

  async sync() {
    if (!this.synced) {
      await Order.sync()
      await Block.sync()
      this.synced = true
    }
  }

  async store(order: OrderType): Promise<Result> {
    await this.sync()
    const permitHash = keccak256(order.permitSignature)
    const existingOrder = await Order.findOne({
      where: {
        permitHash
      }
    })
    if (existingOrder) {
      return {
        status: Status.FAILURE
      }
    }
    try {
      await Order.create({
        ...order,
        permitHash,
        active: true
      })
      return {
        status: Status.SUCCESS
      }
    } catch (error) {
      console.log(error)
      return {
        status: Status.FAILURE
      }
    }
  }

  getRangeQuery(from, to) {
    return {
      ...((from && to) ? {[Op.between]: [from, to]} : {}),
      ...((from && !to) ? {[Op.gte]: from} : {}),
      ...((!from && to) ? {[Op.lte]: to} : {})
    }
  }

  async find(filter: Filter, pagination: Pagination): Promise<Page<OrderType>> {
    await this.sync()
    const result = await Order.findAndCountAll({
      where: {
        active: true,
        ...(filter.networkIds ? {networkId: filter.networkIds} : {}),
        ...(filter.signers ? {signer: filter.signers} : {}),
        ...(filter.tokens ? {token: filter.tokens} : {}),
        ...(filter.value ? { value: this.getRangeQuery(filter.value.from, filter.value.to) } : {}),
        ...(filter.deadline ? { deadline: this.getRangeQuery(filter.deadline.from, filter.deadline.to) } : {}),
        ...(filter.reward ? { reward: this.getRangeQuery(filter.reward.from, filter.reward.to) } : {}),
      },
      ...pagination
    })
    return {
      count: Math.min(pagination?.limit || result.rows.length, result.rows.length),
      limit: pagination.limit || result.rows.length,
      offset: pagination.offset || 0,
      total: result.count,
      data: result.rows
    }
  }

  async getLatestBlock() {
    await this.sync()
    return (await Block.max('timestamp')) || 50029820
  }

  async cleanUp(timestamp: BigInt, closedOrders: string[], networkId: number) {
    const { ORDER_MAX_TTL_SEC } = getConfig(networkId)
    await this.sync()
    await Order.update({ active: false }, {
      where: {
        networkId,
        [Op.or]: {
          permitHash: closedOrders,
          deadline: {
            [Op.lt]: timestamp
          },
          createdAt: {
            [Op.lt]: new Date(Date.now() - ORDER_MAX_TTL_SEC * 1e3)
          }
        }
      }
    })
    await Block.create({timestamp})
  }
}

export default new PostgresStorage()
