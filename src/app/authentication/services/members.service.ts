import { Injectable } from "@angular/core";
import { AccountService, IAccout, IRoleAccount } from '../../shared/services/account.service';
import { IMemberSearch } from "../components/members/members.interface";

@Injectable()
export class MemberService {
    constructor(private account: AccountService) {
        if (this.account.mockUserItems.length <= 2)
            this.generateMembers();
    }

    // ดึงข้อมูลสมาชิกทังหมด
    getMembers(opitinos?: IMemberSearch) {
        return new Promise<IAccout[]>((resolve, reject) => {
            let items = this.account.mockUserItems;

            if (opitinos) {
                items = this.account
                    .mockUserItems
                    .filter(item =>
                        item[opitinos.searchType].toString().toLowerCase()
                            .indexOf(opitinos.searchText.toString().toLowerCase()) >= 0
                    );
            }
            // resolve(this.account.mockUserItems);
            resolve(items);
        });
    }

    getFrontend(opitinos?: IMemberSearch) {
        return new Promise<IAccout[]>((resolve, reject) => {
            let frontends = this.account.mockUserItems;
            frontends = this.account
                .mockUserItems
                .filter(item =>
                    item['position'].toString().toLowerCase()
                        .indexOf('Frontend Developer'.toString().toLowerCase()) >= 0
                );
            resolve(frontends);
        });
    }

    getBackend(opitinos?: IMemberSearch) {
        return new Promise<IAccout[]>((resolve, reject) => {
            let backends = this.account.mockUserItems;
            backends = this.account
                .mockUserItems
                .filter(item =>
                    item['position'].toString().toLowerCase()
                        .indexOf('Backend Developer'.toString().toLowerCase()) >= 0
                );
            resolve(backends);
        });
    }


    private generateMembers() {
        const positions = ['Frontend Developer', 'Backend Developer'];
        const roles = [IRoleAccount.Member, IRoleAccount.Employee, IRoleAccount.Admin];
        // this.account.mockUserItems.splice(2);
        for (let i = 3; i <= 10; i++)
            this.account.mockUserItems.push({
                id: i.toString(),
                firstname: `Firstname ${i}`,
                lastname: `Lastname ${i}`,
                email: `mail-${i}@mail.com`,
                password: '123456',
                position: positions[Math.round(Math.random() * 1)],
                role: roles[Math.round(Math.random() * 2)],
                created: new Date(),
                updated: new Date()
            });
    }

    createMember(model: IAccout) {
        return new Promise((resolve, reject) => {
            if (this.account.mockUserItems.find(item => item.email == model.email))
                return reject({ Message: 'This email is already in use.' })
            model.id = Math.random();
            model.created = new Date();
            model.updated = new Date();
            this.account.mockUserItems.push(model);
            resolve(model);
        });
    }

    deleteMember(id: any) {
        return new Promise((resolve, reject) => {
            const findIndex = this.account.mockUserItems.findIndex(item => item.id == id);
            if (findIndex < 0) return reject({ Message: 'No data in the system.' });
            resolve(this.account.mockUserItems.splice(findIndex, 1));
        });
    }

    getMemberById(id) {
        return new Promise<IAccout>((resolve, reject) => {
            const member = this.account.mockUserItems.find(item => item.id == id);
            if (!member) return reject({ Message: 'There is no member information in the system' });
            resolve(member);
        });
    }

    updateMember(id: any, model: IAccout) {
        return new Promise<IAccout>((resolve, reject) => {
            const member = this.account.mockUserItems.find(item => item.id == id);
            if (!member) return reject({ Message: 'There is no member information in the system' })

            if (this.account.mockUserItems.find(item => {
                return item.email == model.email && model.email != member.email;
            })) return reject({ Message: 'This email is already in use.' });
            member.email = model.email;
            member.password = model.password || member.password;
            member.firstname = model.firstname;
            member.lastname = model.lastname;
            member.position = model.position;
            member.role = model.role;
            member.image = model.image;
            member.updated = new Date();
            resolve(member);


        });
    }


}

