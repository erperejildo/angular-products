import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
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

  constructor(private sharedService: SharedService) {}

  get isFavorite(): boolean {
    return this.sharedService.isFavorite(this.product);
  }

  onToggleFavorite(event: Event): void {
    event.stopPropagation();
    this.sharedService.toggleFavorite(this.product);
  }

  openProductDetails(): void {
    this.sharedService.setSelectedProduct(this.product);
    this.sharedService.toggleModal(true);
  }
}
