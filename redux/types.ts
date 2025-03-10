import {Store} from 'redux'

/**
 * Represents a state transition.
 * @template S - The type of the state.
 */
export type Transition<S> = {
  /**
   * A function that checks if the transition is valid for the given state.
   * @param state - The current state.
   * @returns True if the transition is valid, otherwise false.
   */
  identityFn: (state: S) => boolean
  /**
   * The list of action types that trigger the transition.
   */
  actionTypes: string[]
}

/**
 * Represents a list of state transitions.
 * @template S - The type of the state.
 */
export type Transitions<S> = Transition<S>[]

/**
 * Represents a basic action with a type.
 */
export type BasicAction = {
  type: string
}

/**
 * Represents a store with state transitions.
 * @template S - The type of the state.
 * @template A - The type of the action.
 */
export type TransitionStore<S = unknown, A extends BasicAction = { type: string }> = {
  /**
   * Validates a state transition.
   * @param state - The current state.
   * @param action - The action to be dispatched.
   * @param transitions - The list of possible transitions.
   */
  validateTransition: (state: S, action: A, transitions: Transitions<S>) => void
  /**
   * The list of possible transitions.
   */
  transitions: Transitions<S>
  /**
   * Dispatches a transition action.
   * @param action - The action to be dispatched.
   */
  dispatchTransition: (this: TransitionStore<S, A>, action: BasicAction) => void
} & Store
