import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from './../../_interfaces/product.model';
import { OwnerRepositoryService } from './../../shared/services/owner-repository.service';
import { SellerepoService } from 'src/app/shared/services/sellerepo.service';
import { ErrorHandlerService } from './../../shared/services/error-handler.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-seller-products',
  templateUrl: './seller-products.component.html',
  styleUrls: ['./seller-products.component.css']
})
export class SellerProductsComponent implements OnInit{
  products: Product [];
  errorMessage: string = '';
  filteredProducts: Product[];
  currentPage: number = 1;
  totalPages: number;
  productsPerPage = 4;


  constructor(private repository: SellerepoService, private errorHandler: ErrorHandlerService,
    private router: Router) { }


  ngOnInit(): void {
    this.getAllProucts();
  }


  private getAllProucts = () => {
    const apiAddress: string = 'marketplace/products/seller/products';
    const token = localStorage.getItem('token');
    const authToken = `Bearer ${token}`;
    this.repository.getSellerProducts(apiAddress,authToken)
    .subscribe({
      next: (products: Product [] ) => {
        this.products = products;
        
        this.filteredProducts = products;
        this.totalPages = Math.ceil(products.length / this.productsPerPage);
        this.setCurrentPage(1);
      },
      error: (err: HttpErrorResponse) => {
        this.errorHandler.handleError(err);
        this.errorMessage = this.errorHandler.errorMessage;
      }
    })
  }
  
  setCurrentPage(page: number) {
    if (page < 1 || page > this.totalPages) {
      return;
    }
  
    this.currentPage = page;
    const startIndex = (page - 1) * this.productsPerPage;
    const endIndex = Math.min(startIndex + this.productsPerPage, this.products.length);
    this.filteredProducts = this.products.slice(startIndex, endIndex);
  }
  
  get totalPagesArray() {
    return Array(this.totalPages).fill(0).map((x, i) => i + 1);
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
