import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private role: string;

  constructor() { }

  setRole(role: string) {
    this.role = role;
  }

  getRole() {
    return this.role;
  }
}
