export type Transition<S, A> = {
  condition: (state: S) => boolean
  action: A
} & (
  | {
  nextState: S
}
  | {
  usePayload: true
}
  )

export type Transitions<S, A> = Transition<S, A>[]

export type Action<P> =
  | {
  type: string
}
  | {
  type: string
  payload: P
}