import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OwnerRepositoryService } from 'src/app/shared/services/owner-repository.service';

import { SellerForRegistration } from 'src/app/_interfaces/regsterseller.model';

@Component({
  selector: 'app-register-seller',
  templateUrl: './register-seller.component.html',
  styleUrls: ['./register-seller.component.css']
})
export class RegisterSellerComponent implements OnInit {
  registrationForm: FormGroup;
  loginMessage: string = '';

  constructor(private fb: FormBuilder, private ownerRepoService: OwnerRepositoryService, private router: Router) { }

  ngOnInit() {
    this.createRegistrationForm();
  }

  createRegistrationForm() {
    this.registrationForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      businessName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required]
    },
     {validator: this.passwordMatchValidator} as AbstractControlOptions);
  }
  
  passwordMatchValidator(fg: FormGroup): {[key: string]: any} {
    const password = fg.get('password').value;
    const confirmPassword = fg.get('confirmPassword').value;
    return password === confirmPassword ? null : {mismatch: true};
  }

  
  onSubmit() {
    const sellerForRegistration: SellerForRegistration = this.registrationForm.value;
    const registerAddress = 'marketplace/seller/register';
  
    this.ownerRepoService.registerSeller(registerAddress, sellerForRegistration).subscribe({
      next: (response: any) => {
        if (response.success) {
          this.router.navigateByUrl('/owner/login');
          this.loginMessage = response.message;
        } else {
          this.loginMessage = 'registration failed';
        }
      },
      error: (error: any) => {
        console.error(error);
        this.loginMessage = 'registration failed';
      }
    });
  }


}