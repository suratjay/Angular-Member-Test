import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AuthenService } from 'src/app/services/authen.service';
import { AccountService } from 'src/app/shared/services/account.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ValidatorsService } from 'src/app/shared/services/validators.service';
import { IChangePasswordComponent } from './change-password.interface';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements IChangePasswordComponent {

  constructor(
    private authen: AuthenService,
    private alert: AlertService,
    private account: AccountService,
    private builder: FormBuilder,
    private validators: ValidatorsService,
  ) { 
    this.initialCreateFormData();
  }

  ngOnInit() {
  }

  @Input('modalRef') modalRef: BsModalRef;

  form: FormGroup;
  onSubmit() {
    if (this.form.invalid)
      return this.alert.someting_wrong();
    this.account
      .onChangePassword(this.authen.getAuthenticated(), this.form.value)
      .then(user => {
        this.alert.notify('Change Password Success', 'info');
        this.modalRef.hide();
      })
      .catch(err => this.alert.notify(err.Message));
  }

  private initialCreateFormData() {
    this.form = this.builder.group({
      old_pass: ['', [Validators.required]],
      new_pass: ['', [Validators.required, this.validators.isPassword]],
      cnew_pass: ['', [Validators.required, this.validators.comparePassword('new_pass')]]
    });
  }



}
