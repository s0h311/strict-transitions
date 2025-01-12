export class IllegalTransitionError extends Error {
  constructor(sourceState: unknown, action: string) {
    const message = `Transitioning from: ${sourceState} with action: ${action} is not allowed.`

    super(message)
  }
}
