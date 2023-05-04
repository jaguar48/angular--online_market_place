import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SellerComponent } from '../seller-dashboard/seller/seller.component';
import { SellerDashboardComponent } from '../seller-dashboard/seller-dashboard/seller-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: SellerComponent,
    children: [
      { path: 'dashboard', component: SellerDashboardComponent }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellerRoutingModule { }

