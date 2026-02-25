import { Injectable, signal } from '@angular/core';

export interface Product {
    id: string;
    name: string;
    price: number;
    category: string;
    image?: string;
    description?: string;
}

export interface Category {
    id: string;
    name: string;
    icon?: string;
    color?: string; // Hex color for the card
}

@Injectable({
    providedIn: 'root'
})
export class MenuService {

    // Mock Categories
    private readonly categories = signal<Category[]>([
        { id: 'starters', name: 'Starters', icon: '🥗', color: '#EA6868' },
        { id: 'mains', name: 'Main Course', icon: '🍽️', color: '#7E69FA' },
        { id: 'beverages', name: 'Beverages', icon: '🥤', color: '#AB47BC' },
        { id: 'soups', name: 'Soups', icon: '🥣', color: '#96793E' },
        { id: 'desserts', name: 'Desserts', icon: '🍰', color: '#3A54B4' },
        { id: 'pizzas', name: 'Pizzas', icon: '🍕', color: '#2F7C44' },
        { id: 'alcoholic', name: 'Alcoholic Drinks', icon: '🍷', color: '#CE4B3F' },
        { id: 'salads', name: 'Salads', icon: '🥗', color: '#665AB4' }
    ]);

    // Mock Products
    private readonly products = signal<Product[]>([
        { id: 'p1', name: 'Panner Tikka', price: 120, category: 'starters' },
        { id: 'p2', name: 'Chicken Tikka', price: 120, category: 'starters' },
        { id: 'p3', name: 'Tandoori Chicken', price: 120, category: 'starters' },
        { id: 'p4', name: 'Samosa', price: 120, category: 'starters' },
        { id: 'p5', name: 'Aloo Tikki', price: 120, category: 'starters' },
        { id: 'p6', name: 'Hara bara kabab', price: 120, category: 'starters' },
        { id: 'p7', name: 'Cola', price: 50, category: 'beverages' },
        { id: 'p8', name: 'Burger', price: 150, category: 'mains' },
        { id: 'p9', name: 'Margherita', price: 250, category: 'pizzas' }
    ]);

    getCategories() {
        return this.categories;
    }

    getProducts() {
        return this.products;
    }

    getProductsByCategory(categoryId: string) {
        return this.products().filter(p => p.category === categoryId);
    }
}
