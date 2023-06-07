import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { OwnerRoutingModule } from './owner-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { LoginComponent } from '../login/login.component';
import { RegisterSellerComponent } from '../registration/register-seller/register-seller.component';
import { RegisterBuyerComponent } from '../registration/register-buyer/register-buyer.component';
import { ProductsComponent } from '../products/products/products.component';
import { ProductDetailsComponent } from '../products/product-details/product-details.component';
import { EditProductComponent } from '../products/edit-product/edit-product.component';
import { DeleteProductComponent } from '../products/delete-product/delete-product.component';
import { CartComponent } from '../cart/cart/cart.component';
import { ViewcartComponent } from '../cart/viewcart/viewcart.component';
import { CheckoutComponent } from '../checkout/checkout/checkout.component';
import { ProductCategoryComponent } from '../products/product-category/product-category.component';
import { CategorydetailsComponent } from '../products/categorydetails/categorydetails.component';
import { BuyerOrderComponent } from '../orders/buyer-order/buyer-order.component';
import { SellerOrderComponent } from '../orders/seller-order/seller-order.component';
import { UpdateOrderComponent } from '../orders/update-order/update-order.component';
import { MenuComponent } from '../menu/menu.component';
import { FooterComponent } from '../footer/footer.component';
import { LayoutComponent } from '../layout/layout.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterSellerComponent,
    RegisterBuyerComponent,
    ProductsComponent,
   
    ProductDetailsComponent,
    EditProductComponent,
    DeleteProductComponent,
    CartComponent,
    ViewcartComponent,
    CheckoutComponent,
    ProductCategoryComponent,
    CategorydetailsComponent,
    BuyerOrderComponent,
    SellerOrderComponent,
    UpdateOrderComponent,
    MenuComponent,
    FooterComponent,
    LayoutComponent,
  ],
  imports: [
    CommonModule,
    OwnerRoutingModule, // Make sure the routing module is imported
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    BsDatepickerModule.forRoot()
  ],
  providers: [DatePipe, CurrencyPipe],
})
export class OwnerModule {}
