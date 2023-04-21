import { Component, OnInit } from '@angular/core';
import { OwnerRepositoryService } from './../../shared/services/owner-repository.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Cart } from 'src/app/_interfaces/cart.model';
import { Product } from 'src/app/_interfaces/product.model';
import { ActivatedRoute } from '@angular/router';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';

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
  
    this.repository.addToCart(`marketplace/products/cart?id=${this.productId}&quantity=${this.quantity}`, null, authToken)
      .subscribe({
        next: () => {
          console.log("Product added to cart successfully");
            this.totalPriceAndQuantity.totalQuantity += this.quantity;
          this.totalPriceAndQuantity.totalPrice += this.product.price * this.quantity;
        },
        error: (err: HttpErrorResponse) => {
          console.log('Error while adding product to cart: ', err);
          this.errorHandler.handleError(err);
          this.errorMessage = this.errorHandler.errorMessage;
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






