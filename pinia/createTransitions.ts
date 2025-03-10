/**
 * Utility functions for creating and typing state transitions.
 * This module provides a way to define valid state transitions for state management.
 */

import {Transitions} from './types.ts'

/**
 * Creates a strongly-typed transitions definition for state machines.
 * This function serves as a type-safe wrapper for defining transitions
 * between different states in a state machine.
 *
 * @template S - The state type the transitions will operate on
 * @param {Transitions<S>} transitions - Array of transition definitions
 * @returns {Transitions<S>} The same transitions with proper typing
 */
export function createTransitions<S>(transitions: Transitions<S>): Transitions<S> {
  return transitions
}
