// // import { Component, OnInit } from '@angular/core';
// // import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// // import { Router } from '@angular/router';
// // import { OwnerRepositoryService } from '../shared/services/owner-repository.service';
// // import { User } from '../_interfaces/user.model';
// // import jwt_decode from 'jwt-decode';

// // @Component({
// //   selector: 'app-login',
// //   templateUrl: './login.component.html',
// //   styleUrls: ['./login.component.css']
// // })
// // export class LoginComponent implements OnInit {
// //   loginForm: FormGroup;
// //   loginMessage = '';

// //   constructor(
// //     private fb: FormBuilder,
// //     private ownerRepository: OwnerRepositoryService,
// //     private router: Router
// //   ) {}

// //   ngOnInit(): void {
// //     this.loginForm = this.fb.group({
// //       username: ['', Validators.required],
// //       password: ['', Validators.required]
// //     });
// //   }

// //   onSubmit(): void {
// //     const user: User = this.loginForm.value;
// //     const loginAddress = 'marketplace/authentication/login';
// //     this.ownerRepository.login(loginAddress, user).subscribe({
// //       next: ({ token }) => {
// //         localStorage.setItem('token', token);
// //         // this.checkRoles(token);
// //       },
// //       error: (error) => {
// //         console.error(error);
// //         this.loginMessage = 'Login failed'; 
// //       }
// //     });
// //   }

// //   checkRoles(token: string): void {
// //     const decodedToken: any = jwt_decode(token);
  
// //     const role = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
// //   console.log(decodedToken);
// //     console.log(role);
// //     const routes = {
// //       buyer: '/owner/products',
// //       seller: '/home',
// //       admin: '/admin/dashboard',
// //       default: '/'
// //     };
// //     this.router.navigateByUrl(routes[role] || routes.default);
    
// //   }
  
// // }






























import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from '../_interfaces/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    const user: User = this.loginForm.value;
    this.authService.login( user).subscribe({
      next: () => {
        this.loginMessage = 'Login successful'; 
        this.router.navigateByUrl('/owner/products').then(() => {
          window.location.reload();
        });
      },
      error: (err) => {
        console.log('Error while checking out: ', err);
        
        if (err.status === 0) {
          console.log('Connection Error');
          this.loginMessage = 'Could not connect to server. Please check your internet connection and try again.';
        } else if (err.status === 400) {
          console.log('Bad Request Error');
          this.loginMessage = 'Invalid request. Please try again with valid inputs.';
        } else if (err.status === 401) {
          console.log('Unauthorized Error');
          this.loginMessage = 'Incorrect username or password. Please try again.';
        } else if (err.status === 403) {
          console.log('Forbidden Error');
          this.loginMessage = 'Access to the requested resource is forbidden. Please contact the administrator.';
        } else if (err.status === 404) {
          console.log('Not Found Error');
          this.loginMessage = 'The requested resource could not be found. Please try again with valid inputs.';
        } else {
          console.log('Unknown Error');
          this.loginMessage = 'An unknown error occurred. Please try again later.';
        }
      }
    });
  }
}








// import { Component, OnInit, Output, EventEmitter } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { OwnerRepositoryService } from '../shared/services/owner-repository.service';
// import { User } from '../_interfaces/user.model';
// import { JwtHelperService } from '@auth0/angular-jwt';

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
//     private router: Router,
//     private jwtHelper: JwtHelperService
//   ) {}

//   ngOnInit() {
//     this.loginForm = this.fb.group({
//       username: ['', Validators.required],
//       password: ['', Validators.required]
//     });
//     const token = localStorage.getItem('token');
//     if (token && this.jwtHelper.isTokenExpired(token)) {
//       localStorage.removeItem('token');
//       this.router.navigateByUrl('/owner/login')
//     }
//   }


//   onSubmit() {
//     const user: User = this.loginForm.value;
//     const loginAddress = 'marketplace/authentication/login';
//     this.ownerRepository.login(loginAddress, user).subscribe({
//       next: (response: { token: string, role: string }) => {
//         console.log(response );
//         localStorage.setItem('token', response.token);
//         this.loginMessage = 'Login successful'; 
//         this.loggedIn.emit(true);
//         console.log(response.token);
//         console.log(response.role);
//         switch (response.role) {
//           case 'admin':
//             this.router.navigateByUrl('/admin/dashboard').then(() => {
//               window.location.reload();
//             });
//             break;
//           case 'seller':
//             this.router.navigateByUrl('/seller/products').then(() => {
//               window.location.reload();
//             });
//             break;
//           case 'buyer':
//             this.router.navigateByUrl('/buyer/products').then(() => {
//               window.location.reload();
//             });
//             break;
//           default:
//             this.router.navigateByUrl('/').then(() => {
//               window.location.reload();
//             });
//         }
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
//   }}