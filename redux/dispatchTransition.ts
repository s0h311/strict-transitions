import { BasicAction, TransitionStore } from './types'
import { validateTransition } from './validateTransition'

export function dispatchTransition<S, A extends BasicAction>(this: TransitionStore<S, A>, action: BasicAction): void {
  validateTransition(this.getState(), action, this.transitions)

  this.dispatch(action)
}
