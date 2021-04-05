import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { Authentication } from './authentication.routing';
import { SharedModule } from '../shared/shared.module';
import { ProfileComponent } from './components/profile/profile.component';
import { SettingComponent } from './components/setting/setting.component';
import { MembersComponent } from './components/members/members.component';
import { MemberCreateComponent } from './components/member-create/member-create.component';
import { ChangePasswordComponent } from './components/profile/change-password/change-password.component';

@NgModule({
  declarations: [
    HomeComponent,
    ProfileComponent,
    SettingComponent,
    MembersComponent,
    MemberCreateComponent,
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    Authentication,
    SharedModule
  ]
})
export class AuthenticationModule { }
