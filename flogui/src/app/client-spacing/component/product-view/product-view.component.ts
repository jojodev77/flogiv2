import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalMessageComponent } from 'src/app/config/services/modal-message/modal-message.component';
import { ModalService } from 'src/app/config/services/modal.service';
import { Products } from '../../models/product.interface';
import { ProductsService } from '../../services/products.service';
import { SoldInService } from '../../services/sold-in.service';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit {

  constructor(private actRoute: ActivatedRoute, private router: Router,
    private soldinService: SoldInService, private modalService: ModalService,
    private productService: ProductsService) {

  }
  product_id: string;
  products: Products[] = [];
  image: string;
  prix: number;
  articleNumber: number;
  addArticle: boolean  = false;

  ngOnInit(): void {
    this.actRoute.paramMap.subscribe(params => {
      this.product_id = params.get('id');
      this.image = params.get('image');
      this.prix = (+params.get('prix'));
      // this.product.information = params.get('information');
      // this.product.couleur = params.get('couleur');
      // this.product.couleurdeux = params.get('couleurdeux');
      // this.product.couleurtrois = params.get('couleurtrois');
      console.log(params.get('image'))
    });

    this._initDataOfProduct();
  }

  backToList() {
    this.router.navigate(['/'])
  }

  goToPanier() {
    this.router.navigate(['/panier'])
  }

  addPanier(product: any) {
    let prod: Products;
    this.products.forEach(element => {
      if (element.id === product) {
      prod = element
      }
    });
    this.addArticle = true;

    this.soldinService.updateProductNumber(prod);
      this.onModalMessage('Article ajoutés:', prod.id);
      this.calculToQuantityOfPanier();
  }

  calculToQuantityOfPanier(){
    this.soldinService.productSubject.subscribe(
      data => { this.products = data; 
        this.articleNumber = this.products.length;
      }
    );
  }

  onModalMessage(title?: string, message?: string): void {
    const modalRef = this.modalService.open(ModalMessageComponent, { title: title, message: message });
    modalRef.onResult().subscribe(
      closed => console.log('closed', closed),
      dismissed => console.log('dismissed', dismissed),
      () => console.log('completed')
    );
    setTimeout(() => {
      modalRef.destroy$();
    }, 1000);
    
  }
  private _initDataOfProduct() {
    this.productService.getAllProducts().subscribe(
      (data: any) => {
        if (data) {
          this.products = data;

        }
      }
    )
  }


}
