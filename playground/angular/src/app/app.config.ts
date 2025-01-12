import { ApplicationConfig, isDevMode, provideZoneChangeDetection } from '@angular/core'
import { provideRouter } from '@angular/router'

import { routes } from './app.routes'
import { provideStore } from '@ngrx/store'
import { provideStoreDevtools } from '@ngrx/store-devtools'
import { cartReducer } from './cart-feature/cart.reducer'
import { provideTransitionStore } from '../../../../ngrx/provideTransitionStore'
import { cartFetchAction, cartFetchFailedAction, cartFetchSuccessfulAction } from './cart-feature/cart.actions'
import { Cart } from './cart-feature/cart.types'

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore([cartReducer]),
    provideTransitionStore([
      {
        identityFn: (state: Record<number, Cart>) => state[0] === 'not-fetched',
        actions: [cartFetchAction],
      },
      {
        identityFn: (state: Record<number, Cart>) => state[0] === 'fetching',
        actions: [cartFetchSuccessfulAction, cartFetchFailedAction],
      },
    ]),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  ],
}
