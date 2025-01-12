import { createPinia } from 'pinia'
import { TransitionsByStoreId } from './types.ts'
import { validateTransition } from './validateTransition.ts'

type PiniaUseCallback = Parameters<ReturnType<typeof createPinia>['use']>[0]
type PiniaUseCallbackArgs = Parameters<PiniaUseCallback>[0]

export function transitions<S>(storeTransitionMap: TransitionsByStoreId<S>): PiniaUseCallback {
  return ({ store }: PiniaUseCallbackArgs) => {
    const transitions = storeTransitionMap[store.$id]

    if (!transitions) {
      return
    }

    store.$onAction(({ name, store }) => {
      validateTransition(store.items, name, transitions)
    })
  }
}
