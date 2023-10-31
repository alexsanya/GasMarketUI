import { Sequelize, DataTypes } from 'sequelize';
import { Storage, Status } from './storage'

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

  synced: boolean = false;

  async sync() {
    if (!this.synced) {
      await Order.sync()
      this.synced = true
    }
  }

  async store(order: Order): Promise<Result> {
    await this.sync()
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

  async find(filter: Filter, pagination: Pagination): Promise<Page<Order>> {
    await this.sync()
    const result = await Order.findAndCountAll({

    })
    console.log(result)
    return result
  }
}

export default new SqliteStorage()
