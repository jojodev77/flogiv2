import { AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { IPayPalConfig } from 'ngx-paypal/lib/models/paypal-models';
import { Products } from '../../models/product.interface';
import { SoldInService } from '../../services/sold-in.service';

declare let paypal: any;

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.scss']
})
export class PanierComponent implements OnInit, AfterViewChecked {

  constructor(private soldInService: SoldInService) { }
  products: Products[];
  productAddToPanier = new Array<Products[]>();
  pricePost = 0;
  totalPrice = 0;
  priceToPayed = 0;
  addScript = false;
  paypalLoad = true;
  public payPalConfig?: IPayPalConfig;
  finalAmount = this.priceToPayed;
  prixpaypal: any;

  ngOnInit(): void {
   this.initProductsOfPanier();
}

initProductsOfPanier() {
  let productSessionStorage = JSON.parse( sessionStorage.getItem('PRODUCT'));
  if (productSessionStorage) {
    this.products = productSessionStorage
  } else {
    this.soldInService.productSubject.subscribe(
      data => { 
        console.log(data)
        if (data) {
          this.products = data; 
        }
        }
    );
  }
  
  let total = 0;
  for (let i = 0; i < this.products.length; i++) {
    total += Number(this.products[i].prix);
    this.totalPrice = total;
    this.pricePost = 4.20;
    if (this.products.length > 7) {
      this.pricePost = 6.30;
    }
    this.priceToPayed = this.pricePost + this.totalPrice;
}

}

paimentPaypal() {
  this.prixpaypal = this.priceToPayed;
  this.finalAmount = this.priceToPayed;
}
// tslint:disable-next-line:member-ordering
paypalConfig = {
  env: 'production',
  client: {
    sandbox: '',
    production: 'AXYs81vHjBGtDPu-FJ83YDXSz5X9MDYs3d7i8OhxMH8YHTmpaB2tomEl9nFpHEXqnAwj4uB4KMNJkXGq'
  },
  commit: true,
  payment: (data, actions) => {
    return actions.payment.create({
      payment: {
        transactions: [
          { amount: { total: this.finalAmount, currency: 'EUR' } }
        ]
      }
    });
  },
  onAuthorize: (data, actions) => {
    return actions.payment.execute().then((payment) => {
      // Do something when payment is successful.
    });
  }
};

ngAfterViewChecked(): void {
  if (!this.addScript) {
    this.addPaypalScript().then(() => {
      paypal.Button.render(this.paypalConfig, '#paypal-checkout-btn');
      this.paypalLoad = false;
    });
  }
}

addPaypalScript() {
  this.addScript = true;
  return new Promise((resolve, reject) => {
    const scripttagElement = document.createElement('script');
    scripttagElement.src = 'https://www.paypalobjects.com/api/checkout.js';
    scripttagElement.onload = resolve;
    document.body.appendChild(scripttagElement);
  });
}

deleteProduct(product: Products) {
  const index: number = this.products.indexOf(product);
  if (index !== -1) {
    this.products.splice(index, 1);
    this.soldInService.productSubject.next(this.products);
    sessionStorage.setItem('PRODUCT',JSON.stringify(this.products));
  }
  this.initProductsOfPanier();
}

}
