import { Component, OnInit } from '@angular/core';
import { OwnerRepositoryService } from './../../shared/services/owner-repository.service';
import { HttpErrorResponse } from '@angular/common/http';
// import { Cart } from 'src/app/_interfaces/cart.model';
import { Product } from 'src/app/_interfaces/product.model';
import { ActivatedRoute } from '@angular/router';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { MenuComponent } from 'src/app/menu/menu.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  productId: number;
  quantity: number = 1;
  errorMessage: string;
  product: Product;
  totalPrice: number;
  successMessage : string;


  totalQuantity: number;
  totalPriceAndQuantity: {totalPrice: number, totalQuantity: number} = {totalPrice: 0, totalQuantity: 0};


  constructor(private repository:  OwnerRepositoryService, private errorHandler: ErrorHandlerService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getProductId();
  }

  getProductId(){

    const id = this.route.snapshot.params['id'];
    console.log('Product ID: ', id);
    this.productId = id;
    
    this.repository.getProduct(`marketplace/products/${id}`).subscribe((product: Product) => {
      console.log('Product Details: ', product);
      this.product = product;
      this.totalPrice = product.price;
      this.totalQuantity = 1;
    });
  }

  onAddToCart() {
    const token = localStorage.getItem('token');
    const authToken = `Bearer ${token}`;
    console.log('Auth Token: ', authToken);
  
    if (this.quantity <= 0 || this.quantity > this.product.stockQuantity) {
      this.errorMessage = "Invalid quantity.";
      return;
    }

    this.repository.addToCart(`marketplace/products/cart?id=${this.productId}&quantity=${this.quantity}`, null, authToken)
      .subscribe({
        next: () => {
          
            this.totalPriceAndQuantity.totalQuantity += this.quantity;
          this.totalPriceAndQuantity.totalPrice += this.product.price * this.quantity;
          window.location.reload();
          this.successMessage = 'added successful'; 
         
         
        },
        error: (err: HttpErrorResponse) => {
          
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

  onQuantityChange() {
    this.totalPrice = this.product.price * this.quantity;
    this.totalQuantity = this.quantity;
  }

  increaseQuantity() {
    this.quantity++;
    this.onQuantityChange();
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
      this.onQuantityChange();
    }
  }
  
}






