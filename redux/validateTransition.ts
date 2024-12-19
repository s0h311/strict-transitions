import { BasicAction, Transitions } from './types'
import { IllegalTransitionError } from '../core/IllegalTransitionError'
import { TransitionNotFoundError } from '../core/TransitionNotFoundError'

export function validateTransition<S, A extends BasicAction>(state: S, action: A, transitions: Transitions<S>): void {
  for (const transition of transitions) {
    if (transition.condition && transition.condition(state)) {
      if (transition.actionTypes.includes(action.type)) {
        return
      }

      throw new IllegalTransitionError(state, action.type)
    }
  }

  throw new TransitionNotFoundError(state)
}
