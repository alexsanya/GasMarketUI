import { Sequelize, DataTypes, Op } from 'sequelize'
import { Storage, Status, Filter, Pagination } from './storage'
import { keccak256 } from 'viem'
import { ORDER_MAX_TTL_SEC, DB_FILE } from '../config'

const sequelize = new Sequelize({
  storage: DB_FILE,
  dialect: 'sqlite'
});

const Order = sequelize.define('Order', {
  permitHash: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  signer: DataTypes.STRING,
  token: DataTypes.STRING,
  value: DataTypes.INTEGER,
  deadline: DataTypes.INTEGER,
  reward: DataTypes.INTEGER,
  permitSignature: DataTypes.STRING,
  rewardSignature: DataTypes.STRING
})

const Block = sequelize.define('Block', {
  timestamp: DataTypes.NUMBER
})

class SqliteStorage extends Storage {

  synced: boolean = false

  async sync() {
    if (!this.synced) {
      await Order.sync()
      await Block.sync()
      this.synced = true
    }
  }

  async store(order: Order): Promise<Result> {
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
        permitHash
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

  async find(filter: Filter, pagination: Pagination): Promise<Page<Order>> {
    await this.sync()
    const result = await Order.findAndCountAll({
      where: {
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

  async cleanUp(timestamp: BigInt, closedOrders: string[]) {
    await this.sync()
    await Order.destroy({
      where: {
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

export default new SqliteStorage()
