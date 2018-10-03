import { UserApi } from './user.api';
import { cold } from 'jasmine-marbles';
import { HttpClient } from '@angular/common/http';

describe('UserApi', () => {
  let userApi: UserApi;
  let $http: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    $http = jasmine.createSpyObj('$http', ['get', 'put', 'post']);
    userApi = new UserApi($http);
  });

  it('userApi is defined', () => {
    expect(userApi).toBeDefined();
  });

  it('can return all users', () => {
    const usersData = [
      {
        title: 'mr',
        first: 'thomas',
        last: 'lopez',
        email: 'thomas.lopez@example.com'
      }
    ];
    const expectedUsers = cold('--a|', { a: usersData });
    $http.get.and.returnValue(expectedUsers);
    const result = userApi.getAllUsers();

    expect(result).toBeObservable(expectedUsers);
    expect($http.get).toHaveBeenCalledWith('http://localhost:3000/users');
  });
});
