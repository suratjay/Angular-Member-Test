import { Component, OnInit } from '@angular/core';
import { IMemberCreateComponent } from './member-create.interface';
import { SharedsService } from 'src/app/shared/services/shareds.service';
import { IRoleAccount } from 'src/app/shared/services/account.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ValidatorsService } from 'src/app/shared/services/validators.service';
import { MemberService } from '../../services/members.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppURL } from 'src/app/app.url';
import { AuthURL } from '../../authentication.url';

@Component({
  selector: 'app-member-create',
  templateUrl: './member-create.component.html',
  styleUrls: ['./member-create.component.css'],
  providers: [MemberService]
})
export class MemberCreateComponent implements IMemberCreateComponent {
  constructor(
    private shareds: SharedsService,
    private builder: FormBuilder,
    private alert: AlertService,
    private shared: SharedsService,
    private validators: ValidatorsService,
    private member: MemberService,
    private router: Router,
    private activatedRouter: ActivatedRoute
  ) {
    this.activatedRouter.params.forEach(params => {
      // console.log(params);
      this.memId = params.id;
    });
    this.intialCreateFormData();
    this.initialUpdateFormData();
    // เพิ่ม position
    this.positionItems = this.shareds.positionItems;
  }

  form: FormGroup;
  memId: any;
  positionItems: string[];
  roleItems: IRoleAccount[] = [
    IRoleAccount.Member,
    IRoleAccount.Employee,
    IRoleAccount.Admin
  ];

  // แสดงข้อมูลสิทธิ์ผู้ใช้เป็น ชื่อตัวหนังสือ
  getRoleName(role: IRoleAccount): string {
    return IRoleAccount[role];
  }

  private intialCreateFormData() {
    this.form = this.builder.group({
      image: [],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this.validators.isPassword]],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      position: ['', Validators.required],
      role: ['', Validators.required]
    });
  }


  onSubmit() {
    if (this.form.invalid)
      return this.alert.someting_wrong();
    // console.log(this.form.value);
    if (!this.memId) {
      this.member
        .createMember(this.form.value)
        .then(res => {
          this.alert.notify('Add Member Success', 'info');
          this.router.navigate(['/', AppURL.Authen, AuthURL.Member]);
        })
        .catch(err => this.alert.notify(err.Message));
    } else {
      this.member
        .updateMember(this.memId, this.form.value)
        .then(res => {
          // console.log(res);
          this.alert.notify('Update success', 'info');
          this.router.navigate(['/', AppURL.Authen, AuthURL.Member]);
        })
        .catch((err) => this.alert.notify(err.Message));
    }


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
  }

  private initialUpdateFormData() {
    if (!this.memId) return;
    this.member
      .getMemberById(this.memId)
      .then(member => {
        // console.log(member);
        const form = this.form;
        form.controls['image'].setValue(member.image);
        form.controls['email'].setValue(member.email);
        form.controls['firstname'].setValue(member.firstname);
        form.controls['lastname'].setValue(member.lastname);
        form.controls['position'].setValue(member.position);
        form.controls['role'].setValue(member.role);
        form.controls['password'].setValidators(this.validators.isPassword);
      })
      .catch(err => {
        this.alert.notify(err.Message);
        this.router.navigate(['/', AppURL.Authen, AuthURL.Member])
      });

  }

}
