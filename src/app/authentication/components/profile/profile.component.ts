import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AuthenService } from 'src/app/services/authen.service';
import { AccountService } from 'src/app/shared/services/account.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { SharedsService } from 'src/app/shared/services/shareds.service';
import { IProfileComponent } from './profile.interface'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements IProfileComponent {

  constructor(
    private builder: FormBuilder,
    private account: AccountService,
    private authen: AuthenService,
    private router: Router,
    private alert: AlertService,
    private modalService: BsModalService,
    private shared: SharedsService
  ) {
    this.initialCreateFormData();
    this.initialLoadUpdateFormData();
    this.positionItems = this.shared.positionItems;
  }

  ngOnInit() {
  }

  form: FormGroup;
  modalRef: BsModalRef;

  positionItems: any[] = [];

  onSubmit(): void {
    if (this.form.invalid) return this.alert.someting_wrong();
    // console.log(this.form.value);
    this.account
      .onUpdateProfile(this.authen.getAuthenticated(), this.form.value)
      .then(() => this.alert.notify('Successfully edited the information.', 'info'))
      .catch(err => this.alert.notify(err.Message))

  }

  private initialCreateFormData() {
    this.form = this.builder.group({
      email: [''],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      position: ['', Validators.required],
      image: [null]
    });
    this.form.get('email').disable();
  }


  private initialLoadUpdateFormData() {
    this.account
      .getUserLogin(this.authen.getAuthenticated())
      .then(user => {
        this.form.controls['email'].setValue(user.email);
        this.form.controls['firstname'].setValue(user.firstname);
        this.form.controls['lastname'].setValue(user.lastname);
        this.form.controls['position'].setValue(user.position);
        this.form.controls['image'].setValue(user.image);
      })
      .catch(err => this.alert.notify(err.Message));
  }

  onConvertImage(input: HTMLInputElement) {
    // console.log(input);
    const imageControl = this.form.controls['image'];
    this.shared
      .onConvertImage(input)
      .then(base64 => imageControl.setValue(base64))
      .catch(err => {
        input.value = null;
        imageControl.setValue(null);
        this.alert.notify(err.Message);
      });

    // const imageTypes = ['image/jpeg', 'image/png'];

    // imageControl.setValue(null);
    // if (input.files.length == 0) return;
    // if (imageTypes.indexOf(input.files[0].type) < 0) {
    //   input.value = null;
    //   return this.alert.notify('Please upload only pictures.', 'warning')
    // }

    // const reader = new FileReader();
    // reader.readAsDataURL(input.files[0]);
    // reader.addEventListener('load', () => {
    //   imageControl.setValue(reader.result);
    // })

  }

  openModal(template: TemplateRef<any>) {
    // console.log(template);
    this.modalRef = this.modalService.show(template)
  }

}
