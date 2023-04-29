
import {  CartItem, Carts } from 'src/app/_interfaces/cart.model';
import { Product } from './../../_interfaces/product.model';
import { EnvironmentUrlService } from './environment-url.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductCreate } from 'src/app/_interfaces/product-create.model';
import { BuyerForRegistration } from 'src/app/_interfaces/registerbuyer.model';
import { SellerForRegistration } from 'src/app/_interfaces/regsterseller.model';
import { User } from 'src/app/_interfaces/user.model';
import { Category } from 'src/app/_interfaces/category.models';
@Injectable({
  providedIn: 'root'
})
export class OwnerRepositoryService {

  constructor(private http: HttpClient, private envUrl: EnvironmentUrlService) { }

  public getProducts = (route: string) => {
    return this.http.get<Product[]>(this.createCompleteRoute(route, this.envUrl.urlAddress));
  }
  
  public getCategories = (route: string) => {
    return this.http.get<Category[]>(this.createCompleteRoute(route, this.envUrl.urlAddress));
  }

  public getProduct = (route: string) => {
    return this.http.get<Product>(this.createCompleteRoute(route, this.envUrl.urlAddress));
  }


  public login = (route: string, user: User) => {
    return this.http.post<any>(this.createCompleteRoute(route, this.envUrl.urlAddress), user, this.generateHeaders());
  }


  public registerSeller = (route: string, seller: SellerForRegistration) => {
    return this.http.post<any>(this.createCompleteRoute(route, this.envUrl.urlAddress), seller, this.generateHeaders());
  }
  public registerBuyer = (route: string, buyer: BuyerForRegistration) => {
    return this.http.post<any>(this.createCompleteRoute(route, this.envUrl.urlAddress), buyer, this.generateHeaders());
  }

  public createProduct = (route: string, product: ProductCreate, authToken: string) => {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': authToken
      })
    };
  
    return this.http.post<Product>(this.createCompleteRoute(route, this.envUrl.urlAddress), product, httpOptions);
  };

  public editProduct = (route: string, product: Product, authToken: string) => {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': authToken
      })
    };
    return this.http.put<Product>(this.createCompleteRoute(route, this.envUrl.urlAddress), product, httpOptions);
  };  

  public deleteProduct = (route: string,authToken: string ) => {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': authToken
      })
    };
    return this.http.delete(this.createCompleteRoute(route, this.envUrl.urlAddress), httpOptions);
  };

  public addToCart = (route: string, cart: Carts, authToken: string) => {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': authToken
      })
    };
    return this.http.post<Carts>(this.createCompleteRoute(route, this.envUrl.urlAddress), cart, httpOptions);
  };


  public getCartItems = (route: string, authToken: string) => {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: authToken,
      }),
    };
    return this.http.get<CartItem[]>(this.createCompleteRoute(route, this.envUrl.urlAddress), httpOptions);
  };
  
  public removeFromCart = (route: string,authToken: string ) => {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': authToken
      })
    };
    return this.http.delete(this.createCompleteRoute(route, this.envUrl.urlAddress), httpOptions);
  };


  public checkoutFromCart = (route: string, cart: Carts, authToken: string ) => {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': authToken
      })
    };
    return this.http.post<any>(this.createCompleteRoute(route, this.envUrl.urlAddress), cart, httpOptions);
  };

  public getCart = (route: string,authToken: string ) => {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': authToken
      })
    };
    return this.http.get<CartItem>(this.createCompleteRoute(route, this.envUrl.urlAddress),httpOptions);
  };


  // public initatepayment = (route: string, paymentRequest: Payment ) => {
    
  //   return this.http.post<Payment>(this.createCompleteRoute(route, this.envUrl.urlAddress),paymentRequest);
  // };

  private createCompleteRoute = (route: string, envAddress: string) => {
    return `${envAddress}/${route}`;
  };
  
  

  private generateHeaders = () => {
    return {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
  }
}






