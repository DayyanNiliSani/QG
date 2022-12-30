import { Game } from 'src/Domain/Entities/game';
import { GameCategory } from 'src/Domain/Entities/gameCategory';
import { GameQuestion } from 'src/Domain/Entities/gameQuestion';
import { EntitySchema } from 'typeorm';

export const GameSchema = new EntitySchema<Game>({
  name: 'Game',
  tableName: 'games',
  target: Game,
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    status: {
      type: Number,
      nullable: false,
      default: 0,
    },
    updated: {
      type: 'bigint',
      nullable: false,
      default: Date.now(),
      updateDate: true,
    },
  },
  relations: {
    user1: {
      type: 'many-to-one',
      target: 'User',
      nullable: false,
      eager: true,
    },
    user2: {
      type: 'many-to-one',
      target: 'User',
      nullable: true,
      eager: true,
    },
    categories: {
      type: 'one-to-many',
      target: 'GameCategory',
      nullable: true,
      eager: true,
      cascade: true,
      inverseSide: ((gameCategory: GameCategory) => gameCategory.game) as any, // TODO: nasty :((
    },
    questions: {
      type: 'one-to-many',
      target: 'GameQuestion',
      nullable: true,
      eager: true,
      cascade: true,
      inverseSide: ((gameQuestion: GameQuestion) => gameQuestion.game) as any, // TODO: nasty :((
    },
    suggestedCat1: {
      type: 'many-to-one',
      target: 'Category',
      nullable: true,
      eager: true,
    },
    suggestedCat2: {
      type: 'many-to-one',
      target: 'Category',
      nullable: true,
      eager: true,
    },
    suggestedCat3: {
      type: 'many-to-one',
      target: 'Category',
      nullable: true,
      eager: true,
    },
  },
});
