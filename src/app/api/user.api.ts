import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserApi {
  url = 'http://localhost:3000/users';

  constructor(private $http: HttpClient) {}

  getAllUsers(): Observable<any[]> {
    return this.$http.get(this.url) as Observable<any[]>;
  }

  getUserByID(id: string): Observable<any> {
    console.log('fetch url', `${this.url}/${id}`);
    return this.$http.get(`${this.url}/${id}`);
  }

  saveUser(user: any) {
    if (user.id) {
      return this.$http.put(`${this.url}/${user.id}`, user);
    } else {
      user.id = new Date().getTime().toString(36);
      return this.$http.post(`${this.url}`, user);
    }
  }
}
