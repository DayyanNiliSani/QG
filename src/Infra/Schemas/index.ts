import { CategorySchema } from './category.schema';
import { GameSchema } from './game.schema';
import { GameCategoriesSchema } from './gameCategories.schema';
import { GameQuestionsSchema } from './gameQuestions.schema';
import { QuestionSchema } from './question.schema';
import { UserSchema } from './user.schema';

export const Schemas = [
  UserSchema,
  CategorySchema,
  QuestionSchema,
  GameQuestionsSchema,
  GameCategoriesSchema,
  GameSchema,
];
