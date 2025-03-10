/**
 * Defines a state transition with an identity function and allowed actions.
 *
 * @template S - The state type the transition will operate on
 */
export type Transition<S> = {
  /** Function to identify if the transition is valid for the current state */
  identityFn: (state: S) => boolean
  /** List of actions allowed for the current state */
  actions: string[]
}

/**
 * An array of transition definitions.
 *
 * @template S - The state type the transitions will operate on
 */
export type Transitions<S> = Transition<S>[]

/**
 * Maps store IDs to their transition configurations.
 *
 * @template S - The state type the transitions will operate on
 */
export type TransitionsByStoreId<S> = {
  [storeId: string]: Transitions<S>
}
