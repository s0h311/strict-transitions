import { Store } from '@ngrx/store'
import { BasicAction, Transitions } from './types.ts'
import { validateTransition } from './validateTransition.ts'
import { firstValueFrom } from 'rxjs'

export class TransitionStore<S = unknown> {
  constructor(
    private store: Store,
    private transitions: Transitions<S>
  ) {}

  // @ts-expect-error TODO configure TS to understand DI
  public select = this.store.select
  // @ts-expect-error TODO configure TS to understand DI
  public selectSignal: typeof this.store.selectSignal = this.store.selectSignal
  // @ts-expect-error TODO configure TS to understand DI
  public pipe = this.store.pipe
  // @ts-expect-error TODO configure TS to understand DI
  public subscribe = this.store.subscribe

  public dispatchTransition(action: BasicAction): void {
    firstValueFrom(this.store.pipe()).then((state) => {
      // @ts-expect-error TODO improve typing
      validateTransition(state, action, this.transitions)

      this.store.dispatch(action)
    })
  }
}
