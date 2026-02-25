import { Component, computed, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PosStateService, CartItem } from '../../../core/services/pos-state.service';
import { MenuService, Product, Category } from '../../../core/services/menu.service';

@Component({
    selector: 'app-table-detail',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './table-detail.html',
    styleUrls: ['./table-detail.css']
})
export class TableDetail {
    private route = inject(ActivatedRoute);
    private router = inject(Router);
    public posState = inject(PosStateService);
    private menuService = inject(MenuService);

    selectedCategory = signal<string>('starters');
    searchQuery = signal<string>('');

    // Derived state
    categories = this.menuService.getCategories();

    filteredProducts = computed(() => {
        const category = this.selectedCategory();
        const query = this.searchQuery().toLowerCase();
        let products = this.menuService.getProductsByCategory(category);

        if (query) {
            products = products.filter(p => p.name.toLowerCase().includes(query));
        }
        return products;
    });

    activeTable = this.posState.activeTable;
    activeOrderTotal = this.posState.activeOrderTotal;

    taxAmount = computed(() => this.activeOrderTotal() * 0.1); // Assuming 10% tax
    grandTotal = computed(() => this.activeOrderTotal() + this.taxAmount());

    constructor() {
        // Initial load logic
        this.route.url.subscribe(url => {
            if (url[0]?.path === 'parcel') {
                this.posState.setActiveTable(999); // 999 = Parcel
            }
        });

        this.route.params.subscribe(params => {
            const tableId = +params['id'];
            if (tableId) {
                this.posState.setActiveTable(tableId);
            }
        });
    }

    onSearch(event: Event) {
        const target = event.target as HTMLInputElement;
        this.searchQuery.set(target.value);
    }

    selectCategory(id: string) {
        this.selectedCategory.set(id);
    }

    getItemQuantity(productId: string): number {
        const item = this.activeTable()?.currentOrder?.find(i => i.product.id === productId);
        return item ? item.quantity : 0;
    }

    addToOrder(product: Product) {
        this.posState.addToOrder(product);
    }

    increaseQty(product: Product) {
        this.posState.updateQuantity(product.id, 1);
    }

    decreaseQty(product: Product) {
        // If quantity is 1 and we decrease, we remove it
        const table = this.activeTable();
        // Fix implicit any by explicitly typing the item
        const item = table?.currentOrder?.find((i: CartItem) => i.product.id === product.id);
        if (item && item.quantity === 1) {
            this.posState.removeFromOrder(product.id);
        } else {
            this.posState.updateQuantity(product.id, -1);
        }
    }

    goBack() {
        if (this.posState.activeTableId() === 999) {
            this.router.navigate(['/dashboard']);
        } else {
            this.router.navigate(['/tables']);
        }
    }
}
