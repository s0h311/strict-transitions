import {BasicAction, Transitions} from './types'
import {IllegalTransitionError} from '../core/IllegalTransitionError'
import {TransitionNotFoundError} from '../core/TransitionNotFoundError'

/**
 * Validates a state transition.
 * @template S - The type of the state.
 * @template A - The type of the action.
 * @param state - The current state.
 * @param action - The action to be dispatched.
 * @param transitions - The list of possible transitions.
 * @throws {IllegalTransitionError} If the transition is illegal.
 * @throws {TransitionNotFoundError} If no transition is found.
 */
export function validateTransition<S, A extends BasicAction>(state: S, action: A, transitions: Transitions<S>): void {
  for (const transition of transitions) {
    if (transition.identityFn(state)) {
      if (transition.actionTypes.includes(action.type)) {
        return
      }

      throw new IllegalTransitionError(state, action.type)
    }
  }

  throw new TransitionNotFoundError(state)
}
