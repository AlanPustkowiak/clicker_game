import { Component, input, output } from "@angular/core";

export interface Upgrade {
  id: string;
  name: string;
  description: string;
  cost: number;
  effect: number;
  purchased: boolean;
}

@Component({
  selector: 'app-shop',
  template: `
    <div class="w-full max-w-4xl mx-auto p-4">
      <h3 class="text-2xl font-bold mb-4">Sklep</h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        @for (upgrades of upgrades(); track upgrades.id){
          @if (!upgrades.purchased){
          <div class="border border-gray-300 rounded-lg p-4 bg-white shadow-md" visibility="upgrades.purchased ? 'hidden' : 'visible'">
            <h4 class="font-semibold">{{upgrades.name}}</h4>
            <p class="text-sm text-gray-600 mb-2">{{upgrades.description}}></p>
            <p class="text-lg font-bold text-green-600">{{upgrades.cost}} punktów</p>
            <button class="btn btn-primary mt-2 w-full" [disabled]="currentPoints() < upgrades.cost || upgrades.purchased" (click)="onPurchase(upgrades)">
              {{ upgrades.purchased ? 'kupione' : 'Kup' }}
            </button>
          </div>
          }
        }
      </div>
    </div>
  `
})
export class ShopComponent{
  upgrades = input.required<Upgrade[]>();
  currentPoints = input.required<number>();

  purchase = output<Upgrade>();
  
  onPurchase(upgrade: Upgrade): void {
    this.purchase.emit(upgrade);
  }
}

