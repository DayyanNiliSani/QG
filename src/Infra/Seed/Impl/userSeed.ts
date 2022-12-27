import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/Domain/Entities/user";
import { UserService } from "src/Service/Services/user.service";
import { Repository } from "typeorm";
import { Seed } from "../seed.abstract";

@Injectable()
export class UserSeed extends Seed{
    constructor(@InjectRepository(User) private userRepo:Repository<User>, private userService:UserService){
        super()
    }

    override async seed(){
        const checkIfAnythingExists = (await this.userRepo.count()) != 0
        if(checkIfAnythingExists){
          Logger.warn("couldn't seed the user")
          return  
        } 
        const admin = await this.userService.create({
            email:'admin@gmail.com',
            password:'admin',
            username:'admin',
        })
        admin.isAdmin = true
        await this.userRepo.save(admin)

        await this.userService.create({
            email:'dayannilisani@gmail.com',
            password:'dayan',
            username:'dayan'
        })

        await this.userService.create({
            email:'mahdikohestani@gmail.com',
            password:'mahdi',
            username:'mahdi'
        })

        await this.userService.create({
            email:'shahrzadsafaei@gmail.com',
            password:'shahrzad',
            username:'shahrzad'
        })

        Logger.log("User seed completed")
    }
}