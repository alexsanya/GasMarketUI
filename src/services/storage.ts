export interface Order {
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

export interface Result {
  status: Status,
  error?: any
}

export interface Page<Type> {
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
  abstract store(order: Order): Promise<Result>
  abstract find(filter: Filter, pagination: Pagination): Promise<Page<Order>>
  abstract cleanUp(timestamp: BigInt, closedOrders: string[]) 
}
