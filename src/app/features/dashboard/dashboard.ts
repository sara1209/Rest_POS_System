// src/app/features/dashboard/dashboard.ts

import { Component, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';   // ← this is required for | number pipe

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
  imports: [DecimalPipe],                // ← this fixes NG8004
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'           // adjust if your file is dashboardboard.scss
})
export class Dashboard implements OnInit {

  orders: Order[] = [];
  selectedOrder: Order | null = null;

  ngOnInit(): void {
    this.orders = [
      {
        id: '1',
        orderNumber: '#ORD-20260103-A9F3K2',
        type: 'Dine-in',
        table: '1',
        customerName: 'Will Byrce',
        avatarInitials: 'WB',
        avatarColor: '#EA6868',
        total: 263.13,
        itemsCount: 1,
        timestamp: 'February 09, 2025 at 09:28:48 PM',
        status: 'Ready to Serve',
        items: [
          { name: 'Chicken Tikka', quantity: 2, price: 120 },
          { name: 'Chicken Tikka', quantity: 2, price: 120 }
        ]
      }
    ];

    this.selectedOrder = this.orders[0] || null;
  }

  selectOrder(order: Order): void {
    this.selectedOrder = order;
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