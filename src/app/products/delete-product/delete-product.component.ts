import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OwnerRepositoryService } from './../../shared/services/owner-repository.service';
import { Product } from 'src/app/_interfaces/product.model';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.css']
})
export class DeleteProductComponent implements OnInit {
  product: Product;
  productId: number;

  constructor(
    private repository: OwnerRepositoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    console.log('Product ID: ', id);
    this.productId = id;

    this.repository.getProduct(`marketplace/products/${id}`).subscribe((product: Product) => {
      console.log('Product Details: ', product);
      this.product = product;
    });
  }

  onDelete() {
    const productUrl = `marketplace/products/delete/${this.productId}`;
    console.log (productUrl);
    const token = localStorage.getItem('token');
    const authToken = `Bearer ${token}`;
    console.log('Auth Token: ', authToken);

    this.repository.deleteProduct(productUrl, authToken).subscribe({
      next: () => {
       
       
          this.router.navigateByUrl('/owner/products');
       
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }

  onCancel() {
    this.router.navigateByUrl('/owner/products');
  }
}
