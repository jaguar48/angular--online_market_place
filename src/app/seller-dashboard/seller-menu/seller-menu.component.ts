import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, Output, EventEmitter, ErrorHandler } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-menu',
  templateUrl: './seller-menu.component.html',
  styleUrls: ['./seller-menu.component.css']
})
export class SellerMenuComponent implements OnInit {

isCollapsed: boolean = false;
@Input() isLoggedIn: boolean;
@Output() loggedIn: EventEmitter<boolean> = new EventEmitter<boolean>();

constructor(

  private router: Router,
  private errorHandler: ErrorHandler
) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    this.isLoggedIn = !!token;


  }

  onLogout() {
    localStorage.removeItem('token');
    this.isLoggedIn = false;
    this.loggedIn.emit(false);
  }


  }


