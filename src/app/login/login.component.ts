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
    console.log(decodedToken.role);
    const routes = {
      buyer: '/owner/products',
      seller: '/home',
      admin: '/admin/dashboard',
      default: '/'
    };
    setTimeout(() => this.router.navigateByUrl(routes[decodedToken.role] || routes.default), 0);
  }
}






























// import { Component, OnInit, Output, EventEmitter } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { OwnerRepositoryService } from '../shared/services/owner-repository.service';
// import { User } from '../_interfaces/user.model';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent implements OnInit {
//   loginForm: FormGroup;
//   loggedIn: EventEmitter<boolean> = new EventEmitter<boolean>();
//   loginMessage: string = '';

//   constructor(
//     private fb: FormBuilder,
//     private ownerRepository: OwnerRepositoryService,
//     private router: Router
//   ) {}

//   ngOnInit() {
//     this.loginForm = this.fb.group({
//       username: ['', Validators.required],
//       password: ['', Validators.required]
//     });
//   }

//   onSubmit() {
//     const user: User = this.loginForm.value;
//     const loginAddress = 'marketplace/authentication/login';
//     this.ownerRepository.login(loginAddress, user).subscribe({
//       next: (response: { token: string }) => {
//         localStorage.setItem('token', response.token);
//         this.loginMessage = 'Login successful'; 
//         this.loggedIn.emit(true);
//         this.router.navigateByUrl('/owner/products').then(() => {
//           window.location.reload();
//         });
//       },
//       error: (error: any) => {
//         console.error(error);
//         this.loginMessage = 'Login failed'; 
//       }
//     });
//   }
  
 
//   onLogout() {
//     localStorage.removeItem('token');
//     this.router.navigateByUrl('/owner/login');
//     this.loggedIn.emit(false);
//   }
// }
