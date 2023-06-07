import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Product } from './../../_interfaces/product.model';
import { Router, ActivatedRoute } from '@angular/router';
import { OwnerRepositoryService } from './../../shared/services/owner-repository.service';
import { ErrorHandlerService } from './../../shared/services/error-handler.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit{

  product: Product;
  quantity: number = 1;
  errorMessage: string = '';

  constructor(
    private repository: OwnerRepositoryService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private errorHandler: ErrorHandlerService
  ) {}

  ngOnInit() {
    this.getProductDetails();
  }

  private getProductDetails = () => {
    const id: string = this.activeRoute.snapshot.params['id'];

    console.log('Product ID: ', id);

    const detailsUrl: string = `marketplace/Products/${id}`;

    console.log('Details URL: ', detailsUrl);

    this.repository.getProduct(detailsUrl).subscribe({
      next: (product: Product) => {
        console.log('Product details: ', product);
        this.product = product;
      },
      error: (err: HttpErrorResponse) => {
        console.log('Error while fetching product details: ', err);
        this.errorHandler.handleError(err);
        this.errorMessage = this.errorHandler.errorMessage;
      }
    });
  };
  public createImgPath = (serverPath: string) => {
    const baseUrl = 'https://localhost:7258'; 
    const imagePath = serverPath.replace(/\\/g, '/'); 
  
    return `${baseUrl}/${imagePath}`;
  };
  
  public addToCart = (id: string ) => {
    const cartUrl: string = `/owner/cart/${id}`;
    this.router.navigate([cartUrl]);
  };
  
}
