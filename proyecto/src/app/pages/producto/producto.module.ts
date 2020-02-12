import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductoPageRoutingModule } from './producto-routing.module';

import { ProductoPage } from './producto.page';
import { CartModalPageModule } from "../cart-modal/cart-modal.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductoPageRoutingModule,
    CartModalPageModule
  ],
  declarations: [ProductoPage]
})
export class ProductoPageModule {}
