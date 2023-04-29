import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OwnerRepositoryService } from './../../shared/services/owner-repository.service';
import { Product } from 'src/app/_interfaces/product.model';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  productForm: FormGroup;
  productId: number;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private repository: OwnerRepositoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  

  ngOnInit() {
    this.editProduct();
    
    };


  editProduct(){
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(60)]],
      description: ['', [Validators.required, Validators.maxLength(1000)]],
      price: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      stockQuantity: ['', Validators.required],
      brand: ['', [Validators.required, Validators.maxLength(60)]]
  })

    const id = this.route.snapshot.params['id'];
    console.log('Product ID: ', id);
    this.productId = id;
    
    this.repository.getProduct(`marketplace/products/${id}`).subscribe((product: Product) => {
      console.log('Product Details: ', product);
      this.productForm.patchValue(product);
    });
    
  }

  
  onSubmit() {
    console.log('Submitting Product Form: ', this.productForm);

    const productToUpdate: Product = this.productForm.value;
    console.log (productToUpdate);
    const productUrl = `marketplace/products/edit/${this.productId}`;
    console.log (productUrl);
    const token = localStorage.getItem('token');
    const authToken = `Bearer ${token}`;
    console.log('Auth Token: ', authToken);
  
    this.repository.editProduct(productUrl, productToUpdate, authToken).subscribe({
      next: (response: any) => {
        console.log('Edit Product Response: ', response);
        if (response.success) {
          this.router.navigateByUrl('/owner/products');
          this.errorMessage = response.message;
        } else {
          this.errorMessage = 'edit failed';
        }
      },
      error: (error: any) => {
        console.error(error);
        this.errorMessage = 'edit failed';
      }
    });
  }


  onCancel() {
    this.router.navigateByUrl('/owner/products');
  }
}
