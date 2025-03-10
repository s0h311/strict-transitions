import {Transitions} from './types'
import {IllegalTransitionError} from '../core/IllegalTransitionError'
import {TransitionNotFoundError} from '../core/TransitionNotFoundError'

/**
 * Validates if a requested state transition is allowed based on the current state and transition rules.
 * This function ensures that actions are only dispatched when permitted by the state machine configuration.
 *
 * @template S - The state type the transitions operate on
 * @param {S} state - The current state of the store
 * @param {string} action - The name of the action being executed
 * @param {Transitions<S>} transitions - Array of transition definitions
 * @throws {IllegalTransitionError} When an action is not allowed for the current state
 * @throws {TransitionNotFoundError} When no transition configuration matches the current state
 */
export function validateTransition<S, A extends string>(state: S, action: A, transitions: Transitions<S>): void {
  for (const transition of transitions) {
    if (transition.identityFn(state)) {
      if (transition.actions.includes(action)) {
        return
      }

      throw new IllegalTransitionError(state, action)
    }
  }

  throw new TransitionNotFoundError(state)
}
