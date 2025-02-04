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
    this.sharedService.favorites$.subscribe((favorites) => {
      this.favorites = favorites;
    });
  }

  openProductModal(product: Product): void {
    this.sharedService.setSelectedProduct(product);
    this.sharedService.toggleModal(true);
  }

  toggleFavorite(product: Product): void {
    this.sharedService.toggleFavorite(product);
  }

  onModalClose(): void {
    this.sharedService.toggleModal(false);
  }
}
