import {Transitions} from './types.ts'

/**
 * Creates a list of state transitions.
 * @template S - The type of the state.
 * @param transitions - The list of transitions to be created.
 * @returns The list of created transitions.
 */
export function createTransitions<S>(transitions: Transitions<S>): Transitions<S> {
  return transitions
}
