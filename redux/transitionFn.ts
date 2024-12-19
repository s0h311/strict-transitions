import {Action, Transitions} from "./types";
import {PayloadMissingError} from "../core/PayloadMissingError";
import {IllegalTransitionError} from "../core/IllegalTransitionError";

export function transitionFn<S, A extends Action<S>>(
  state: S,
  action: A,
  transitions: Transitions<S, A['type']>
): S {
  for (const transition of transitions) {
    if (!transition.condition(state) || transition.action !== action.type) {
      continue
    }

    if ('nextState' in transition) {
      return transition.nextState
    }

    if ('payload' in action) {
      return action.payload
    }

    throw new PayloadMissingError(action.type)
  }

  throw new IllegalTransitionError(state, action.type)
}
