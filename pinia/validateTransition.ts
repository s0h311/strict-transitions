import { Transitions } from './types'
import { IllegalTransitionError } from '../core/IllegalTransitionError'
import { TransitionNotFoundError } from '../core/TransitionNotFoundError'

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
