import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/product-list/product-list.component').then(
        (m) => m.ProductListComponent
      ),
  },
  {
    path: 'favorites',
    loadComponent: () =>
      import('./pages/favorites/favorites.component').then(
        (m) => m.FavoritesComponent
      ),
  },
];
