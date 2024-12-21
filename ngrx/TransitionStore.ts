import { Store } from '@ngrx/store'
import { BasicAction, Transitions } from './types'
import { validateTransition } from './validateTransition'
import { firstValueFrom } from 'rxjs'

export class TransitionStore<S = unknown> {
  constructor(
    private store: Store,
    private transitions: Transitions<S>
  ) {}

  public select(...args: Parameters<typeof this.store.select>): ReturnType<typeof this.store.select> {
    return this.store.select(...args)
  }

  public selectSignal(...args: Parameters<typeof this.store.selectSignal>): ReturnType<typeof this.store.selectSignal> {
    return this.store.selectSignal(...args)
  }

  public pipe(...args: Parameters<typeof this.store.pipe>): ReturnType<typeof this.store.pipe> {
    return this.store.pipe(...args)
  }

  public subscribe(...args: Parameters<typeof this.store.subscribe>): ReturnType<typeof this.store.subscribe> {
    return this.store.subscribe(...args)
  }

  public dispatch<A extends BasicAction>(action: A): void {
    firstValueFrom(this.store.pipe()).then((state) => {
      // @ts-expect-error TODO improve typing
      validateTransition(state, action, this.transitions)

      // @ts-expect-error TODO improve typing
      this.store.dispatch(action)
    })
  }
}
