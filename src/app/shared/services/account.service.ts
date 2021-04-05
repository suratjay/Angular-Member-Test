import { Injectable } from "@angular/core";
import { IChangePassword } from "src/app/authentication/components/profile/change-password/change-password.interface";
import { IProfile } from "src/app/authentication/components/profile/profile.interface";
import { ILogin } from "src/app/components/login/login.interface";
import { IRegister } from "src/app/components/register/register.interface";

@Injectable({
    providedIn: 'root'
})
export class AccountService {

    public mockUserItems: IAccout[] = [
        {
            id: 1,
            firstname: 'Surat',
            lastname: 'Boonraksa',
            email: 'suratjay099@gmail.com',
            password: '123456',
            position: 'Frontend Developer',
            image: 'https://static.posttoday.com/media/content/2014/09/01/6152819D91254DC2B2DAEF5E80248F08_1000.jpg',
            role: IRoleAccount.Admin,
            created: new Date(),
            updated: new Date()
        },
        {
            id: 2,
            firstname: 'Backend',
            lastname: 'Developer',
            email: 'backend@gmail.com',
            password: '123456',
            position: 'Backend Developer',
            image: null,
            role: IRoleAccount.Employee,
            created: new Date(),
            updated: new Date()
        }
    ];

    onLogin(model: ILogin) {
        // console.log(model);
        return new Promise<{ accessToken: string }>((resolve, reject) => {
            // resolve(model);
            const userLogin = this.mockUserItems.find(item => item.email == model.email && item.password == model.password);
            //    console.log(userLogin);
            if (!userLogin) return reject({ Message: 'Username or Password Invalid!' });
            resolve({
                accessToken: userLogin.id
            });

        });
    }

    onRegister(model: IRegister) {
        // console.log(model);
        return new Promise((resolve, reject) => {
            const _model: IAccout = model;
            _model.id = Math.random();
            _model.image = null;
            _model.position = '';
            _model.role = IRoleAccount.Member;
            _model.created = new Date();
            _model.updated = new Date();
            this.mockUserItems.push(model);
            resolve(model);
        });
    }

    getUserLogin(accessToken: string) {
        return new Promise<IAccout>((resolve, reject) => {
            const userLogin = this.mockUserItems.find(m => m.id == accessToken);
            if (!userLogin) return reject({ Message: 'accessToken Invalid' });
            resolve(userLogin);
        });
    }

    onUpdateProfile(accessToken: string, model: IProfile) {
        return new Promise((resolve, reject) => {
            const userProfile = this.mockUserItems.find(user => user.id == accessToken);
            if (!userProfile) return reject({ Message: 'There are no users on the system.' });
            userProfile.firstname = model.firstname;
            userProfile.lastname = model.lastname;
            userProfile.position = model.position;
            userProfile.image = model.image;
            userProfile.updated = new Date();
            resolve(userProfile)
        });
    }

    onChangePassword(accessToken: string, model: IChangePassword) {
        return new Promise((resolve, reject) => {
            const userProfile = this.mockUserItems.find(item => item.id == accessToken);
            if (!userProfile) return reject({ Message: 'There are no users on the system.' });
            if (userProfile.password !== model.old_pass) return reject({ Message: 'Password Invalid' });
            userProfile.password = model.new_pass;
            userProfile.updated = new Date();
            resolve(userProfile);
        });
    }
}


export interface IAccout {
    firstname: string;
    lastname: string;
    email: string;
    password: string;

    id?: any;
    position?: string;
    image?: string;
    role?: IRoleAccount;
    created?: Date;
    updated?: Date;
}

export enum IRoleAccount {
    Member,
    Employee,
    Admin
}