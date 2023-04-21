import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { RegisterSellerComponent } from '../registration/register-seller/register-seller.component';
import { RegisterBuyerComponent } from '../registration/register-buyer/register-buyer.component';
import { ProductsComponent } from '../products/products/products.component';
import { CreateProductComponent } from '../products/create-product/create-product.component';
import { ProductDetailsComponent } from '../products/product-details/product-details.component';
import { EditProductComponent } from '../products/edit-product/edit-product.component';
import { DeleteProductComponent } from '../products/delete-product/delete-product.component';
import { CartComponent } from '../cart/cart/cart.component';
import { ViewcartComponent } from '../cart/viewcart/viewcart.component';

const routes: Routes = [
  { path:'products', component: ProductsComponent },
  { path: 'details/:id', component: ProductDetailsComponent },
  { path: 'edit/:id', component: EditProductComponent },
  { path: 'create', component: CreateProductComponent},
  { path: 'delete/:id', component: DeleteProductComponent },
  { path: 'login', component: LoginComponent },
  { path: 'seller/register', component: RegisterSellerComponent },
  { path: 'buyer/register', component: RegisterBuyerComponent },
  { path: 'cart/:id', component: CartComponent },
  { path: 'view/cart', component: ViewcartComponent },
  { path: 'deletecart', component: ViewcartComponent },
  { path: 'view/cart', component: ViewcartComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OwnerRoutingModule { }