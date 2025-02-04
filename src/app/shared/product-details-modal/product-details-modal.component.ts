import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-details-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details-modal.component.html',
  styleUrls: ['./product-details-modal.component.scss'],
})
export class ProductDetailsModalComponent implements AfterViewInit {
  @Input() product!: Product;
  @Output() closeModal = new EventEmitter<void>();
  @Output() toggleFavorite = new EventEmitter<Product>();
  @ViewChild('favoriteButton', { static: true }) favoriteButton!: ElementRef;

  constructor() {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.favoriteButton.nativeElement.focus();
    }, 0);
  }

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
