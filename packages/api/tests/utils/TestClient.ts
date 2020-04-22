import axios from 'axios';
import { UserInput } from '../../types';

import mutationCreateUser from './mutations/createUser.gql';


export abstract class TestClient {
  static url = 'http://localhost:4000/graphql';

  static createUser(user: UserInput) {
    return axios.post(this.url, {
      query: mutationCreateUser,
      variables: { user }
    });
  }
}
