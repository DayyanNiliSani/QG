import { User } from "src/Domain/Entities/user"

export interface CreateUserDto {
    username:string
    password:string
    email:string
}

export interface UpdateUserDto {
    username:string,
    email:string,
}

export interface ReadUserDto {
    id:number, 
    username:string,
    email:string,
    isAdmin:boolean
}

export interface LoginUserDto{
    email:string
    password:string
}

export function mapModelToDto(model:User):ReadUserDto{
    return {
        id: model.id,
        email: model.email,
        username: model.username,
        isAdmin: model.isAdmin
    }
}