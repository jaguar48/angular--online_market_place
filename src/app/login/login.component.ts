import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OwnerRepositoryService } from '../shared/services/owner-repository.service';
import { User } from '../_interfaces/user.model';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginMessage = '';

  constructor(
    private fb: FormBuilder,
    private ownerRepository: OwnerRepositoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    const user: User = this.loginForm.value;
    const loginAddress = 'marketplace/authentication/login';
    this.ownerRepository.login(loginAddress, user).subscribe({
      next: ({ token }) => {
        localStorage.setItem('token', token);
        this.checkRoles(token);
      },
      error: (error) => {
        console.error(error);
        this.loginMessage = 'Login failed'; 
      }
    });
  }

  checkRoles(token: string): void {
    const decodedToken: any = jwt_decode(token);
    const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];    
    const routes = {
      Buyer: '/owner/products',
      Seller: '/seller/products',
      Admin: '/admin/dashboard',
      default: '/'
    };
    this.router.navigateByUrl(routes[role] || routes.default);
  }
}