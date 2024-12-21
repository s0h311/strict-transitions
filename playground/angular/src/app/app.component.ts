import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { cartSelector } from './cart-feature/cart.selector'
import { JsonPipe } from '@angular/common'
import { cartFetchAction, cartFetchFailedAction, cartFetchSuccessfulAction } from './cart-feature/cart.actions'
import { TransitionStore } from '../../../../ngrx/TransitionStore'

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, JsonPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor(private store: TransitionStore) {}

  public cart = this.store.selectSignal(cartSelector)

  public fetch(): void {
    this.store.dispatch(cartFetchAction())
  }

  public fetchSuccessful(): void {
    this.store.dispatch(
      cartFetchSuccessfulAction({
        items: [
          {
            id: 1,
            name: 'item-1',
          },
          {
            id: 2,
            name: 'item-2',
          },
        ],
      })
    )
  }

  public fetchFailed(): void {
    this.store.dispatch(
      cartFetchFailedAction({
        error: new Error('fetch error'),
      })
    )
  }
}
