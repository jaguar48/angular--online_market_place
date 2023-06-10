import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellerRoutingModule } from './seller-routing.module';
import { SellerComponent } from '../seller-dashboard/seller/seller.component';
import { SellerDashboardComponent } from '../seller-dashboard/seller-dashboard/seller-dashboard.component';
import { RouterModule } from '@angular/router';
import { SellerMenuComponent } from '../seller-dashboard/seller-menu/seller-menu.component';
import { SellerFooterComponent } from '../seller-dashboard/seller-footer/seller-footer.component';
import { DetailsComponent } from '../seller-dashboard/details/details.component';
import { SellerProductsComponent } from '../seller-dashboard/seller-products/seller-products.component';
import { CreateProductComponent } from '../seller-dashboard/create-product/create-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SellerOrderComponent } from '../orders/seller-order/seller-order.component';
import { SharedModule } from '../shared/shared.module';
import { CreateCategoryComponent } from '../seller-dashboard/create-category/create-category.component';

@NgModule({
  declarations: [
    SellerComponent,
    SellerDashboardComponent,
    SellerMenuComponent,
    SellerFooterComponent,
    DetailsComponent,
    SellerOrderComponent,
    CreateProductComponent,
    SellerProductsComponent,
    CreateCategoryComponent
  ],

  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    SellerRoutingModule
  ]
})

export class SellerModule { }
















