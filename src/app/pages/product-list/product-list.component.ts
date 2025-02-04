// product-list.component.ts
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { SpinnerComponent } from '../../components/spinner/spinner.component';
import { Category } from '../../models/category.model';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { SharedService } from '../../services/shared.service';
import { ProductDetailsModalComponent } from '../../shared/product-details-modal/product-details-modal.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    ProductCardComponent,
    ProductDetailsModalComponent,
    SpinnerComponent,
  ],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  selectedCategory: string = '';
  isLoading: boolean = true; // Loading state

  constructor(
    private productService: ProductService,
    public sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
  }

  loadProducts(): void {
    this.isLoading = true; // Show spinner
    this.productService.getProducts().subscribe({
      next: (data: any) => {
        this.products = data.products;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading products:', error);
        this.isLoading = false;
      },
    });
  }

  loadCategories(): void {
    this.productService.getCategories().subscribe((data: Category[]) => {
      this.categories = data;
    });
  }

  filterByCategory(categorySlug: string): void {
    this.selectedCategory = categorySlug;
    if (categorySlug) {
      this.productService
        .getProductsByCategory(categorySlug)
        .subscribe((data: any) => {
          this.products = data.products;
        });
    } else {
      this.loadProducts();
    }
  }

  toggleFavorite(product: Product): void {
    this.sharedService.toggleFavorite(product);
  }

  onModalClose(): void {
    this.sharedService.toggleModal(false);
  }
}
