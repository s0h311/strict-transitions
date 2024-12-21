import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { Store } from '@ngrx/store'

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor(private store: Store) {}
}
