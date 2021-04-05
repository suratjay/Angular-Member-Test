import { Injectable } from "@angular/core";
import { AbstractControl } from "@angular/forms";

@Injectable()

export class ValidatorsService {
    comparePassword(passwordField: string) {
        return function (confirm_password: AbstractControl) {
            if (!confirm_password.parent) return;
            const password = confirm_password.parent.get(passwordField);
            const passwordSubscripe = password.valueChanges.subscribe(() => {
                confirm_password.updateValueAndValidity();
                passwordSubscripe.unsubscribe();
            });
            if (confirm_password.value === password.value)
                return;
            return { compare: true };
        }
    }

    isPassword(password: AbstractControl) {
        if (password.value == '') return;
        if (/^[a-z0-9]{8,15}$/.test(password.value)) return;
        return { password: true };
    }
}