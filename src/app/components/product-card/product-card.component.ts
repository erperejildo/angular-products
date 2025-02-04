import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models/product.model';
import { SharedService } from '../../services/shared.service';

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

  constructor(private sharedService: SharedService) {}

  onToggleFavorite() {
    this.toggleFavorite.emit(this.product);
  }

  onRemoveFavorite() {
    this.removeFavorite.emit(this.product.id);
  }

  openProductDetails(): void {
    this.sharedService.setSelectedProduct(this.product);
    this.sharedService.toggleModal(true);
  }
}
