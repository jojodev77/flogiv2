import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Products } from '../models/product.interface';

@Injectable({
  providedIn: 'root'
})
export class SoldInService {

  constructor() { }

  productNumber = new Subject<any>();
  products: any[] = [];
  productNumber$: Observable<any>;
   productSubject: BehaviorSubject<Products[]> = new BehaviorSubject<Products[]>(null);

  // afficher article du pannier enregistre dans le storage
  get ProductNumber(): Observable<Products[]> {
    return this.productSubject.asObservable();
  }

  /* Mise a jour du subject */
  updateProductNumber(products: Products) {
        this.products.push(products);
        this.productSubject.next( this.products);
        sessionStorage.setItem('PRODUCT', JSON.stringify(this.products));

        this.getNumberOfProduct()
  }

  getNumberOfProduct(): Observable<any> {
   let numberOfProduct = JSON.parse(sessionStorage.getItem('PRODUCT'));
   this.productNumber.next(numberOfProduct.length);

    return this.productNumber.asObservable();
  }
}
