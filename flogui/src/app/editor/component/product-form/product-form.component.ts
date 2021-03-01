import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Products } from 'src/app/client-spacing/models/product.interface';
import { ProductFormService } from '../../services/product-form.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  constructor(private productFormService: ProductFormService,
    private router: Router) { }

  productForm: FormGroup;
  products: Products[] = [];
  stateOfForm: string = 'create';
  numberOfProducts: number;
  productId: any;
  Type = [
    { value: 1, viewValue: 'bagues' },
    { value: 2, viewValue: 'pendentifs' },
    { value: 3, viewValue: 'bracelets' },
    { value: 4, viewValue: 'boucles' },
    { value: 5, viewValue: 'colliers' },
    { value: 6, viewValue: 'broches' },
    { value: 7, viewValue: 'parures' },
    { value: 8, viewValue: 'bien-être' },
    { value: 9, viewValue: 'Tour de cou' },
    { value: 10, viewValue: 'Barrettes' },
    { value: 11, viewValue: 'Clips d oreillers' },
    { value: 12, viewValue: 'Porte clefs' },
  ];
  Forme = [

    { value: 2, viewValue: 'coeur' },
    { value: 3, viewValue: 'rondes' },
    { value: 4, viewValue: 'rectangles' },
    { value: 5, viewValue: 'carrées' },
    { value: 6, viewValue: 'ovales' },
    { value: 7, viewValue: 'fleurs' },
    { value: 8, viewValue: 'spirales' },
    { value: 9, viewValue: 'anges' },
    { value: 10, viewValue: 'papillon' },
    { value: 11, viewValue: 'créoles' },
    { value: 12, viewValue: 'cabochon' },
    { value: 13, viewValue: 'fleur' },
  ];
  Materiaux = [
    { value: 1, viewValue: 'métallique' },
    { value: 2, viewValue: 'céramique' },
    { value: 5, viewValue: 'strass' },
    { value: 6, viewValue: 'perles-magiques' },
    { value: 7, viewValue: 'fimo' },
    { value: 8, viewValue: 'velours' },
    { value: 9, viewValue: 'résine' },
    { value: 10, viewValue: 'rose aluminium' },
    { value: 11, viewValue: 'étoiles' },
    { value: 12, viewValue: 'breloques' },
    { value: 13, viewValue: 'ailes d\'anges' },
    { value: 14, viewValue: 'cabochon' },
    { value: 15, viewValue: 'papillon' },
    { value: 16, viewValue: 'perles craquelées ' },
    { value: 17, viewValue: 'lucite' },
    { value: 18, viewValue: 'liberty' },
    { value: 19, viewValue: 'fleurs' },
    { value: 20, viewValue: 'plume' },
    { value: 21, viewValue: 'pompom' },
    { value: 22, viewValue: 'perle mate' },
    { value: 23, viewValue: 'perle' },
    { value: 24, viewValue: 'oeil de chat' },
    { value: 25, viewValue: 'coupelles' },
    { value: 26, viewValue: 'verre givré' },
    { value: 27, viewValue: 'acrylique' },
    { value: 27, viewValue: 'grelot' },
    { value: 27, viewValue: 'perle acrylique' },
    { value: 27, viewValue: 'effet prisme' },
    { value: 27, viewValue: 'effet moon' },
    { value: 27, viewValue: 'perle en bois' },
    { value: 27, viewValue: 'perle de rocaille' },
    { value: 27, viewValue: 'perle givrée' },
    { value: 27, viewValue: 'aluminium' },
    { value: 27, viewValue: 'cuivre' },
    { value: 27, viewValue: 'métal argenté' },
    { value: 27, viewValue: 'laiton' },
    { value: 27, viewValue: 'perle indienne' },
    { value: 27, viewValue: 'suédine' },
    { value: 27, viewValue: 'fibule' },
    { value: 27, viewValue: 'epingle à nourrice' },

  ];
  Couleur = [
    { value: 1, viewValue: 'bleu' },
    { value: 2, viewValue: 'rose' },
    { value: 3, viewValue: 'jaune' },
    { value: 4, viewValue: 'noir' },
    { value: 5, viewValue: 'blanc' },
    { value: 6, viewValue: 'vert' },
    { value: 7, viewValue: 'rouge' },
    { value: 8, viewValue: 'mat' },
    { value: 8, viewValue: 'beige' },
    { value: 9, viewValue: 'orange' },
    { value: 10, viewValue: 'argent' },
    { value: 11, viewValue: 'doré' },
    { value: 12, viewValue: 'violet' },
    { value: 13, viewValue: 'écru' },
    { value: 14, viewValue: 'turquoise' },
    { value: 15, viewValue: 'or' },
    { value: 16, viewValue: 'rose' },
    { value: 17, viewValue: 'marron' },
    { value: 18, viewValue: 'bicolore' },
    { value: 19, viewValue: 'multicolore' },
    { value: 20, viewValue: 'fluo' },
    { value: 21, viewValue: 'bronze' },
    { value: 22, viewValue: 'rose' },
    { value: 21, viewValue: 'or' },
    { value: 22, viewValue: 'bronze' },
    { value: 23, viewValue: 'saumon' },
    { value: 24, viewValue: 'mandarine' },
    { value: 21, viewValue: 'cuivre' },
    { value: 21, viewValue: 'ecossais' },
    { value: 21, viewValue: 'chocolat' },
    { value: 21, viewValue: 'or rose' },
  ];


  ngOnInit(): void {
    this._isConnect();
    this.productForm = this.productFormService.buildForm();
    this._initDataOfProduct();
  }

  private _initDataOfProduct() {
    this.productFormService.getAllProducts().subscribe(
      (data: any) => {
        if (data) {
          this.products = data;
          this.numberOfProducts = data.length;
        }
      }
    )
  }

  createProduct() {
    let newProd = {
      type: this.productForm.get('type').value,
      forme: this.productForm.get('forme').value,
      materiaux: this.productForm.get('materiaux').value,
      materiauxdeux: this.productForm.get('materiauxdeux').value,
      materiauxtrois: this.productForm.get('materiauxtrois').value,
      couleur: this.productForm.get('couleur').value,
      couleurdeux: this.productForm.get('couleurdeux').value,
      couleurtrois: this.productForm.get('couleurtrois').value,
      prix: this.productForm.get('prix').value,
      image: this.productForm.get('image').value,
      information: this.productForm.get('information').value,

    } as Products;
    let result = this.productForm.getRawValue();
    this.productFormService.createProduct(result).subscribe(
      (data: Products[]) => {
        if (data) {
          this.products = data
        }

      }
    );
    this._initDataOfProduct();
  }

  createFormProduct() {
    this.stateOfForm = 'create';
    this.productForm.reset();
  }

  updateProduct() {
    let updateProd = {
      type: this.productForm.get('type').value,
      forme: this.productForm.get('forme').value,
      materiaux: this.productForm.get('materiaux').value,
      materiauxdeux: this.productForm.get('materiauxdeux').value,
      materiauxtrois: this.productForm.get('materiauxtrois').value,
      couleur: this.productForm.get('couleur').value,
      couleurdeux: this.productForm.get('couleurdeux').value,
      couleurtrois: this.productForm.get('couleurtrois').value,
      prix: this.productForm.get('prix').value,
      image: this.productForm.get('image').value,
      information: this.productForm.get('information').value,
    } as Products;

    let result = this.productForm.getRawValue();
    this.productFormService.updateProduct(result).subscribe(
      (data: Products[]) => {
        if (data) {
          this.products = data
        }

      }
    )
    this._initDataOfProduct();
  }

  updateOrDelete(product: Products) {
    this.stateOfForm = 'update';
    this.productId = product.id;
    this.productForm.get('type').setValue(product.type),
      this.productForm.get('forme').setValue(product.forme),
      this.productForm.get('materiaux').setValue(product.materiaux),
      this.productForm.get('materiauxdeux').setValue(product.materiauxdeux),
      this.productForm.get('materiauxtrois').setValue(product.materiauxtrois),
      this.productForm.get('couleur').setValue(product.couleur),
      this.productForm.get('couleurdeux').setValue(product.couleurdeux),
      this.productForm.get('couleurtrois').setValue(product.couleurtrois),
      this.productForm.get('prix').setValue(product.prix),
      this.productForm.get('image').setValue(product.image),
      this.productForm.get('information').setValue(product.information)
  }

  deleteProduct(product: Products) {
    if (product) {
      this.productFormService.deleteProduct(product).subscribe(
        (data: Products[]) => {
          if (data) {
            this.products = data
          }

        }
      )
    }
    this._initDataOfProduct();
  }

  private _isConnect() {
    let connect = JSON.parse(sessionStorage.getItem('CONNECT'));
    if (!connect) {
      this.router.navigate(['editor/login']);
    }
  }

}
