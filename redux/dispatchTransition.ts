import {BasicAction, TransitionStore} from './types'
import {validateTransition} from './validateTransition'

/**
 * Dispatches a transition action.
 * @template S - The type of the state.
 * @template A - The type of the action.
 * @this {TransitionStore<S, A>}
 * @param action - The action to be dispatched.
 */
export function dispatchTransition<S, A extends BasicAction>(this: TransitionStore<S, A>, action: BasicAction): void {
  validateTransition(this.getState(), action, this.transitions)

  this.dispatch(action)
}
