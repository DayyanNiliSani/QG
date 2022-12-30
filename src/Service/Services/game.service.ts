import { InjectQueue } from '@nestjs/bull';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Job, Queue } from 'bull';
import { TooManyGamesError } from 'src/Domain/Common/Exception/tooManyGames';
import { Game } from 'src/Domain/Entities/game';
import { User } from 'src/Domain/Entities/user';
import {
  ReadCategoryDto,
  mapModelToDto as mapCategoryModelToDto,
} from 'src/Infra/Repositories/Category/category.dto';
import { CategoryRepo } from 'src/Infra/Repositories/Category/category.repository';
import {
  mapModelToDto,
  ReadGameDto,
} from 'src/Infra/Repositories/Game/game.dto';
import { GameRepo } from 'src/Infra/Repositories/Game/game.repository';
import {
  ReadQuestionDto,
  mapModelToDto as mapQuestionModelToDto,
} from 'src/Infra/Repositories/Question/question.dto';
import { QuestionRepo } from 'src/Infra/Repositories/Question/question.repository';
import { RegisterAnswerDto } from '../Dto/registerAnswerDto';

@Injectable()
export class GameService {
  constructor(
    private categoryRepo: CategoryRepo,
    private gameRepo: GameRepo,
    private questionRepo: QuestionRepo,
    @InjectQueue('games') private gameQueue: Queue,
  ) {}

  public async startGame(userId: number): Promise<ReadGameDto> {
    if ((await this.gameRepo.findUserActiveGames(userId)) > 5)
      throw new TooManyGamesError();
    var game: Game;
    const gameJob = (await this.gameQueue.getNextJob()) as Job<Game>;
    if (!gameJob) {
      game = await this.gameRepo.create(userId);
      this.gameQueue.add(game);
    } else {
      game = this.parseGameFromQueueData(gameJob);
      if (!game.joinPlayer2(userId)) {
        this.gameQueue.add(game);
        game = await this.gameRepo.create(userId);
      } else {
        await this.gameRepo.saveChanges(game);
      }
    }
    return mapModelToDto(game);
  }

  public async getRandomCategories(
    userId: number,
    gameId: number,
  ): Promise<ReadCategoryDto[]> {
    const game = await this.gameRepo.findOne(gameId);
    if (!game) throw new NotFoundException();
    game.checkIsThisPlayerPartOfGame(userId);
    game.checkIsItTurnOfPlayer(userId);
    game.checkIsItTimeForCats();
    const categories = await this.categoryRepo.getRandomCats();
    game.setSuggestedCategories(categories);
    this.gameRepo.saveChanges(game);
    return categories.map((c) => mapCategoryModelToDto(c));
  }

  public async getRandomQuestionForSelectedCategory(
    userId: number,
    gameId: number,
    categoryId: number,
  ): Promise<ReadQuestionDto[]> {
    const game = await this.gameRepo.findOne(gameId);
    if (!game) throw new NotFoundException();
    game.checkIsThisPlayerPartOfGame(userId);
    game.checkIsItTurnOfPlayer(userId);
    game.checkIsItTimeForCreateQuestions();
    game.checkIsTheSelectedCategoryOneOfTheSuggestedOnes(categoryId);
    const questions = await this.questionRepo.getRandomQuestions(categoryId);
    game.addCategory(categoryId);
    game.addQuestion(questions);
    this.gameRepo.saveChanges(game);
    return questions.map((q) => mapQuestionModelToDto(q));
  }

  public async registerUserAnswers(
    userId: number,
    gameId: number,
    answers: RegisterAnswerDto[],
  ): Promise<ReadGameDto> {
    const game = await this.gameRepo.findOne(gameId);
    if (!game) throw new NotFoundException();
    game.checkIsThisPlayerPartOfGame(userId);
    game.checkIsItTurnOfPlayer(userId);
    game.checkIsItTimeForAnsweringQuestion();
    answers.forEach((a) => {
      game.setAnswer(userId, a.questionId, a.selectedAnswer);
    });
    game.updateStatus();
    this.gameRepo.saveChanges(game);
    return mapModelToDto(game);
  }

  public async getGame(userId: number, gameId: number): Promise<ReadGameDto> {
    const game = await this.gameRepo.findOne(gameId);
    if (!game) throw new NotFoundException();
    if (!game.isItThisPlayerTurn(userId) && game.questions.length > 0) {
      game.questions[game.questions.length - 1].question.correctAnswer = null;
      game.questions[game.questions.length - 2].question.correctAnswer = null;
      game.questions[game.questions.length - 3].question.correctAnswer = null;
    }
    return mapModelToDto(game);
  }

  public async getGames(userId: number): Promise<ReadGameDto[]> {
    const games = await this.gameRepo.findUserGames(userId);
    return games.map((game) => {
      if (!game.isItThisPlayerTurn(userId) && game.questions.length > 0) {
        game.questions[game.questions.length - 1].question.correctAnswer = null;
        game.questions[game.questions.length - 2].question.correctAnswer = null;
        game.questions[game.questions.length - 3].question.correctAnswer = null;
      }
      return mapModelToDto(game);
    });
  }

  private parseGameFromQueueData(job: Job<any>): Game {
    const game = new Game();
    game.user1 = new User();
    game.id = job.data.id;
    game.user1.id = job.data.user1.id;
    game.status = job.data.status;
    game.updated = job.data.update;
    return game;
  }
}