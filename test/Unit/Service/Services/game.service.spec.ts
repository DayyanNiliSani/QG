import { ClientsModule, Transport } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TooManyGamesError } from 'src/Domain/Common/Exception/tooManyGames';
import { RabbitMQClient } from 'src/Infra/BrokerClient/rabbitMQ.client';
import { RedLockInstance } from 'src/Infra/Lock/redLock';
import { CategoryRepo } from 'src/Infra/Repositories/Category/category.repository';
import { GameRepo } from 'src/Infra/Repositories/Game/game.repository';
import { QuestionRepo } from 'src/Infra/Repositories/Question/question.repository';
import { Schemas } from 'src/Infra/Schemas';
import { GameService } from 'src/Service/Services/game.service';
import * as config from 'config';
import { BullModule, getQueueToken } from '@nestjs/bull';
import { Queue, Job, JobOptions } from 'bull';
import { Game, GameStatus } from 'src/Domain/Entities/game';
import { User } from 'src/Domain/Entities/user';

const dbConfig = config.get('db');
const redisConfig = config.get('redis');

describe('GameService', () => {
  let moduleRef: TestingModule;
  let gameService: GameService;
  let gameRepo: GameRepo;
  let categoryRepo: CategoryRepo;
  let questionRepo: QuestionRepo;
  let rabbitMQClient: RabbitMQClient;
  let redLockInstance: RedLockInstance;
  let gameQueue: Queue;
  let gameUpdatedTime: number;
  let game: Game;
  let user1: User;
  beforeEach(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [
        ClientsModule.register([
          {
            name: 'GameNotifier',
            transport: Transport.RMQ,
            options: {
              urls: ['amqp://localhost:5672'],
              queue: 'notify_games_turn',
              queueOptions: {
                durable: true,
              },
            },
          },
        ]),
        TypeOrmModule.forRoot({
          ...(dbConfig as any),
          synchronize: true,
          autoLoadEntities: true,
        }),
        TypeOrmModule.forFeature(Schemas),
        BullModule.forRoot({
          redis: redisConfig,
        }),
        BullModule.registerQueue({
          name: 'games',
        }),
      ],
      providers: [GameRepo, CategoryRepo, QuestionRepo, RabbitMQClient, RedLockInstance, GameService],
    }).compile();

    gameQueue = moduleRef.get(getQueueToken('games'));
    gameRepo = moduleRef.get<GameRepo>(GameRepo);
    categoryRepo = moduleRef.get<CategoryRepo>(CategoryRepo);
    questionRepo = moduleRef.get<QuestionRepo>(QuestionRepo);
    rabbitMQClient = moduleRef.get<RabbitMQClient>(RabbitMQClient);
    redLockInstance = moduleRef.get<RedLockInstance>(RedLockInstance);
    gameService = moduleRef.get<GameService>(GameService);
    gameUpdatedTime = Date.now();
    game = new Game();
    user1 = new User();
    user1.id = 1;
    user1.username = 'shahrzad';
    game.user1 = user1;
    game.id = 1;
    game.status = GameStatus.Started;
    game.updated = gameUpdatedTime;
  });

  afterEach(async () => {
    await gameQueue.empty();
  });

  afterAll(async () => {
    await moduleRef.close();
  });

  it('StartGame with more than 5 games', async () => {
    jest.spyOn(gameRepo, 'findUserActiveGames').mockImplementationOnce(async (id: number) => 8);
    expect(async () => await gameService.startGame(1, 'shahrzad')).rejects.toThrow(TooManyGamesError);
  });

  it('StartGame with empty Queue', async () => {
    jest.spyOn(gameRepo, 'findUserActiveGames').mockImplementationOnce(async (id: number) => 3);
    jest.spyOn(gameQueue, 'getNextJob').mockImplementationOnce(async () => undefined);
    jest.spyOn(gameRepo, 'create').mockImplementationOnce(async (_: number, __: string) => {
      return game;
    });
    const result = await gameService.startGame(1, 'shahrzad');
    expect(gameRepo.create).toBeCalledTimes(1);
    expect(result).toEqual({
      id: 1,
      status: 0,
      updated: gameUpdatedTime,
      user1: {
        id: 1,
        username: 'shahrzad',
      },
    });
  });

  it('StartGame with one game of same player in queue', async () => {
    jest.spyOn(gameRepo, 'findUserActiveGames').mockImplementationOnce(async (id: number) => 3);
    jest.spyOn(gameQueue, 'getNextJob').mockImplementationOnce(async () => {
      return {
        data: game,
      } as Job;
    });
    jest.spyOn(gameQueue, 'add').mockImplementationOnce(async (data: any, option?: JobOptions) => {
      return {
        data,
      } as Job;
    });
    await gameService.startGame(1, 'shahrzad');
    expect(gameQueue.add).toBeCalledTimes(1);
  });

  it('StartGame with one game of different player in queue', async () => {
    jest.spyOn(gameRepo, 'findUserActiveGames').mockImplementationOnce(async (id: number) => 3);
    jest.spyOn(gameQueue, 'getNextJob').mockImplementationOnce(async () => {
      return {
        data: game,
      } as Job;
    });
    jest.spyOn(gameQueue, 'add').mockImplementationOnce(async (data: any, option?: JobOptions) => {
      return {
        data,
      } as Job;
    });
    jest.spyOn(gameQueue, 'count').mockImplementationOnce(async () => 1);
    jest.spyOn(gameRepo, 'create').mockImplementationOnce(async (_: number, __: string) => {
      return game;
    });
    await gameService.startGame(2, 'dayan');
    expect(gameRepo.create).toBeCalledTimes(0);
  });
});
