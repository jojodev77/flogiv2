import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ModalMessageComponent } from 'src/app/config/services/modal-message/modal-message.component';
import { ModalService } from 'src/app/config/services/modal.service';
import { Products } from '../../models/product.interface';
import { ProductsService } from '../../services/products.service';
import { SoldInService } from '../../services/sold-in.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, AfterViewInit {

  constructor(private productService: ProductsService,
     private soldinService: SoldInService,
     private router: Router,
     private modalService: ModalService) { }

  products: Products[] = [];
  dataSource = new MatTableDataSource<Products>();
  displayedColumns: string[] = ['view','acheter', 'image', 'type', 'prix', 'materiaux', 'information', 'stock'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  articleNumber: number;
  productAddToPanier = Array<Products>();

  
  ngOnInit(): void {
    this._initDataOfProduct();
    let productSessionStorage = JSON.parse( sessionStorage.getItem('PRODUCT'));
    if (productSessionStorage) {
      this.articleNumber = productSessionStorage.length;
      this.calculToQuantityOfPanier();
    }
  }

  ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
      this.paginator._intl.itemsPerPageLabel="Nbre de produits par page";
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  private _initDataOfProduct() {
    this.productService.getAllProducts().subscribe(
      (data: any) => {
        if (data) {
          // this.dataSource.data = data;
          this.dataSource = new MatTableDataSource(data);
          this.products = data;
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }
      }
    )
  }

  addPanier(product: Products) {
    this.soldinService.updateProductNumber(product);
      this.onModalMessage('Article ajoutés:', product.id);
      this.calculToQuantityOfPanier();
  }

  calculToQuantityOfPanier(){
    this.soldinService.productSubject.subscribe(
      data => { this.products = data; 
        this.articleNumber = this.products.length;
      }
    );
  }

  navigateToPanier() {
    let productSessionStorage = JSON.parse( sessionStorage.getItem('PRODUCT'));
    if (productSessionStorage) {
      this.router.navigate(['/panier']);
    } else {
      this.onModalMessage('Aucun article dans le panier','Regardez notre collection');
    }

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

}
