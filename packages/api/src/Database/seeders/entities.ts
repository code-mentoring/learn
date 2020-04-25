import faker from 'faker';

import { UserService } from '../../User/User.service';

export const seedUsers = async (userService: UserService) => Promise.all(Array(5).fill(undefined).map(async (_, i) => {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();

  const user = await userService.create({
    firstName,
    lastName,
    email: `user${i}@test.com`,
    password: `user${i}123`
  });
  return user;
}));

// seed paths, lessons...
