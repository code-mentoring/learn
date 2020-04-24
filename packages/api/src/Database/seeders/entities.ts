import faker from 'faker';

import { UserService } from '../../User/User.service';

export const seedUsers = async (userService: UserService) => userService.create({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: 'test@test.com',
  password: 'test123'
});

// seed paths, lessons...
