import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private modalVisibility = new BehaviorSubject<boolean>(false);
  modalVisibility$ = this.modalVisibility.asObservable();

  private productSubject = new BehaviorSubject<Product | null>(null);
  selectedProduct$ = this.productSubject.asObservable();

  constructor() {}

  toggleModal(isVisible: boolean): void {
    this.modalVisibility.next(isVisible);
  }

  setSelectedProduct(product: Product | null): void {
    this.productSubject.next(product);
  }
}
