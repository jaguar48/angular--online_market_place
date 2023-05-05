import { Component, OnInit } from '@angular/core';
import { OwnerRepositoryService } from './../../shared/services/owner-repository.service';
import { HttpErrorResponse } from '@angular/common/http';
import {  CartItem, Carts } from 'src/app/_interfaces/cart.model';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/_interfaces/product.model';
import { Router } from '@angular/router';
import { ShippingMethod } from 'src/app/cart/shipping.enum';
import { Order } from 'src/app/_interfaces/order.model';

@Component({
  selector: 'app-update-order',
  templateUrl: './update-order.component.html',
  styleUrls: ['./update-order.component.css']
})
export class UpdateOrderComponent implements OnInit  {


  errorMessage = '';
  
  orderId: number;
  status: string;
  order: Order;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private repository: OwnerRepositoryService,
    private errorHandler: ErrorHandlerService
  ) {}

  ngOnInit() {
    this.getOrderId();
  }

  getOrderId(){

    const token = localStorage.getItem('token');
    const authToken = `Bearer ${token}`;  
    
    const Id = this.route.snapshot.params['id'];
    console.log("id",Id);
    this.orderId = Id;

   this.repository.getOrder(`marketplace/orders/order/${this.orderId}`, authToken).subscribe((order : Order )=>{
    console.log('order Details: ', order);
  this.order = order;
   }) ;

}

updateOrder(): void {
  const token = localStorage.getItem('token');
  const authToken = `Bearer ${token}`;
  
  this.repository.updateOrderStatus(`marketplace/orders/updateOrderStatus?orderId=${this.orderId}&status=${this.status }`, null, authToken).subscribe({
    next: (response: { authorizationUrl: string}) => {
        console.log('Updated successful');
        this.router.navigate(['/owner/seller/orders']);
    },    
    error: (err: HttpErrorResponse) => {
      console.log('Error while updating status: ', err);
      
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
