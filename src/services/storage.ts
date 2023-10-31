interface Order {
  signer: string,
  token: string,
  value: BigInt,
  deadline: number,
  reward: BigInt,
  permitSignature: string,
  rewardSignature: string
}

export enum Status {
  SUCCESS,
  FAILURE
}

interface Result {
  status: STATUS,
  error?: any
}

interface Page<Type> {
  offset: number;
  count: number;
  total: number;
  data: Type[]
}

export interface Pagination {
  offset?: number;
  limit?: number;
}

interface Range<Type> {
  from: Type,
  to: Type
}

export interface Filter {
  signers?: string[],
  tokens?: string[],
  value?: Range<BigInt>,
  deadline?: Range<number>,
  reward: Range<BigInt>
}

export abstract class Storage {
  abstract async store(order: Order): Promise<Result>;
  abstract async find(filter: Filter, pagination: Pagination): Promise<Page<Order>>;
}
