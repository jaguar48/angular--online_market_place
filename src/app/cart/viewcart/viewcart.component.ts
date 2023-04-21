import { Component, OnInit } from '@angular/core';
import { OwnerRepositoryService } from './../../shared/services/owner-repository.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Cart, CartItem } from 'src/app/_interfaces/cart.model';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/_interfaces/product.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-viewcart',
  templateUrl: './viewcart.component.html',
  styleUrls: ['./viewcart.component.css']
})
export class ViewcartComponent implements OnInit {

  cartItems: CartItem;
  productId: number;
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
    this.getProductId();
  }

  getProductId(){

    const id = this.route.snapshot.params['id'];
    console.log('Product ID: ', id);
    this.productId = id;
    
    this.repository.getProduct(`marketplace/products/${id}`).subscribe((product: Product) => {
      console.log('Product Details: ', product);
    
    });
    
  }


  onRemoveFromCart(productId: number): void {
    const token = localStorage.getItem('token');
    const authToken = `Bearer ${token}`;
    console.log('Auth Token: ', authToken);

    this.repository.removeFromCart(`marketplace/products/removecart/${productId}`, authToken).subscribe({
      next: () => {
        console.log('Product removed from cart successfully');
        this.getCart();
      },
      error: (err: HttpErrorResponse) => {
        console.log('Error while removing product from cart: ', err);
        this.errorHandler.handleError(err);
        this.errorMessage = this.errorHandler.errorMessage;
      }
    });
  }
  getCart(): void {
    const token = localStorage.getItem('token');
    const authToken = `Bearer ${token}`;
  
    this.repository.getCartItems('marketplace/products/viewcart', authToken).subscribe({
      next: (cart: CartItem) => {
        console.log('Cart: ', cart);
        
        this.cartItems = cart;
        console.log(this.cartItems);
        this.totalPriceAndQuantity = Object.values(this.cartItems).reduce((accumulator, currentItem) => {
          accumulator.totalPrice += currentItem.price * currentItem.quantity;
          accumulator.totalQuantity += currentItem.quantity;
          return accumulator;
        }, { totalPrice: 0, totalQuantity: 0 });
        
        
        
      },
      error: (err: HttpErrorResponse) => {
        console.log('Error while getting cart: ', err);
        this.errorHandler.handleError(err);
        this.errorMessage = this.errorHandler.errorMessage;
      }
    });
  }
  
 
}






// import { Component, OnInit } from '@angular/core';
// import { OwnerRepositoryService } from './../../shared/services/owner-repository.service';
// import { HttpErrorResponse } from '@angular/common/http';
// import { Cart, CartItem } from 'src/app/_interfaces/cart.model';
// import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';

// @Component({
//   selector: 'app-viewcart',
//   templateUrl: './viewcart.component.html',
//   styleUrls: ['./viewcart.component.css']
// })
// export class ViewcartComponent implements OnInit {

//   cartItems: CartItem[] = [];
//   cart: Cart;
//   errorMessage: string;

//   constructor(
//     private repository: OwnerRepositoryService,
//     private errorHandler: ErrorHandlerService
//   ) {}

//   ngOnInit() {
//     this.getCart();
//   }

//   getCart(): void {
//     const token = localStorage.getItem('token');
//     const authToken = `Bearer ${token}`;
//     console.log('Auth Token: ', authToken);

//     this.repository.getCartItems('marketplace/products/viewcart', authToken).subscribe({
//       next: (cart: Cart) => {
//         console.log('Cart: ', cart);
//         this.cart = cart;
//         this.cartItems = cart.cartItems;
//       },
//       error: (err: HttpErrorResponse) => {
//         console.log('Error while getting cart: ', err);
//         this.errorHandler.handleError(err);
//         this.errorMessage = this.errorHandler.errorMessage;
//       }
//     });
//   }

//   onRemoveFromCart(productId: number): void {
//     const token = localStorage.getItem('token');
//     const authToken = `Bearer ${token}`;
//     console.log('Auth Token: ', authToken);

//     this.repository.removeFromCart(`marketplace/products/removecart/${productId}`, authToken).subscribe({
//       next: () => {
//         console.log('Product removed from cart successfully');
//         this.getCart();
//       },
//       error: (err: HttpErrorResponse) => {
//         console.log('Error while removing product from cart: ', err);
//         this.errorHandler.handleError(err);
//         this.errorMessage = this.errorHandler.errorMessage;
//       }
//     });
//   }
// }
