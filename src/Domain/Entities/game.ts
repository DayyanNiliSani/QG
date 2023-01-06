import { InvalidActionForThisTurn } from '../Common/Exception/invalidActionForThisTurn';
import { InvalidCategory } from '../Common/Exception/invalidCategory';
import { InvalidPlayerId } from '../Common/Exception/InvalidPlayerId';
import { InvalidTurnError } from '../Common/Exception/invalidTurn';
import { Category } from './category';
import { GameCategory } from './gameCategory';
import { GameQuestion } from './gameQuestion';
import { Question } from './question';
import { User } from './user';

export class Game {
  id: number;
  user1: User;
  user2: User | undefined;
  updated: number;
  status: GameStatus;
  suggestedCat1: Category | undefined;
  suggestedCat2: Category | undefined;
  suggestedCat3: Category | undefined;
  categories: GameCategory[];
  questions: GameQuestion[];

  joinPlayer2(user2Id: number, user2Username: string): boolean {
    if (this.user1.id == user2Id) return false;
    this.user2 = new User();
    this.user2.id = user2Id;
    this.user2.username = user2Username;
    return true;
  }

  getOtherUserId(userId: number): number {
    if (this.user1.id == userId) return this.user2.id;
    return this.user1.id;
  }

  setSuggestedCategories(cats: Category[]) {
    this.suggestedCat1 = cats[0];
    this.suggestedCat2 = cats[1];
    this.suggestedCat3 = cats[2];
    this.status += 1;
  }

  isItThisPlayerTurn(userId): boolean {
    let player1Turn = true;
    if (
      this.status == GameStatus.User1AnsweredQues1 ||
      this.status == GameStatus.User2AnsweredQues1 ||
      this.status == GameStatus.Cat2Selected ||
      this.status == GameStatus.Questions2Added ||
      this.status == GameStatus.User1AnsweredQues3 ||
      this.status == GameStatus.User2AnsweredQues3 ||
      this.status == GameStatus.Cat4Selected ||
      this.status == GameStatus.Questions4Added
    )
      player1Turn = false;
    return player1Turn && userId == this.user1.id;
  }

  checkIsThisPlayerPartOfGame(userId: number) {
    if (this.user1.id == userId || (this.user2 && this.user2.id == userId)) return;
    throw new InvalidPlayerId();
  }

  checkIsItTurnOfPlayer(userId: number) {
    let player1Turn = true;
    if (
      this.status == GameStatus.User1AnsweredQues1 ||
      this.status == GameStatus.User2AnsweredQues1 ||
      this.status == GameStatus.Cat2Selected ||
      this.status == GameStatus.Questions2Added ||
      this.status == GameStatus.User1AnsweredQues3 ||
      this.status == GameStatus.User2AnsweredQues3 ||
      this.status == GameStatus.Cat4Selected ||
      this.status == GameStatus.Questions4Added
    )
      player1Turn = false;
    if (player1Turn && userId == this.user1.id) return;
    throw new InvalidTurnError();
  }

  checkIsItTimeForGettingQuestions() {
    if (
      this.status == GameStatus.User1AnsweredQues1 ||
      this.status == GameStatus.User2AnsweredQues2 ||
      this.status == GameStatus.User1AnsweredQues3 ||
      this.status == GameStatus.User2AnsweredQues4
    )
      return;
    throw new InvalidActionForThisTurn();
  }

  checkIsItTimeForAnsweringQuestion() {
    if (
      this.status == GameStatus.Questions1Added ||
      this.status == GameStatus.Questions2Added ||
      this.status == GameStatus.Questions3Added ||
      this.status == GameStatus.Questions4Added
    )
      return;

    throw new InvalidActionForThisTurn();
  }

  checkIsItTimeForCats() {
    if (
      this.status == GameStatus.Started ||
      this.status == GameStatus.User2AnsweredQues1 ||
      this.status == GameStatus.User1AnsweredQues2 ||
      this.status == GameStatus.User2AnsweredQues3
    )
      return;
    throw new InvalidActionForThisTurn();
  }

  checkIsItTimeForCreateQuestions() {
    if (
      this.status == GameStatus.Cat1Selected ||
      this.status == GameStatus.Cat2Selected ||
      this.status == GameStatus.Cat3Selected ||
      this.status == GameStatus.Cat4Selected
    )
      return;
    throw new InvalidActionForThisTurn();
  }

  checkIsTheSelectedCategoryOneOfTheSuggestedOnes(categoryId: number) {
    if (
      this.suggestedCat1.id == categoryId ||
      this.suggestedCat2.id == categoryId ||
      this.suggestedCat3.id == categoryId
    )
      return;
    throw new InvalidCategory();
  }

  setAnswer(userId: number, questionId: number, answer: number) {
    if (Date.now() - this.updated > 90000) answer = null;
    const question = this.questions.find((q) => q.question.id == questionId);
    if (!question) return;
    if (userId == this.user1.id) question.user1Answer = answer;
    else question.user2Answer = answer;
  }

  addQuestion(questions: Question[]) {
    questions.forEach((q) => {
      const gameQuestion = new GameQuestion();
      gameQuestion.game = this;
      gameQuestion.question = q;
      this.questions.push(gameQuestion);
    });
    this.status += 1;
  }

  addCategory(categoryId: number) {
    const newCategory = new GameCategory();
    newCategory.category = new Category();
    newCategory.category.id = categoryId;
    newCategory.game = this;
    this.categories.push(newCategory);
  }

  updateStatus() {
    this.status += 1;
  }
}

export enum GameStatus {
  Started,
  Cat1Selected,
  Questions1Added,
  User1AnsweredQues1,
  User2AnsweredQues1,
  Cat2Selected,
  Questions2Added,
  User2AnsweredQues2,
  User1AnsweredQues2,
  Cat3Selected,
  Questions3Added,
  User1AnsweredQues3,
  User2AnsweredQues3,
  Cat4Selected,
  Questions4Added,
  User2AnsweredQues4,
  User1AnsweredQues4,
  Ended,
}
