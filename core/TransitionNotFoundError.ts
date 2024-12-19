export class TransitionNotFoundError extends Error {
  constructor(sourceState: unknown) {
    const message = `Transition for state: ${sourceState} does not exist.`

    super(message)
  }
}
