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

  
}