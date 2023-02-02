import { User } from "../user.entity";

export class CreateUserDTO extends User{
 readonly _id: string;
 readonly username: string;
 readonly email: string;
 readonly token: string;
}