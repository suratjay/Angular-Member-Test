import { Injectable } from "@angular/core";

@Injectable()
export class SharedsService {

    //  ตำแหน่งของสมาชิก
    positionItems: any[] = [
        'Frontend Developer',
        'Backend Developer'
    ];


    onConvertImage(input: HTMLInputElement) {
        return new Promise((resolve, reject) => {
            const imageTypes = ['image/jpeg', 'image/png'];
            const imageSize = 200;
            if (input.files.length == 0)
                return resolve(null);
            if (imageTypes.indexOf(input.files[0].type) < 0) {
                input.value = null;
                return reject({Message:'Please upload only pictures.'});
            }
            if ((input.files[0].size / 1024) > imageSize)
                return reject({Message:`Please upload no more than ${imageSize} KB`});

            const reader = new FileReader();
            reader.readAsDataURL(input.files[0]);
            // คืนค่า image base64
            reader.addEventListener('load', () => resolve(reader.result));
        });
    }
}