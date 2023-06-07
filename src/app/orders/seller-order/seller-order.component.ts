
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OwnerRepositoryService } from '../../shared/services/owner-repository.service';
import { ErrorHandlerService } from '../../shared/services/error-handler.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Order } from 'src/app/_interfaces/order.model';



@Component({
  selector: 'app-seller-order',
  templateUrl: './seller-order.component.html',
  styleUrls: ['./seller-order.component.css']
})
export class SellerOrderComponent implements OnInit{

  orderhistory : Order ;
  errorMessage: string = '';

  constructor(private repository: OwnerRepositoryService, private errorHandler: ErrorHandlerService,private activeRoute: ActivatedRoute,
              private route: ActivatedRoute,private router: Router) { }

  ngOnInit() {
   
    this.getSellerOrder();
  }


  private getSellerOrder = () => {
    const token = localStorage.getItem('token');
    const authToken = `Bearer ${token}`;

    const detailsUrl: string = `marketplace/orders/seller-orders`;
    
    this.repository.getSellerOrder(detailsUrl,authToken).subscribe({
      next: (orderhistory : Order ) => {
       
        this.orderhistory = orderhistory;
      },
      error: (err: HttpErrorResponse) => {
        this.errorHandler.handleError(err);
        this.errorMessage = this.errorHandler.errorMessage;
      }
    });
  } 

  getStatus = (Id:number)=>{
    const status: string = `/owner/update/status/${Id}`;
    this.router.navigate([status]);
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

       
        this.router.navigate(['/']);
      },
      (error: HttpErrorResponse) => {
        console.error('Error generating receipt:', error);
       
      }
    );
  }
  
}