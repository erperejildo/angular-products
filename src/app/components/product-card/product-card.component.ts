import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Input() isFavorite!: boolean;
  @Output() toggleFavorite = new EventEmitter<Product>();
  @Output() removeFavorite = new EventEmitter<number>();

  onToggleFavorite() {
    this.toggleFavorite.emit(this.product);
  }

  onRemoveFavorite() {
    this.removeFavorite.emit(this.product.id);
  }
}
