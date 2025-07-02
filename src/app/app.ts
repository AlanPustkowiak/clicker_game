import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Upgrade, ShopComponent } from './shop';

@Component({
  selector: 'app-root',
  imports: [ShopComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'clicker_game';

  clickCount = signal<number>(0);
  clickValue = signal<number>(1);

  upgrades = signal<Upgrade[]>([
    {
      id: 'double_click',
      name: 'Double click',
      description: 'Double the points per click',
      cost: 20,
      effect: 2,
      purchased: false
    },
    {
      id: 'mega_click',
      name: 'Mega click',
      description: '5 points per click',
      cost: 100,
      effect: 5,
      purchased: false
    }
  ])

  protected onClick(): void {
    this.clickCount.update(count => count + this.clickValue());
  }

  onPurchase(upgrade: Upgrade): void {
    if(this.clickCount() >= upgrade.cost && !upgrade.purchased){
      this.clickCount.update(count => count - upgrade.cost);
      this.clickValue.set(upgrade.effect);

      this.upgrades.update(upgrades => upgrades.map(u => u.id === upgrade.id ? { ...u, purchased: true } : u));
    }
  }

  shouldShowShop(): boolean {
    return this.clickCount() > 10 || this.upgrades().some(u => u.purchased);
  }
}
