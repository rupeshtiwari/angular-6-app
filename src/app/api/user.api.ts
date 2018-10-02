import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class UserApi {
  url = 'http://localhost:3000/users';

  constructor(private $http: HttpClient) {}

  getAllUsers() {
    return this.$http.get<User[]>(this.url);
  }

  getUserByID(id: string) {
    console.log('fetch url', `${this.url}/${id}`);
    return this.$http.get(`${this.url}/${id}`);
  }

  saveUser(user: User) {
    if (user.id) {
      return this.$http.put(`${this.url}/${user.id}`, user);
    } else {
      user.id = new Date().getTime().toString(36);
      return this.$http.post(`${this.url}`, user);
    }
  }

  searchUser(name: string) {
    console.log('searching user url', `${this.url}?first_like=${name}`);
    return this.$http.get<User[]>(`${this.url}?first_like=${name}`);
  }
}
