import { inject } from '@angular/core'
import { TransitionStore } from './TransitionStore.ts'
import { Store } from '@ngrx/store'
import { Transitions } from './types.ts'

export function provideTransitionStore<S>(transitions: Transitions<S>) {
  return { useFactory: () => new TransitionStore(inject(Store), transitions) }
}
