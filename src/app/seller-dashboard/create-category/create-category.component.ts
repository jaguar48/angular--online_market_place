import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { createCategory } from 'src/app/_interfaces/category.models';
import { SuccessModalComponent } from 'src/app/shared/modals/success-modal/success-modal.component';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { SellerepoService } from 'src/app/shared/services/sellerepo.service';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent {
  errorMessage: string = '';
  bsModalRef?: BsModalRef;
  name: string;

  constructor(
    private repository: SellerepoService,
    private errorHandler: ErrorHandlerService,
    private router: Router,
    private modalService: BsModalService,
  ) {}

  onSubmit() {
    const categoryUrl = 'marketplace/products/add';
    const token = localStorage.getItem('token');
    const authToken = `Bearer ${token}`;

    const category: createCategory = {
      name: this.name
    };

    this.repository.createCategory(categoryUrl, category, authToken).subscribe({
      next: () => {
        const config: ModalOptions = {
          initialState: {
            modalHeaderText: 'Success Message',
            modalBodyText: `Category created successfully`,
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
    this.router.navigate(['/seller/products']);
  };
}
