import { IAccout } from "../../services/account.service";

export interface IAuthSidebarComponent{
    AppURL: any;
    AuthURL: any;
    UserLogin: IAccout;
}