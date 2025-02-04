import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProductCardComponent } from '../../components/product-card/product-card.component';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent {
  favorites: any[] = [];

  constructor() {
    this.loadFavorites();
  }

  loadFavorites(): void {
    const storedFavorites = localStorage.getItem('favorites');
    this.favorites = storedFavorites ? JSON.parse(storedFavorites) : [];
  }

  removeFavorite(productId: number): void {
    this.favorites = this.favorites.filter((p) => p.id !== productId);
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }
}
