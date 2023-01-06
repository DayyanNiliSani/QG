import { User } from 'src/Domain/Entities/user';
import { mapModelToDto } from 'src/Infra/Repositories/User/user.dto';

describe('UserDto', () => {
  let user: User;
  beforeEach(() => {
    user = new User();
    user.id = 1;
    user.email = 'dayan@gmail.com';
    user.isAdmin = false;
    user.username = 'dayan';
    user.password = 'someHashedVersionOfPassword';
  });

  test(`Shouldn't return hash password`, () => {
    const dto = mapModelToDto(user);
    expect(dto).toStrictEqual({
      id: 1,
      email: 'dayan@gmail.com',
      isAdmin: false,
      username: 'dayan',
    });
  });
});
