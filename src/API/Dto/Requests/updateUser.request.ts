import { IsEmail, IsNotEmpty} from "class-validator"

export class UpdateUserRequest{
    @IsNotEmpty()
    username:string

    @IsEmail()
    @IsNotEmpty()
    email:string
}