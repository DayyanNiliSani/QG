import { IsEmail, IsNotEmpty } from "class-validator"

export class LoginUserRequest{
    @IsEmail()
    @IsNotEmpty()
    email:string

    @IsNotEmpty()
    password:string
}