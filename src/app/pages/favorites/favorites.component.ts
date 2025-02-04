import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { Product } from '../../models/product.model';
import { SharedService } from '../../services/shared.service';
import { ProductDetailsModalComponent } from '../../shared/product-details-modal/product-details-modal.component';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, ProductCardComponent, ProductDetailsModalComponent],
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent {
  favorites: any[] = [];

  constructor(public sharedService: SharedService) {}

  ngOnInit(): void {
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

  openProductModal(product: Product): void {
    this.sharedService.setSelectedProduct(product);
    this.sharedService.toggleModal(true);
  }

  toggleFavorite(product: Product): void {
    const index = this.favorites.findIndex((p) => p.id === product.id);
    if (index === -1) {
      this.favorites.push(product);
    } else {
      this.favorites.splice(index, 1);
    }
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }

  onModalClose(): void {
    this.sharedService.toggleModal(false);
  }
}
