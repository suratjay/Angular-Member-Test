import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppURL } from 'src/app/app.url';
import { AccountService } from 'src/app/shared/services/account.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ValidatorsService } from 'src/app/shared/services/validators.service';
import { IRegisterComponent } from './register.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements IRegisterComponent {

  constructor(
    private builder: FormBuilder,
    private alert: AlertService,
    private account: AccountService,
    private router: Router,
    private validators: ValidatorsService
  ) {
    this.initialCreateFormData();
  }

  ngOnInit() {
  }

  AppURL = AppURL;
  form: FormGroup;

  onSubmit() {
    if (this.form.invalid)
      return this.alert.someting_wrong();
    // console.log(this.form.value);
    this.account
      .onRegister(this.form.value)
      .then(res => {
        // console.log(res);
        this.alert.notify('Register Success', 'info');
        this.router.navigate(['/', AppURL.Login]);
      })
      .catch(err => this.alert.notify(err.Message));
  }

  private initialCreateFormData() {
    this.form = this.builder.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this.validators.isPassword]],
      cpassword: ['', [Validators.required, this.validators.comparePassword('password')]]
    })
  }

 

}
