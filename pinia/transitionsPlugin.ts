import { createPinia } from 'pinia'
import { TransitionsByStoreId } from './types.ts'
import { validateTransition } from './validateTransition.ts'

type PiniaUseCallback = Parameters<ReturnType<typeof createPinia>['use']>[0]
type PiniaUseCallbackArgs = Parameters<PiniaUseCallback>[0]

/**
 * Pinia plugin that enforces state transitions according to defined rules.
 * This plugin validates state transitions based on the provided transition definitions.
 *
 * @template S - The state type the transitions will operate on
 * @param {TransitionsByStoreId<S>} transitionsByStoreId - Object mapping store IDs to their transition configurations
 * @returns {PiniaUseCallback} A Pinia plugin function
 */
export function transitions<S>(transitionsByStoreId: TransitionsByStoreId<S>): PiniaUseCallback {
  return ({ store }: PiniaUseCallbackArgs) => {
    const transitions = transitionsByStoreId[store.$id]

    if (transitions !== undefined) {
      store.$onAction(({ name, store }) => {
        validateTransition(store.$state, name, transitions)
      })
    }
  }
}
