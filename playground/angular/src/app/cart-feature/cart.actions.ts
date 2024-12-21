import { createAction, props } from '@ngrx/store'
import { Item } from './cart.types'

export const cartFetchAction = createAction('cart-fetch')
export const cartFetchSuccessfulAction = createAction('cart-fetch-successful', props<{ items: Item[] }>())
export const cartFetchFailedAction = createAction('cart-fetch-failed', props<{ error: Error }>())
