import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-details-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details-modal.component.html',
  styleUrls: ['./product-details-modal.component.scss'],
})
export class ProductDetailsModalComponent {
  @Input() product!: Product;
  @Output() closeModal = new EventEmitter<void>();
  @Output() toggleFavorite = new EventEmitter<Product>();

  constructor() {}

  get isFavorite(): boolean {
    const storedFavorites = localStorage.getItem('favorites');
    const favorites = storedFavorites ? JSON.parse(storedFavorites) : [];
    return favorites.some((fav: Product) => fav.id === this.product.id);
  }

  onToggleFavorite(): void {
    this.toggleFavorite.emit(this.product);
  }

  onCloseModal(): void {
    this.closeModal.emit();
  }
}
