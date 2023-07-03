import { makeAutoObservable } from "mobx"
import { loadProducts } from './api';

export class Shop {
    products = new Map();
    status = "idle";
    basket = new Set();
    total = 0;

    constructor() {
        makeAutoObservable(this);
    }

    add(id) {
        this.basket.add(id);
        this.total += this.products.get(id).price;
        this.products.get(id).amount++;
    }

    remove(id) {
        if (this.basket.has(id) && this.products.get(id).amount > 0) {
            this.total -= this.products.get(id).price;
            this.products.get(id).amount--;

            if (this.products.get(id).amount === 0) {
                this.basket.delete(id);
            }
        }
    }

    get isLoading() {
        return this.status === 'loading';
    }

    get catalog() {
        return Array.from(this.products.values());
    }

    get orderItems() {
        return Array.from(this.basket.values());
    }

    set catalog(items) {
        for (let item of items) {
            this.products.set(item.id, item);
        }
    }
}

export const shopInstance = new Shop();
loadProducts().then(items => shopInstance.catalog = items);

window.shop = shopInstance;