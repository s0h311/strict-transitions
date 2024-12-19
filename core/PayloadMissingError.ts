export class PayloadMissingError extends Error {
  constructor(actionType: string) {
    const message = `Action with type: ${actionType} is missing the payload property.`

    super(message);
  }
}