import { FormGroup } from '@angular/forms';
import { IRoleAccount } from 'src/app/shared/services/account.service';
export interface IMemberCreateComponent {
    positionItems: string[];
    roleItems: IRoleAccount[];
    form: FormGroup;
    memId: any;

    onSubmit();

    getRoleName(role: IRoleAccount): string;
    onConvertImage(input: HTMLInputElement);
}