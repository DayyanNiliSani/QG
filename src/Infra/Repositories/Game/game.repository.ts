import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Game, GameStatus } from "src/Domain/Entities/game";
import { Repository, Not } from "typeorm";

@Injectable()
export class GameRepo{
    constructor(@InjectRepository(Game) private repo:Repository<Game>){}

    public async create(user1:number):Promise<Game>{
        const model = await this.repo.save({
            status:GameStatus.Started,
            updated: Date.now(),
            user1: {
                id: user1
            }
        })

        return model
    }

    public async findOne(id:number):Promise<Game>{
        return await this.repo.findOneBy({id})
    }

    public async findUserActiveGames(userId:number):Promise<number>{
        return await this.repo.count({
            where:[
                {
                    user1:{
                        id:userId
                    },
                    status: Not(GameStatus.Ended)
                },
                {
                    user2:{
                        id:userId,
                    },
                    status: Not(GameStatus.Ended)
                }
            ]
        })
    }

    public async saveChanges(game: Game):Promise<Game>{
        return await this.repo.save(game)
    }
    
}
