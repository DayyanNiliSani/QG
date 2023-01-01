import { Category } from 'src/Domain/Entities/category';
import { BaseError } from 'src/Domain/Common/Exception/baseError';
import { Game } from 'src/Domain/Entities/game';
import { User } from 'src/Domain/Entities/user';

describe('GameEntity', () => {
  let user1: User;
  let user2: User;
  let game: Game;

  beforeEach(() => {
    {
      user1 = new User();
      user1.id = 1;
      user1.email = 'dayannilisani@gmail.com';
      user1.username = 'dayan';

      user2 = new User();
      user2.id = 2;
      user2.email = 'mahdikohestani@gmail.com';
      user2.username = 'mahdi';

      game = new Game();
    }
  });

  test('New user joining', () => {
    game.user1 = user1;
    expect(game.joinPlayer2(user2.id, user2.username)).toBe(true);
  });

  test('Same user joining', () => {
    game.user1 = user1;
    expect(game.joinPlayer2(user1.id, user1.username)).toBe(false);
  });

  test('Valid player in this game', () => {
    game.user1 = user1;
    game.user2 = user2;
    expect(game.checkIsThisPlayerPartOfGame(1)).toBeUndefined();
    expect(game.checkIsThisPlayerPartOfGame(2)).toBeUndefined();
  });

  test('Invalid player in this game', () => {
    game.user1 = user1;
    game.user2 = user2;
    expect(() => game.checkIsThisPlayerPartOfGame(3)).toThrowError(BaseError);
  });

  test('Turn of Player1', () => {
    game.user1 = user1;
    game.user2 = user2;
    expect(game.checkIsItTurnOfPlayer(user1.id)).toBeUndefined();
  });

  test('Turn of Player2', () => {
    game.user1 = user1;
    game.user2 = user2;
    expect(() => game.checkIsItTurnOfPlayer(user2.id)).toThrowError();
  });

  test('Category Selection', () => {
    game.suggestedCat1 = new Category();
    game.suggestedCat1.id = 1;
    game.suggestedCat1.title = 'music';

    game.suggestedCat2 = new Category();
    game.suggestedCat2.id = 2;
    game.suggestedCat2.title = 'history';

    game.suggestedCat3 = new Category();
    game.suggestedCat3.id = 3;
    game.suggestedCat3.title = 'music';

    expect(
      game.checkIsTheSelectedCategoryOneOfTheSuggestedOnes(2),
    ).toBeUndefined();

    expect(
      game.checkIsTheSelectedCategoryOneOfTheSuggestedOnes(1),
    ).toBeUndefined();

    expect(
      game.checkIsTheSelectedCategoryOneOfTheSuggestedOnes(3),
    ).toBeUndefined();
  });

  test('Category Invalid Selection', () => {
    game.suggestedCat1 = new Category();
    game.suggestedCat1.id = 1;
    game.suggestedCat1.title = 'music';

    game.suggestedCat2 = new Category();
    game.suggestedCat2.id = 2;
    game.suggestedCat2.title = 'history';

    game.suggestedCat3 = new Category();
    game.suggestedCat3.id = 3;
    game.suggestedCat3.title = 'music';

    expect(() =>
      game.checkIsTheSelectedCategoryOneOfTheSuggestedOnes(4),
    ).toThrowError(BaseError);

    expect(() =>
      game.checkIsTheSelectedCategoryOneOfTheSuggestedOnes(0),
    ).toThrowError(BaseError);

    expect(() =>
      game.checkIsTheSelectedCategoryOneOfTheSuggestedOnes(-1),
    ).toThrowError(BaseError);
  });
});
