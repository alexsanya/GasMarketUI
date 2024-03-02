import { signal } from '@preact/signals-react'

export enum OrderState {
  BLANK,
  SUBMITTED,
  INVALID,
  BROADCASTED,
  EXPIRED,
  REVERTED,
  COMPLETED
}

export const reward = signal(0)
export const lifetime = signal(0)
export const state = signal(OrderState.BLANK)
