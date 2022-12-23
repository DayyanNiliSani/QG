import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty } from "class-validator"

export class LoginUserRequest{
    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email:string

    @ApiProperty()
    @IsNotEmpty()
    password:string
}