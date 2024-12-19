import { Transitions, TransitionStore } from './types'
import { legacy_createStore as createStore } from 'redux'
import { validateTransition } from './validateTransition.ts'
import { dispatchTransition } from './dispatchTransition.ts'

export function createTransitionStore<S>(
  transitions: Transitions<S>,
  ...args: Parameters<typeof createStore>
): TransitionStore<S> {
  const store = createStore(...args)

  Object.defineProperty(store, 'transitions', {
    value: transitions,
  })

  Object.defineProperty(store, 'validateTransition', {
    value: validateTransition,
  })

  Object.defineProperty(store, 'dispatchTransition', {
    value: dispatchTransition,
  })

  return store as unknown as TransitionStore<S>
}
