import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, Output, EventEmitter, ErrorHandler } from '@angular/core';
import { OwnerRepositoryService } from '../shared/services/owner-repository.service';
import { Router } from '@angular/router';
import { CartItem } from '../_interfaces/cart.model';
import { CreateProductComponent } from '../seller-dashboard/create-product/create-product.component';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit{

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );


    isCollapsed: boolean = false;
    @Input() isLoggedIn: boolean;
    @Output() loggedIn: EventEmitter<boolean> = new EventEmitter<boolean>();
    
    cartItems : CartItem []
    cartCount:number;
    create:CreateProductComponent;
    constructor(
      
      private repository: OwnerRepositoryService,
      private router: Router,
      private errorHandler: ErrorHandler,private breakpointObserver: BreakpointObserver
    ) {}

    ngOnInit(): void {
      const token = localStorage.getItem('token');
      this.isLoggedIn = !!token;
  
      if(this.isLoggedIn){
        this.getCart();
        this.createProduct();
      }
     
    }

    onLogout() {
      localStorage.removeItem('token');
      this.isLoggedIn = false;
      this.loggedIn.emit(false);
    }
  
   
  
    getCart(): void {
      const token = localStorage.getItem('token');
      const authToken = `Bearer ${token}`;
    
      this.repository.getCartItems('marketplace/products/viewcart', authToken).subscribe({
        next: (cart: CartItem []) => {
          this.cartItems = cart;
         
  
          },       
        error: (err: HttpErrorResponse) => {
          console.log('Error while fetching cart: ', err);
        },
        
      })}
      
  
    createProduct() {
      
      const productUrl = 'marketplace/products/create';
      const token = localStorage.getItem('token');
      const authToken = `Bearer ${token}`;
    
      this.repository.createProduct(productUrl, null, authToken).subscribe({
        next: () => {
          
          },
    
          error: (err: HttpErrorResponse) => {
            console.log('Error while fetching cart: ', err);
          },
        })
      }
  
    }
  