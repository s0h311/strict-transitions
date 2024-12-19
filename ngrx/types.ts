export type Transition<S> = {
  condition: (state: S) => boolean
  actions: BasicAction[]
}

export type Transitions<S> = Transition<S>[]

export type BasicAction = {
  type: string
}
