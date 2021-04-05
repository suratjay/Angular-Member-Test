import { Component, OnInit } from '@angular/core';
import { IMembersComponent, IMemberSearch, IMemberSearchKey } from './members.interface';
import { AlertService } from 'src/app/shared/services/alert.service';
import { MemberService } from '../../services/members.service';
import { IAccout, IRoleAccount } from 'src/app/shared/services/account.service';
import { Router } from '@angular/router';
import { AppURL } from 'src/app/app.url';
import { AuthURL } from '../../authentication.url';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css'],
  providers: [MemberService]
})
export class MembersComponent implements IMembersComponent {
  constructor(
    private member: MemberService,
    private alert: AlertService,
    private router: Router
  ) {
    this.initialLoadMembers();
    this.searchType = this.searchTypeItem[0];
  }

  items: IAccout[] = [];
  searchText: string = '';
  searchType: IMemberSearchKey;
  searchTypeItem: IMemberSearchKey[] = [
    { key: 'email', value: 'search from email' },
    { key: 'firstname', value: 'search from firstname' },
    { key: 'lastname', value: 'search from lastname' },
    { key: 'position', value: 'search from position' },
    { key: 'role', value: 'search from role' }
  ];

  // แสดงชื่อสิทธิ์ผู้ใช้งาน
  getRoleName(role: IRoleAccount) {
    return IRoleAccount[role];
  }

  // โหลดข้อมูลสมาชิก
  private initialLoadMembers(opitinos?: IMemberSearch) {
    this.member
      .getMembers(opitinos)
      .then(items => this.items = items)
      .catch(err => this.alert.notify(err.Message));
  }

  onSearchItem() {
    // console.log(this.searchText, this.searchType);
    this.initialLoadMembers({
      searchText: this.getSearchText,
      searchType: this.searchType.key
    });

  }

  onDeleteMember(item: IAccout) {
    this.alert.confirm().then(status => {
      if (!status) return;
      // console.log(item);
      this.member
        .deleteMember(item.id)
        .then(() => {
          this.initialLoadMembers({
            searchText: this.getSearchText,
            searchType: this.searchType.key
          });
          this.alert.notify('Delete member success.', 'info');
        })
        .catch(err => this.alert.notify(err.Message));
    });
  }

  onUpdateMember(item: IAccout) {
    // this.alert.notify(item.id);
    this.router.navigate(['/', AppURL.Authen, AuthURL.MemberCreate, item.id])
  }


  private get getSearchText() {
    return this.searchType.key == 'role' ? IRoleAccount[this.searchText] || '' : this.searchText;
  }


}
