import { inject } from '@angular/core'
import { TransitionStore } from './TransitionStore'
import { Store } from '@ngrx/store'
import { Transitions } from './types'

export function provideTransitionStore<S>(transitions: Transitions<S>) {
  return {
    provide: TransitionStore,
    useFactory: () => new TransitionStore(inject(Store), transitions),
  }
}
