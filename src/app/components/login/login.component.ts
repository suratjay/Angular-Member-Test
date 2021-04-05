import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppURL } from 'src/app/app.url';
import { AuthenService } from 'src/app/services/authen.service';
import { AccountService } from 'src/app/shared/services/account.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ILoginComponent } from './login.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements ILoginComponent {

  constructor(
    private builder: FormBuilder,
    private alert: AlertService,
    private router: Router,
    private account: AccountService,
    private authen: AuthenService
  ) {
    this.initialCreateFromData();
  }

  AppURL = AppURL;
  form: FormGroup;

  onSubmit(): void {
    if (this.form.invalid)
      return this.alert.someting_wrong();
    this.account
      .onLogin(this.form.value)
      .then(res => {
        this.authen.setAuthenticated(res.accessToken);
        this.alert.notify('Login Success', 'info');
        this.router.navigate(['/', AppURL.Authen]);
      })
      .catch(err => this.alert.notify(err.Message))

  }

  private initialCreateFromData() {
    this.form = this.builder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      remember: [true]
    });
  }
}
