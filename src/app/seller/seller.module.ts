import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellerRoutingModule } from './seller-routing.module';
import { SellerComponent } from '../seller-dashboard/seller/seller.component';
import { SellerDashboardComponent } from '../seller-dashboard/seller-dashboard/seller-dashboard.component';
import { RouterModule } from '@angular/router';
import { SellerMenuComponent } from '../seller-dashboard/seller-menu/seller-menu.component';
import { SellerFooterComponent } from '../seller-dashboard/seller-footer/seller-footer.component';

@NgModule({
  declarations: [
    SellerComponent,
    SellerDashboardComponent,
    SellerMenuComponent,
    SellerFooterComponent,
  ],

  imports: [
    CommonModule,

    SellerRoutingModule
  ]
})
export class SellerModule { }















