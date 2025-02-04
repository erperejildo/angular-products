import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private modalVisibility = new BehaviorSubject<boolean>(false);
  modalVisibility$ = this.modalVisibility.asObservable();

  private productSubject = new BehaviorSubject<Product | null>(null);
  selectedProduct$ = this.productSubject.asObservable();

  private favoritesSubject = new BehaviorSubject<Product[]>(
    this.loadFavorites()
  );
  favorites$ = this.favoritesSubject.asObservable();

  constructor() {}

  toggleModal(isVisible: boolean): void {
    this.modalVisibility.next(isVisible);
  }

  setSelectedProduct(product: Product | null): void {
    this.productSubject.next(product);
  }

  private loadFavorites(): Product[] {
    const storedFavorites = localStorage.getItem('favorites');
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  }

  toggleFavorite(product: Product): void {
    const favorites = this.favoritesSubject.value;
    const index = favorites.findIndex((p) => p.id === product.id);

    if (index === -1) {
      favorites.push(product);
    } else {
      favorites.splice(index, 1);
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
    this.favoritesSubject.next(favorites);
  }

  isFavorite(product: Product): boolean {
    return this.favoritesSubject.value.some((p) => p.id === product.id);
  }
}
