import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from './../../_interfaces/product.model';
import { OwnerRepositoryService } from './../../shared/services/owner-repository.service';
import { ErrorHandlerService } from './../../shared/services/error-handler.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
  products: Product [];
  errorMessage: string = '';
  filteredProducts: Product[];

  constructor(private repository: OwnerRepositoryService, private errorHandler: ErrorHandlerService,
    private router: Router) { }


  ngOnInit(): void {
    this.getAllProucts();
  }

  private getAllProucts = () => {
    const apiAddress: string = 'marketplace/Products';
    this.repository.getProducts(apiAddress)
    .subscribe({
      next: (products: Product [] ) => {
        this.products = products;
        this.filteredProducts = products;

      },
      error: (err: HttpErrorResponse) => {
          this.errorHandler.handleError(err);
          this.errorMessage = this.errorHandler.errorMessage;
      }
    })
  }
  public getProductDetails = (id) => {
    const detailsUrl: string = `/owner/details/${id}`; 
    this.router.navigate([detailsUrl]); 
  } 

  public filterProducts = (searchTerm: string) => {
    if (searchTerm) {
      searchTerm = searchTerm.trim().toLowerCase();
      this.filteredProducts = this.products.filter(product =>
        product.name.toLowerCase().includes(searchTerm) || product.description.toLowerCase().includes(searchTerm)
      );
    } else {
      this.filteredProducts = this.products;
    }
  }

  public editProduct = (id: number) => {
    const editUrl: string = `/owner/edit/${id}`;
    this.router.navigate([editUrl]);
  }  

  public deleteProduct = (id: number) => {
    const deleteUrl: string = `/owner/delete/${id}`;
    this.router.navigate([deleteUrl]);
  }
  public addTCart = (id: number) => {
    const cartUrl: string = `/owner/cart/${id}`;
    this.router.navigate([cartUrl]);
  }  
   
}
