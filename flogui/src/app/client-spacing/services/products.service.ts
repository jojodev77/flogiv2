import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Products } from '../models/product.interface';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  url = environment;

  constructor(private httpClient: HttpClient) { }

  product: Products[] = [];

  getAllProducts(): Observable<any> {
    const optionRequete = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '**',
        'Access-Control-Allow-Headers': '**',
        'Access-Control-Allow-Methods': 'POST, GET, OPTION',
        'Content-Type': 'application/json'
      })
    };
return this.httpClient.get<any>(`${this.url.productUrl}/list`).pipe(
  map((res) => {
    this.product = res['data'];
    return this.product;
}));
}
}
