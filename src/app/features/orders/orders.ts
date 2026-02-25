import { Component } from '@angular/core';

@Component({
  selector: 'app-orders',
  standalone: true,
  template: `
    <div class="orders-container">
      <h2>Orders</h2>
      <p>Orders management will be implemented here.</p>
    </div>
  `,
  styles: [`
    .orders-container {
      padding: 20px;
    }
  `]
})
export class Orders {}
