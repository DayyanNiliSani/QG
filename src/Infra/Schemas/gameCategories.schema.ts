import { GameCategory } from 'src/Domain/Entities/gameCategory';
import { EntitySchema } from 'typeorm';

export const GameCategoriesSchema = new EntitySchema<GameCategory>({
  name: 'GameCategory',
  tableName: 'gameCategories',
  target: GameCategory,
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
  },
  relations: {
    game: {
      type: 'many-to-one',
      target: 'Game',
    },
    category: {
      type: 'many-to-one',
      target: 'Category',
      eager: true,
    },
  },
});
