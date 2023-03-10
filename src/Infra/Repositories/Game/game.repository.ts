import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Game, GameStatus } from 'src/Domain/Entities/game';
import { Repository, Not, LessThan } from 'typeorm';

@Injectable()
export class GameRepo {
  constructor(@InjectRepository(Game) private repo: Repository<Game>) {}

  public async create(user1: number, user1Username: string): Promise<Game> {
    const model = await this.repo.save({
      status: GameStatus.Started,
      updated: Date.now(),
      user1: {
        id: user1,
        username: user1Username,
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
          updated: LessThan(Date.now() - 1000 * 60 * 60 * 24),
        },
        {
          user2: {
            id: userId,
          },
          status: Not(GameStatus.Ended),
          updated: LessThan(Date.now() - 1000 * 60 * 60 * 24),
        },
      ],
    });
  }
  
  public async saveChanges(game: Game): Promise<Game> {
    game.updated = Date.now();
    return await this.repo.save(game);
  }
}
