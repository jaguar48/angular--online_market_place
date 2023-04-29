import { Component, OnInit } from '@angular/core';
import { OwnerRepositoryService } from './../../shared/services/owner-repository.service';
import { HttpErrorResponse } from '@angular/common/http';
import {  CartItem, Carts } from 'src/app/_interfaces/cart.model';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/_interfaces/product.model';
import { Router } from '@angular/router';
import { ShippingMethod } from 'src/app/cart/shipping.enum';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cartId: number;
  cart: CartItem;
  cartss : Carts;
  totalPriceAndQuantity: any = {};
  errorMessage = '';
  selectedShippingMethod: ShippingMethod;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private repository: OwnerRepositoryService,
    private errorHandler: ErrorHandlerService
  ) {}

  ngOnInit() {
    this.getCartId();
  }

  getCartId(){

    const token = localStorage.getItem('token');
    const authToken = `Bearer ${token}`;  
    
    const cartId = this.route.snapshot.params['cartId'];
    console.log("id",cartId);
    this.cartId = cartId;

   this.repository.getCart(`marketplace/products/cart/${this.cartId}`, authToken).subscribe((cart : CartItem)=>{
    console.log('cart Details: ', cart);
    this.cart = cart;
    this.cartss = cart;
   }) ;

}

checkout(): void {
  const token = localStorage.getItem('token');
  const authToken = `Bearer ${token}`;
  
  this.repository.checkoutFromCart(`marketplace/orders/checkout?cartId=${this.cartId}&shippingMethod=${this.selectedShippingMethod}`, null, authToken).subscribe({
    next: (response: { authorizationUrl: string}) => {
      if (response.authorizationUrl) {
        const authorizationUrl = response.authorizationUrl.replace(/^https?:\/\/[^\/]+/i, '');
        // window.open(authorizationUrl, '_blank');
        window.location.href=(authorizationUrl);
        console.log('Checkout successful');
        this.router.navigate(['/owner/products']);
      }
    },    
    error: (err: HttpErrorResponse) => {
      console.log('Error while checking out: ', err);
      
      if (err.status === 0) {
        console.log('Connection Error');
        this.errorMessage = 'Could not connect to server. Please check your internet connection and try again.';
      } else if (err.status === 400) {
        console.log('Bad Request Error');
        this.errorMessage = 'Invalid request. Please try again with valid inputs.';
      } else if (err.status === 401) {
        console.log('Unauthorized Error');
        this.errorMessage = 'You are not authorized to perform this action. Please login and try again.';
      } else if (err.status === 403) {
        console.log('Forbidden Error');
        this.errorMessage = 'Access to the requested resource is forbidden. Please contact the administrator.';
      } else if (err.status === 404) {
        console.log('Not Found Error');
        this.errorMessage = 'The requested resource could not be found. Please try again with valid inputs.';
      } else {
        console.log('Unknown Error');
        this.errorMessage = 'An unknown error occurred. Please try again later.';
      }
      
      this.errorHandler.handleError(err);
    }
  });
}
}
