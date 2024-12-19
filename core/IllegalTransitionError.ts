export class IllegalTransitionError extends Error {
  constructor(sourceState: unknown, actionType: string) {
    const message = `Transitioning from: ${sourceState} with action: ${actionType} is not allowed.`

    super(message);
  }
}