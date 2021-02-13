import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './component/product/product.component';
import { ClientSpacingModuleRouting } from './client-spacing.module-routing';
import { SharedModule } from '../shared/shared.module';
import { PanierComponent } from './component/panier/panier.component';
import { ProductsService } from './services/products.service';
import { SoldInService } from './services/sold-in.service';
import { CgvComponent } from './component/cgv/cgv.component';
import { MentionsComponent } from './component/mentions/mentions.component';
import { ModalMessageComponent } from '../config/services/modal-message/modal-message.component';



@NgModule({
  declarations: [ProductComponent, PanierComponent, CgvComponent, MentionsComponent],
  imports: [
    CommonModule,
    ClientSpacingModuleRouting,
    SharedModule
  ],
  providers: [ProductsService, SoldInService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  entryComponents: [ModalMessageComponent],
})
export class ClientSpacingModule { }
