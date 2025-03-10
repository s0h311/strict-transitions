import {Transitions, TransitionStore} from './types'
import {legacy_createStore as createStore} from 'redux'
import {validateTransition} from './validateTransition.ts'
import {dispatchTransition} from './dispatchTransition.ts'

/**
 * Creates a store with state transitions.
 * @template S - The type of the state.
 * @param transitions - The list of state transitions.
 * @param args - Additional arguments for creating the store.
 * @returns The created transition store.
 */
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

  // TODO improve typing
  return store as unknown as TransitionStore<S>
}
