import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

isCollapsed: boolean = false;
@Input() isLoggedIn: boolean;
@Output() loggedIn: EventEmitter<boolean> = new EventEmitter<boolean>();


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

