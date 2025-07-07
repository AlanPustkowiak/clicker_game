import { Component, signal } from '@angular/core';
import { Upgrade, ShopComponent } from './shop';

interface FloatingAnimation{
  id: number;
  x: number;
  y: number;
  value: number;
  rotation: number;
}

@Component({
  selector: 'app-root',
  imports: [ShopComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'clicker_game';

  animations = signal<FloatingAnimation[]>([]);
  private animationId = 0;

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

  protected onClick(event: MouseEvent): void {
    const value = this.clickValue();
    this.clickCount.update(count => count + this.clickValue());

    this.addFloatingAnimation(event, value);
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

  private addFloatingAnimation(event: MouseEvent, value: number): void {
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    const containerRect = (event.target as HTMLElement).offsetParent?.getBoundingClientRect();

    const randomOffsetX = Math.random() * rect.width - rect.width / 2;

    const randomRotation = (Math.random()-0.5) * 90;

    const animation: FloatingAnimation = {
      id: this.animationId++,
      x: rect.left - (containerRect?.left || 0) + rect.width / 2 + randomOffsetX,
      y: rect.top - (containerRect?.top || 0),
      value,
      rotation: randomRotation
    };
    console.log('Adding animation:', animation);
    this.animations.update(animations => [...animations, animation]);

    setTimeout(() => {
      this.animations.update(animations => animations.filter(a => a.id !== animation.id));
    }, 2000);
  }
}
