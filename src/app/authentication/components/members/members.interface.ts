import { IAccout, IRoleAccount } from "src/app/shared/services/account.service";


export interface IMembersComponent {
    items: IAccout[];

    getRoleName(role: IRoleAccount): string; 
    onDeleteMember(item: IAccout);
    onUpdateMember(item: IAccout);

    onSearchItem();


    searchText: string;
    searchType: IMemberSearchKey;
    searchTypeItem: IMemberSearchKey[];
}

export interface IMemberSearch{
    searchText: string;
    searchType: string;
}

export interface IMemberSearchKey{
    key: string;
    value: string;
}