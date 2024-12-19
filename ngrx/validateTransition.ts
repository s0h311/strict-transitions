import { BasicAction, Transitions } from './types'
import { IllegalTransitionError } from '../core/IllegalTransitionError'
import { TransitionNotFoundError } from '../core/TransitionNotFoundError'

export function validateTransition<S>(state: S, action: BasicAction, transitions: Transitions<S>): void {
  for (const transition of transitions) {
    if (transition.condition && transition.condition(state)) {
      const allowedActionTypes = transition.actions.map(({ type }) => type)

      if (allowedActionTypes.includes(action.type)) {
        return
      }

      throw new IllegalTransitionError(state, action.type)
    }
  }

  throw new TransitionNotFoundError(state)
}
