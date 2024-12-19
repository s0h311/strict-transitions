import { Store } from 'redux'

export type Transition<S> = {
  condition: (state: S) => boolean
  actionTypes: string[]
}

export type Transitions<S> = Transition<S>[]

export type BasicAction = {
  type: string
}

export type TransitionStore<S, A extends BasicAction> = {
  validateTransition: (state: S, action: A, transitions: Transitions<S>) => void
  transitions: Transitions<S>
} & Store
