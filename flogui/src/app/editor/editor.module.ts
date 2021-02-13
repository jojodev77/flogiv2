import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './component/login/login.component';
import { ProductFormComponent } from './component/product-form/product-form.component';
import { SharedModule } from '../shared/shared.module';
import { EditorModuleRouting } from './editor.module.routing';
import { EditorComponent } from './component/editor/editor.component';



@NgModule({
  declarations: [LoginComponent, ProductFormComponent, EditorComponent],
  imports: [
    CommonModule,
    SharedModule,
    EditorModuleRouting
  ]
})
export class EditorModule { }
