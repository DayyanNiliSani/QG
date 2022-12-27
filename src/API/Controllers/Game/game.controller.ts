import { Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ReadGameDto } from 'src/Infra/Repositories/Game/game.dto';
import { GameService } from 'src/Service/Services/game.service';

@Controller('/game/')
@ApiBearerAuth()
export class GameController {
  constructor(private gameService: GameService) {}

  @Post('/:id')
  async start(@Param("id") id:number):Promise<ReadGameDto> {
    return await this.gameService.startGame(id)
  }
}
