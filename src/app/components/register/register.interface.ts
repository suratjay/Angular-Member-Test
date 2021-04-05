import { FormGroup } from "@angular/forms";

export interface IRegisterComponent {
    form: FormGroup;
    AppURL: any;

    onSubmit();
}

export interface IRegister {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    cpassword: string;
}