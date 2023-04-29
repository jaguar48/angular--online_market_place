import { Component, OnInit } from '@angular/core';
import { OwnerRepositoryService } from './../../shared/services/owner-repository.service';
import { HttpErrorResponse } from '@angular/common/http';
import {  CartItem } from 'src/app/_interfaces/cart.model';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { ActivatedRoute } from '@angular/router';
// import { Product } from 'src/app/_interfaces/product.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-viewcart',
  templateUrl: './viewcart.component.html',
  styleUrls: ['./viewcart.component.css']
})
export class ViewcartComponent implements OnInit {
  // cartItems: Cart ;
 
  cartItems: CartItem [];
  productId: number;
  cartId: number[] = [];
  errorMessage: string;
  totalPriceAndQuantity: {totalPrice: number, totalQuantity: number} = {totalPrice: 0, totalQuantity: 0};

  constructor(
    private repository: OwnerRepositoryService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.getCart();
    
  }


  
  getCart(): void {
    const token = localStorage.getItem('token');
    const authToken = `Bearer ${token}`;
  
    this.repository.getCartItems('marketplace/products/viewcart', authToken).subscribe({
      next: (cart: CartItem[]) => {
        this.cartItems = cart;
  
        this.totalPriceAndQuantity = this.cartItems.reduce((accumulator, currentItem) => {
          accumulator.totalPrice += currentItem.price * currentItem.quantity;
          accumulator.totalQuantity += currentItem.quantity;
  
          return accumulator;
        }, { totalPrice: 0, totalQuantity: 0 });
  
        const cartIds = this.cartItems.map(item => item.cartId);
        this.cartId = cartIds.reduce((uniqueCartIds: number[], cartId) => {
          if (!uniqueCartIds.includes(cartId)) {
            uniqueCartIds.push(cartId);
          }
          return uniqueCartIds;
        }, []);        
  
        console.log('cartIds:', this.cartId);
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
  
  public Oncheckout = (cartId: number ) => {
    const checkUrl: string = `/owner/checkout/${cartId}`;
    this.router.navigate([checkUrl]);
  }  
  

}
