import { Injectable } from "@nestjs/common";
import { CreateUserDto, LoginUserDto, ReadUserDto, UpdateUserDto } from "src/Infra/Repositories/User/user.dto";
import { UserRepo } from "src/Infra/Repositories/User/user.repository";
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken'
import * as config from 'config'

const jwtConfig = config.get("jwt") as {
    password: string,
    expiresIn: string
}

@Injectable()
export class UserService{
    constructor(private userRepo:UserRepo){}

    async create(dto:CreateUserDto):Promise<ReadUserDto>{
        const salt = await bcrypt.genSalt(10);
        dto.password = await bcrypt.hash(dto.password, salt);
        return await this.userRepo.create(dto)
    }

    async login(dto: LoginUserDto):Promise<string>{
        const user = await this.userRepo.findByEmail(dto.email)
        if(!user){}
        const passwordCheck = await bcrypt.compare(dto.password, user.password)
        if(!passwordCheck){}
        const token = await jwt.sign({
            id: user.id,
            isAdmin: user.isAdmin
        },jwtConfig.password,{
            expiresIn:jwtConfig.expiresIn
        })
        return token
    }

    async update(id:number, dto:UpdateUserDto):Promise<ReadUserDto>{
        return await this.userRepo.update(id, dto)
    }

    async find(id:number):Promise<ReadUserDto>{
        const result = await this.userRepo.find(id)
        return result
    }

    async delete(id:number):Promise<void>{
        return await this.userRepo.delete(id)
    }
}