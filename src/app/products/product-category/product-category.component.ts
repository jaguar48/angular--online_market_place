import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from './../../_interfaces/product.model';
import { OwnerRepositoryService } from './../../shared/services/owner-repository.service';
import { ErrorHandlerService } from './../../shared/services/error-handler.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Category } from 'src/app/_interfaces/category.models';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css']
})
export class ProductCategoryComponent implements OnInit{
  categories : Category [];
  errorMessage: string = '';


  constructor(private repository: OwnerRepositoryService, private errorHandler: ErrorHandlerService,
    private router: Router) { }


  ngOnInit(): void {
    this.getAllCategories();
  }

  private getAllCategories = () => {
    const apiAddress: string = 'marketplace/products/categories';
    this.repository.getProducts(apiAddress)
    .subscribe({
      next: (category: Category [] ) => {
        this.categories = category ;
      
      },
      error: (err: HttpErrorResponse) => {
        this.errorHandler.handleError(err);
        this.errorMessage = this.errorHandler.errorMessage;
      }
    })
  }


  public getCategoryDetails = (id) => {
    const detailsUrl: string = `/owner/category/${id}`; 
    this.router.navigate([detailsUrl]); 
  } 
}