import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditorComponent } from './component/editor/editor.component';
import { LoginComponent } from './component/login/login.component';
import { ProductFormComponent } from './component/product-form/product-form.component';


const routes: Routes = [
    {path: '', component: EditorComponent},
    {path: 'login', component: LoginComponent},
    {path: 'productForm', component: ProductFormComponent},
    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditorModuleRouting { }