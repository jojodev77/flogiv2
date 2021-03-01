import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CgvComponent } from './component/cgv/cgv.component';
import { MentionsComponent } from './component/mentions/mentions.component';
import { PanierComponent } from './component/panier/panier.component';
import { ProductViewComponent } from './component/product-view/product-view.component';
import { ProductComponent } from './component/product/product.component';

const routes: Routes = [
    {path: '', component: ProductComponent},
    {path: 'product', component: ProductComponent},
    {path:'productView/:id', component: ProductViewComponent},
    {path: 'panier', component: PanierComponent},
    {path: 'cgv', component: CgvComponent},
    {path: 'mentions', component: MentionsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientSpacingModuleRouting { }