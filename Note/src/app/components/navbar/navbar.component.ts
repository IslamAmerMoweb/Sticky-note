import { Component } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  bg: string = '';
  menu: string = 'Login';
  constructor(private _Router: Router, public _Auth: AuthService) {
    this._Router.events.subscribe((res) => {
      if (res instanceof NavigationEnd) {
        this.menu = res.url.replace('/', '');
      }
    });
  }

  ngOnInit() {
    // this.bg = this._Auth.name;
    // console.log(this.bg);
  }
}
