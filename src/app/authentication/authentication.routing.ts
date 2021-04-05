import { Routes, RouterModule } from '@angular/router';
import { AuthURL } from './authentication.url';
import { HomeComponent } from './components/home/home.component';
import { MemberCreateComponent } from './components/member-create/member-create.component';
import { MembersComponent } from './components/members/members.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SettingComponent } from './components/setting/setting.component';

const RouterLists: Routes = [
    { path: '', redirectTo: AuthURL.Home, pathMatch: 'full' },
    { path: AuthURL.Home, component: HomeComponent },
    { path: AuthURL.Profile, component: ProfileComponent },
    { path: AuthURL.Setting, component: SettingComponent },
    { path: AuthURL.Member, component: MembersComponent },
    {
        path: AuthURL.MemberCreate, children: [
            { path: '', component: MemberCreateComponent },
            { path: ':id', component: MemberCreateComponent }
        ]
    }
]
export const Authentication = RouterModule.forChild(RouterLists);