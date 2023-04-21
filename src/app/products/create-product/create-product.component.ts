import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Product } from './../../_interfaces/product.model';
import { OwnerRepositoryService } from './../../shared/services/owner-repository.service';
import { ErrorHandlerService } from './../../shared/services/error-handler.service';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { SuccessModalComponent } from './../../shared/modals/success-modal/success-modal.component';
import { ProductCreate } from 'src/app/_interfaces/product-create.model';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  errorMessage: string = '';
  productForm: FormGroup;
  bsModalRef?: BsModalRef;
  

  constructor(
    private repository: OwnerRepositoryService,
    private errorHandler: ErrorHandlerService,
    private router: Router,
    private modalService: BsModalService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.executeProductCreation();
  }

  executeProductCreation() {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(60)]],
      description: ['', [Validators.required, Validators.maxLength(1000)]],
      price: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      stockQuantity: ['', Validators.required],
      brand: ['', [Validators.required, Validators.maxLength(60)]]
    });
  }
  
  onSubmit() {
    const productToCreate: ProductCreate = this.productForm.value;
    const productUrl = 'marketplace/products/create';
    const token = localStorage.getItem('token');
    const authToken = `Bearer ${token}`;
  
    this.repository.createProduct(productUrl, productToCreate, authToken).subscribe({
      next: () => {
        const config: ModalOptions = {
          initialState: {
            modalHeaderText: 'Success Message',
            modalBodyText: `Product created successfully`,
            okButtonText: 'OK'
          }
        };
  
        this.bsModalRef = this.modalService.show(SuccessModalComponent, config);
        this.bsModalRef.content.redirectOnOk.subscribe(_ => this.redirectToProductList());
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
        this.errorHandler.handleError(err);
        this.errorMessage = this.errorHandler.errorMessage;
      }
    });
  }
  
  redirectToProductList = () => {
    this.router.navigate(['/owner/products']);
  };
}

