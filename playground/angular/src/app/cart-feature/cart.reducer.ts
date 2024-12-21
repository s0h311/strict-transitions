import { createReducer, on } from '@ngrx/store'
import { Cart } from './cart.types'
import { cartFetchAction, cartFetchFailedAction, cartFetchSuccessfulAction } from './cart.actions'

export const cartReducer = createReducer<Cart>(
  'not-fetched',
  on(cartFetchAction, () => 'fetching'),
  on(cartFetchSuccessfulAction, (_, action) => action.items),
  on(cartFetchFailedAction, (_, action) => action.error)
)
