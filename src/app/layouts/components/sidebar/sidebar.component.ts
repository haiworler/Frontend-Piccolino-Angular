import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/person', title: 'Personas',  icon: 'how_to_reg', class: '' },
    { path: '/deshboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: '/headquarter', title: 'Sedes',  icon: 'dashboard', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(private _authService: AuthService) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      // if ($(window).width() > 991) {
      //     return false;
      // }
      return true;
  };


  /**
     * Realiza el cierre de la Session
     */

    logout() {
      this._authService.logout();
  }
  
}
