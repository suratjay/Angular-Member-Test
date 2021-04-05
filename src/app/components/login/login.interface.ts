import { FormGroup } from "@angular/forms";

export interface ILoginComponent {
    AppURL: any;
    form: FormGroup;

    onSubmit(): void;
}

export interface ILogin {
    email: string;
    password: string;
}