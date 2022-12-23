import { IsEmail, IsNotEmpty } from "class-validator"

export class CreateUserRequest{
    @IsNotEmpty()
    username:string

    @IsNotEmpty()
    password:string

    @IsEmail()
    @IsNotEmpty()
    email:string
}