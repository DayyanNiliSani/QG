import { GameQuestion } from 'src/Domain/Entities/gameQuestion';
import { EntitySchema } from 'typeorm';

export const GameQuestionsSchema = new EntitySchema<GameQuestion>({
  name: 'GameQuestion',
  tableName: 'gameQuestions',
  target: GameQuestion,
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    user1Answer: {
      type: Number,
      nullable: true,
    },
    user2Answer: {
      type: Number,
      nullable: true,
    },
  },
  relations: {
    game: {
      type: 'many-to-one',
      target: 'Game',
    },
    question: {
      type: 'many-to-one',
      target: 'Question',
      eager: true,
    },
  },
});
