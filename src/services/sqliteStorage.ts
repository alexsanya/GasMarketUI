import { Sequelize, DataTypes, Op } from 'sequelize';
import { Storage, Status, Filter, Pagination } from './storage'

const sequelize = new Sequelize('sqlite::memory:');

const Order = sequelize.define('Order', {
  signer: DataTypes.STRING,
  token: DataTypes.STRING,
  value: DataTypes.INTEGER,
  deadline: DataTypes.INTEGER,
  reward: DataTypes.INTEGER,
  permitSignature: DataTypes.STRING,
  rewardSignature: DataTypes.STRING
});

class SqliteStorage extends Storage {

  synced: boolean = false

  async sync() {
    if (!this.synced) {
      await Order.sync()
      this.synced = true
    }
  }

  async store(order: Order): Promise<Result> {
    await this.sync()
    const existingOrder = await Order.findOne({
      where: {
        rewardSignature: order.rewardSignature
      }
    })
    if (existingOrder) {
      return {
        status: Status.FAILURE
      }
    }
    try {
      await Order.create(order)
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
    console.log(result)
    return result
  }
}

export default new SqliteStorage()
