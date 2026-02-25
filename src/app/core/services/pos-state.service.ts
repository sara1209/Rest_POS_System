import { Injectable, computed, signal } from '@angular/core';
import { Product } from './menu.service';

export interface CartItem {
    product: Product;
    quantity: number;
    notes?: string;
}

export interface Table {
    id: number;
    number: number;
    status: 'available' | 'booked';
    currentOrder?: CartItem[];
    label?: string;
}

@Injectable({
    providedIn: 'root'
})
export class PosStateService {

    // State
    private readonly _tables = signal<Table[]>([
        { id: 1, number: 1, status: 'booked', label: 'WB', currentOrder: [] },
        { id: 2, number: 2, status: 'booked', label: 'WB', currentOrder: [] },
        { id: 3, number: 3, status: 'available', label: 'N/A' },
        { id: 4, number: 4, status: 'available', label: 'N/A' },
        { id: 5, number: 5, status: 'available', label: 'N/A' },
        { id: 6, number: 6, status: 'booked', label: 'WB', currentOrder: [] },
        { id: 999, number: 0, status: 'available', label: 'Parcel', currentOrder: [] }, // Parcel "Table"
    ]);

    private readonly _activeTableId = signal<number | null>(null);

    // Computed
    readonly tables = this._tables.asReadonly();
    readonly activeTableId = this._activeTableId.asReadonly();

    readonly activeTable = computed(() =>
        this._tables().find(t => t.id === this._activeTableId()) || null
    );

    readonly activeOrderTotal = computed(() => {
        const table = this.activeTable();
        if (!table || !table.currentOrder) return 0;
        return table.currentOrder.reduce((total, item) => total + (item.product.price * item.quantity), 0);
    });

    // Actions
    setActiveTable(tableId: number) {
        this._activeTableId.set(tableId);
    }

    addToOrder(product: Product) {
        const tableId = this._activeTableId();
        if (!tableId) return;

        this._tables.update(tables => {
            return tables.map(t => {
                if (t.id === tableId) {
                    const currentOrder = t.currentOrder ? [...t.currentOrder] : [];
                    const existingItem = currentOrder.find(i => i.product.id === product.id);

                    if (existingItem) {
                        existingItem.quantity++;
                    } else {
                        currentOrder.push({ product, quantity: 1 });
                    }
                    return { ...t, currentOrder, status: 'booked' }; // Auto-book if adding items
                }
                return t;
            });
        });
    }

    removeFromOrder(productId: string) {
        const tableId = this._activeTableId();
        if (!tableId) return;

        this._tables.update(tables => {
            return tables.map(t => {
                if (t.id === tableId && t.currentOrder) {
                    const currentOrder = t.currentOrder.filter(item => item.product.id !== productId);
                    return { ...t, currentOrder };
                }
                return t;
            });
        });
    }

    updateQuantity(productId: string, delta: number) {
        const tableId = this._activeTableId();
        if (!tableId) return;

        this._tables.update(tables => {
            return tables.map(t => {
                if (t.id === tableId && t.currentOrder) {
                    const currentOrder = t.currentOrder.map(item => {
                        if (item.product.id === productId) {
                            const newQuantity = Math.max(1, item.quantity + delta);
                            return { ...item, quantity: newQuantity };
                        }
                        return item;
                    });
                    return { ...t, currentOrder };
                }
                return t;
            });
        });
    }
}
