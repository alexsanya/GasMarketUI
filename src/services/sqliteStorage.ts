import { Storage, Status } from './storage'

class SqliteStorage extends Storage {
  async store(order: Order): Promise<Result> {
    return {
      status: Status.SUCCESS
    }
  }

  async find(filter: Filter, pagination: Pagination): Promise<Page<Order>> {
    return {
      offset: 0,
      count: 1,
      total: 1,
      data: [
        {
          signer: '0xd733dE10b28D6AEe6C54B452D1C6856AC34234e4',
          token: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
          value: 50000000n,
          deadline: 1698709687,
          reward: 10000000n,
          permitSignature: '0xfe828b245d2c93730fbbd0443bc3d6a2d31227e2fe4f7fcae24c4b325b349750268388e0c3e2e9bc2c82b7ea3e490204eefcc8dd08b214b9c782ffbf7aeb287b1c',
          rewardSignature: '0xf93ba70a7f4664cf0771605561daa8d6c3226fe88757bd0b3299af5983d6b7164126f9152122513cc789f85ddfabd26169eca01eedd113a665614cfee59d58501b'
        }
      ]
    }
  }
}

export default new SqliteStorage()
