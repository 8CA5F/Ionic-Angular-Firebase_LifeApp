import { Time } from "@angular/common";

export class User {
    email: string;
    password: string;
    plans: {title:string, description:string, endTime:Date};
}