import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppURL } from 'src/app/app.url';
import { AuthURL } from 'src/app/authentication/authentication.url';
import { AuthenService } from 'src/app/services/authen.service';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-auth-navbar',
  templateUrl: './auth-navbar.component.html',
  styleUrls: ['./auth-navbar.component.css']
})
export class AuthNavbarComponent implements OnInit {

  constructor(
    private router: Router,
    private authen: AuthenService,
    private alert: AlertService
  ) { }

  ngOnInit() {
  }

  AppURL = AppURL;
  AuthURL = AuthURL;

  onLogOut() {
    this.authen.clearAuthenticated();
    this.router.navigate(['/',AppURL.Login]);
    this.alert.notify('Log out Success','info');
  }
}
