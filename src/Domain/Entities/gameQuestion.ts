import { Game } from './game';
import { Question } from './question';

export class GameQuestion {
  id: number;
  game: Game;
  question: Question;
  user1Answer: number | undefined;
  user2Answer: number | undefined;
}
