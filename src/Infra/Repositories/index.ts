import { CategoryRepo } from "./Category/category.repository";
import { GameRepo } from "./Game/game.repository";
import { QuestionRepo } from "./Question/question.repository";
import { UserRepo } from "./User/user.repository";

export const Repos = [UserRepo, CategoryRepo, QuestionRepo, GameRepo]