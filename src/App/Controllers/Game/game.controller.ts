import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ListOfRegisterAnswersRequest } from 'src/App/Dto/Requests/registerAnswerList.request';
import { UserInfoDto } from 'src/App/Dto/userInfo.dto';
import { UserInfo } from 'src/App/Middlewares/decorators/userInfo.decorator';
import { ReadCategoryDto } from 'src/Infra/Repositories/Category/category.dto';
import { ReadGameDto } from 'src/Infra/Repositories/Game/game.dto';
import { ReadQuestionDto } from 'src/Infra/Repositories/Question/question.dto';
import { GameService } from 'src/Service/Services/game.service';

@Controller('/game/')
@ApiBearerAuth()
export class GameController {
  constructor(private gameService: GameService) {}

  @Post('/:id')
  async start(@Param('id') id: number): Promise<ReadGameDto> {
    return await this.gameService.startGame(id);
  }

  @Get('/:gameId/categories')
  async getCategories(
    @Param('gameId') gameId: number,
    @UserInfo() userInfo: UserInfoDto,
  ): Promise<ReadCategoryDto[]> {
    return await this.gameService.getRandomCategories(userInfo.id, gameId);
  }

  @Get('/:gameId/:categoryId/questions')
  async getQuestionsOfSelectedCategory(
    @Param('gameId') gameId: number,
    @Param('categoryId') categoryId: number,
    @UserInfo() userInfo: UserInfoDto,
  ): Promise<ReadQuestionDto[]> {
    return await this.gameService.getRandomQuestionForSelectedCategory(
      userInfo.id,
      gameId,
      categoryId,
    );
  }

  @Post('/:gameId/answers')
  async registerAnswers(
    @Param('gameId') gameId: number,
    @UserInfo() userInfo: UserInfoDto,
    @Body() body: ListOfRegisterAnswersRequest,
  ): Promise<ReadGameDto> {
    return await this.gameService.registerUserAnswers(
      userInfo.id,
      gameId,
      body.answers,
    );
  }

  @Get('/:gameId/')
  async getGame(
    @Param('gameId') gameId: number,
    @UserInfo() userInfo: UserInfoDto,
  ): Promise<ReadGameDto> {
    return await this.gameService.getGame(userInfo.id, gameId);
  }

  @Get("/")
  async getGames(
    @UserInfo() userInfo:UserInfoDto
  ){
    return await this.gameService.getGames(userInfo.id)
  }
}
