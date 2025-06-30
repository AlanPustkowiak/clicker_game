import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'clicker_game';

  clickCount = signal<number>(0);

  protected onClick(): void {
    this.clickCount.update(count => count + 1);
  }
}
