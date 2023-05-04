import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryWithProducts } from 'src/app/_interfaces/category.models';
import { OwnerRepositoryService } from '../../shared/services/owner-repository.service';
import { ErrorHandlerService } from '../../shared/services/error-handler.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-categorydetails',
  templateUrl: './categorydetails.component.html',
  styleUrls: ['./categorydetails.component.css']
})
export class CategorydetailsComponent implements OnInit {
  categoryId: number;
  categoryWithProducts: CategoryWithProducts;
  errorMessage: string = '';

  constructor(private repository: OwnerRepositoryService, private errorHandler: ErrorHandlerService,private activeRoute: ActivatedRoute,
              private route: ActivatedRoute) { }

  ngOnInit() {
   
    this.getCategoryWithProducts();
  }






  private getCategoryWithProducts = () => {
    const id: string = this.activeRoute.snapshot.params['id'];
    const detailsUrl: string = `marketplace/products/category?id=${id}`;
    
    this.repository.getCategoryWithProducts(detailsUrl).subscribe({
      next: (categoryWithProducts: CategoryWithProducts) => {
        console.log(categoryWithProducts);
        this.categoryWithProducts = categoryWithProducts;
      },
      error: (err: HttpErrorResponse) => {
        this.errorHandler.handleError(err);
        this.errorMessage = this.errorHandler.errorMessage;
      }
    });
  }
  

  
  
}




