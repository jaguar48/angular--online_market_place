import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SellerComponent } from '../seller-dashboard/seller/seller.component';
import { SellerDashboardComponent } from '../seller-dashboard/seller-dashboard/seller-dashboard.component';
import { IndexComponent } from '../seller-dashboard/index/index.component';
import { DetailsComponent } from '../seller-dashboard/details/details.component';
import { SellerProductsComponent } from '../seller-dashboard/seller-products/seller-products.component';

const routes: Routes = [
  {
    path: '',
    component: SellerComponent,
    children: [
      { path: 'products', component: SellerProductsComponent },
      { path: 'details', component: DetailsComponent },
      { path: '', redirectTo: 'index', pathMatch: 'full' },
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellerRoutingModule { }

