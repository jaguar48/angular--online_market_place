import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SellerComponent } from '../seller-dashboard/seller/seller.component';
import { SellerDashboardComponent } from '../seller-dashboard/seller-dashboard/seller-dashboard.component';
import { IndexComponent } from '../seller-dashboard/index/index.component';
import { DetailsComponent } from '../seller-dashboard/details/details.component';
import { SellerProductsComponent } from '../seller-dashboard/seller-products/seller-products.component';
import { CreateProductComponent } from '../seller-dashboard/create-product/create-product.component';
import { SellerOrderComponent } from '../orders/seller-order/seller-order.component';
import { CreateCategoryComponent } from '../seller-dashboard/create-category/create-category.component';

const routes: Routes = [
  {
    path: '',
    component: SellerComponent,
    children: [
    
      { path: 'products', component: SellerProductsComponent },
       { path: 'category', component:   CreateCategoryComponent},
      { path: 'details', component: DetailsComponent },
      { path: 'seller/orders', component: SellerOrderComponent },
      { path: 'create', component: CreateProductComponent },
      { path: '', redirectTo: 'index', pathMatch: 'full' },
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellerRoutingModule { }

