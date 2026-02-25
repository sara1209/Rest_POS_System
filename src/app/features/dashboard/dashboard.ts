// src/app/features/dashboard/dashboard.ts

import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { PosStateService, Table } from '../../core/services/pos-state.service';

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  orderNumber: string;
  type: 'Dine-in' | 'Parcel';
  table?: string;
  customerName: string;
  avatarInitials: string;
  avatarColor?: string;
  total: number;
  itemsCount: number;
  timestamp: string;
  status: string;
  items?: OrderItem[];
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
  private posState = inject(PosStateService);

  private router = inject(Router);

  activeOrders = computed(() => {
    return this.posState.tables()
      .filter(t => t.currentOrder && t.currentOrder.length > 0)
      .map(t => {
        const total = t.currentOrder!.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
        const count = t.currentOrder!.reduce((sum, item) => sum + item.quantity, 0);

        return {
          id: t.id.toString(),
          orderNumber: `#ORD-${t.id}`,
          type: 'Dine-in' as const,
          table: t.number.toString(),
          customerName: `Table ${t.number}`,
          avatarInitials: `T${t.number}`,
          avatarColor: '#EA6868',
          total: total,
          itemsCount: count,
          timestamp: new Date().toLocaleTimeString(), // In real app, store creation time
          status: 'In Progress',
          items: t.currentOrder!.map(i => ({
            name: i.product.name,
            quantity: i.quantity,
            price: i.product.price
          }))
        };
      });
  });

  // Summary Stats
  totalActiveOrdersCount = computed(() => this.activeOrders().length);
  occupiedTablesCount = computed(() => this.posState.tables().filter(t => t.status === 'booked').length);
  totalTablesCount = computed(() => this.posState.tables().length);

  totalSalesToday = computed(() => {
    // For now, just sum up active orders. In real app, this would be from a completed orders service.
    return this.activeOrders().reduce((sum, order) => sum + order.total, 0);
  });

  selectedOrder = signal<Order | null>(null);

  constructor() { }

  selectOrder(order: Order): void {
    this.selectedOrder.set(order);
  }

  navigateToDining() {
    this.router.navigate(['/tables']);
  }

  navigateToParcel() {
    this.router.navigate(['/parcel']);
  }

  // Add this property
  activeTab: string = 'home';  // default active = Home

  // Add this method
  setActive(tab: string) {
    this.activeTab = tab;
    // Optional: you can navigate or load different content here later
    console.log('Active tab changed to:', tab);
  }
}