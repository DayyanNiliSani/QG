import { InjectQueue } from "@nestjs/bull";
import { Injectable } from "@nestjs/common";
import { Job, Queue } from "bull";
import { SamePlayerError } from "src/Domain/Common/Exception/samePlayer";
import { TooManyGamesError } from "src/Domain/Common/Exception/tooManyGames";
import { Game } from "src/Domain/Entities/game";
import { User } from "src/Domain/Entities/user";
import { CategoryRepo } from "src/Infra/Repositories/Category/category.repository";
import { mapModelToDto, ReadGameDto } from "src/Infra/Repositories/Game/game.dto";
import { GameRepo } from "src/Infra/Repositories/Game/game.repository";
import { QuestionRepo } from "src/Infra/Repositories/Question/question.repository";

@Injectable()
export class GameService{
    constructor(private categoryRepo:CategoryRepo, private gameRepo: GameRepo,
                private questionRepo:QuestionRepo, @InjectQueue('games') private gameQueue:Queue
                ){}


    public async startGame(userId:number):Promise<ReadGameDto>{
        if(await this.gameRepo.findUserActiveGames(userId) > 5) 
            throw new TooManyGamesError() 
        var game:Game
        const gameJob = await this.gameQueue.getNextJob() as Job<Game>
        if(!gameJob){
            game = await this.gameRepo.create(userId)
            this.gameQueue.add(game)
        }else{
            game = this.parseGameFromQueueData(gameJob)
            if(!game.joinPlayer2(userId)){
                this.gameQueue.add(game)
                game = await this.gameRepo.create(userId)
            }else{
                await this.gameRepo.saveChanges(game)
            }
        }

        return mapModelToDto(game)
    }

    private parseGameFromQueueData(job:Job<any>):Game{
        const game = new Game()
        game.user1 = new User()
        game.id = job.data.id
        game.user1.id = job.data.user1.id
        game.status = job.data.status
        game.updated = job.data.update
        return game
    }
}
