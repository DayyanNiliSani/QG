import { Question } from 'src/Domain/Entities/question';
import { User } from 'src/Domain/Entities/user';

describe('Question Entity', () => {
  let user: User;
  let question: Question;

  beforeEach(() => {
    user = new User();
    user.id = 1;
    user.username = 'dayan';

    question = new Question();
    question.author = user;
  });

  test('Valid author checking', () => {
    expect(question.isAuthor(1)).toBe(true);
  });

  test('invalid author checking', () => {
    expect(question.isAuthor(2)).toBe(false);
  });

  test('Confirm', () => {
    question.confirm();
    expect(question.isConfirmed).toBe(true);
  });
});
