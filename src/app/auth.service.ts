import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { OwnerRepositoryService } from './shared/services/owner-repository.service';
 import { User } from './_interfaces/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    private repository: OwnerRepositoryService
  ) {}

  login(user: User): Observable<any> {
    return this.repository.login('marketplace/authentication/login', user)
      .pipe(
        tap(response => {
          if (response && response.token) {
            localStorage.setItem('token', response.token);
            this.loggedIn.next(true);
            console.log('User is logged in:', this.loggedIn.getValue());
          }
        })
      );
  }
  

  logout(): void {
    localStorage.removeItem('token');
    this.loggedIn.next(false);
  }

  get isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  getToken(): string {
    return localStorage.getItem('token');
  }
}
