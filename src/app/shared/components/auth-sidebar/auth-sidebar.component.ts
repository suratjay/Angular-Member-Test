import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppURL } from 'src/app/app.url';
import { AuthURL } from 'src/app/authentication/authentication.url';
import { AuthenService } from 'src/app/services/authen.service';
import { AccountService, IAccout } from '../../services/account.service';
import { AlertService } from '../../services/alert.service';
import { IAuthSidebarComponent } from './auth-sidebar.interface';

@Component({
  selector: 'app-auth-sidebar',
  templateUrl: './auth-sidebar.component.html',
  styleUrls: ['./auth-sidebar.component.css']
})
export class AuthSidebarComponent implements IAuthSidebarComponent {

  constructor(
    private account: AccountService,
    private authen: AuthenService,
    private alert: AlertService,
    private router: Router
  ) { 
    this.initialLoadUserLogin();
  }

  ngOnInit() {
  }


  AppURL = AppURL;
  AuthURL = AuthURL;
  UserLogin: IAccout;

  private initialLoadUserLogin() {
    this.account
      .getUserLogin(this.authen.getAuthenticated())
      .then(userLogin => this.UserLogin = userLogin)
      .catch(err => {this.alert.notify(err.Message);
        this.authen.clearAuthenticated();
        this.router.navigate(['/',AppURL.Login]);
      });
      
  }
}
