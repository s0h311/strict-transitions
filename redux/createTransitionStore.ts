import { Transitions } from './types'
import { legacy_createStore as createStore } from 'redux'

export function createTransitionStore<S>(
  transitions: Transitions<S>,
  ...args: Parameters<typeof createStore>
): ReturnType<typeof createStore> {
  const store = createStore(...args)

  Object.defineProperty(store, 'transitions', {
    value: transitions,
  })

  return store
}
