import { Store } from 'redux'

export type Transition<S> = {
  identityFn: (state: S) => boolean
  actionTypes: string[]
}

export type Transitions<S> = Transition<S>[]

export type BasicAction = {
  type: string
}

export type TransitionStore<S = unknown, A extends BasicAction = { type: string }> = {
  validateTransition: (state: S, action: A, transitions: Transitions<S>) => void
  transitions: Transitions<S>
  dispatchTransition: (this: TransitionStore<S, A>, action: BasicAction) => void
} & Store
