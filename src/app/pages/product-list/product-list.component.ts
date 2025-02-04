import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { Category } from '../../models/category.model';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ProductCardComponent],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  categories: Category[] = [];
  selectedCategory: string = '';
  favorites: any[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
    this.loadFavorites();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe((data: any) => {
      this.products = data.products;
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
    const index = this.favorites.findIndex((p) => p.id === product.id);
    if (index === -1) {
      this.favorites.push(product);
    } else {
      this.favorites.splice(index, 1);
    }
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }

  loadFavorites(): void {
    const storedFavorites = localStorage.getItem('favorites');
    this.favorites = storedFavorites ? JSON.parse(storedFavorites) : [];
  }

  isFavorite(product: Product): boolean {
    return this.favorites.some((p) => p.id === product.id);
  }
}
