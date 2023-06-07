import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OwnerRepositoryService } from '../../shared/services/owner-repository.service';
import { ErrorHandlerService } from '../../shared/services/error-handler.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Order } from 'src/app/_interfaces/order.model';


@Component({
  selector: 'app-buyer-order',
  templateUrl: './buyer-order.component.html',
  styleUrls: ['./buyer-order.component.css']
})
export class BuyerOrderComponent implements OnInit{

  orderhistory : Order ;
  errorMessage: string = '';

  constructor(private repository: OwnerRepositoryService, private errorHandler: ErrorHandlerService,private activeRoute: ActivatedRoute,
              private route: ActivatedRoute,private router: Router) { }

  ngOnInit() {
   
    this.getBuyerOrder();
  }


  private getBuyerOrder = () => {
    const token = localStorage.getItem('token');
    const authToken = `Bearer ${token}`;

    const detailsUrl: string = `marketplace/orders/buyer-order`;
    
    this.repository.getBuyerOrder(detailsUrl,authToken).subscribe({
      next: (orderhistory : Order ) => {
       
        this.orderhistory = orderhistory;
      },
      error: (err: HttpErrorResponse) => {
        this.errorHandler.handleError(err);
        this.errorMessage = this.errorHandler.errorMessage;
      }
    });
  } 

  generateReceipt(orderId: number) {

    const receiptUrl = `marketplace/orders/${orderId}/receipt`;
    const token = localStorage.getItem('token');
    const authToken = `Bearer ${token}`;

    this.repository.generateReceipt(receiptUrl,authToken).subscribe(
      (response: Blob) => {
        // Create a URL for the blob response
        const url = window.URL.createObjectURL(response);

        // Open the URL in a new tab
        window.open(url);

        // Redirect or perform any necessary actions
        this.router.navigate(['/receipt-success']);
      },
      (error: HttpErrorResponse) => {
        console.error('Error generating receipt:', error);
        // Handle the error appropriately
      }
    );
  }
  
}