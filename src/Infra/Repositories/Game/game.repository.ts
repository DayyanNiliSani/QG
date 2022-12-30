import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Game, GameStatus } from 'src/Domain/Entities/game';
import { Repository, Not } from 'typeorm';

@Injectable()
export class GameRepo {
  constructor(@InjectRepository(Game) private repo: Repository<Game>) {}

  public async create(user1: number): Promise<Game> {
    const model = await this.repo.save({
      status: GameStatus.Started,
      updated: Date.now(),
      user1: {
        id: user1,
      },
    });

    return model;
  }

  public async findOne(id: number): Promise<Game> {
    const result = await this.repo.find({
      where: {
        id,
      },
    });
    if (result.length == 0) return null;
    return result[0];
  }
  public async findUserGames(userId: number): Promise<Game[]> {
    return await this.repo.find({
      where: [
        {
          user1: {
            id: userId,
          },
          status: Not(GameStatus.Ended),
        },
        {
          user2: {
            id: userId,
          },
        },
      ],
    });
  }
  public async findUserActiveGames(userId: number): Promise<number> {
    return await this.repo.count({
      where: [
        {
          user1: {
            id: userId,
          },
          status: Not(GameStatus.Ended),
        },
        {
          user2: {
            id: userId,
          },
          status: Not(GameStatus.Ended),
        },
      ],
    });
  }

  public async saveChanges(game: Game): Promise<Game> {
    game.updated = Date.now();
    return await this.repo.save(game);
  }
}
