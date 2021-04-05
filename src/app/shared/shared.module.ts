import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthSidebarComponent } from './components/auth-sidebar/auth-sidebar.component';
import { AuthNavbarComponent } from './components/auth-navbar/auth-navbar.component';
import { AuthContentComponent } from './components/auth-content/auth-content.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertService } from './services/alert.service';
// import { AccountService } from './services/account.service';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ValidatorsService } from './services/validators.service';
import { SharedsService } from './services/shareds.service';

@NgModule({
  declarations: [
    AuthSidebarComponent,
    AuthNavbarComponent,
    AuthContentComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    ModalModule.forRoot(),
    // BsDropdownModule.forRoot(),
    // BrowserAnimationsModule,
  ],
  exports: [
      AuthNavbarComponent,
      AuthSidebarComponent,
      AuthContentComponent,
      ReactiveFormsModule,
      FormsModule,
      ModalModule,
      // BsDropdownModule,
      // BrowserAnimationsModule
  ],
  providers:[
    AlertService,
    // AccountService,
    ValidatorsService,
    SharedsService
  ]
})
export class SharedModule { }
