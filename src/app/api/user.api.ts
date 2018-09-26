import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee';

@Injectable({ providedIn: 'root' })
export class UserApi {
  url = 'http://localhost:3000/employees';

  constructor(private $http: HttpClient) {}

  getAllUsers(): Observable<any[]> {
    return this.$http.get(this.url) as Observable<any[]>;
  }

  getUserByID(id: string): Observable<any> {
    console.log('fetch url', `${this.url}/${id}`);
    return this.$http.get(`${this.url}/${id}`);
  }

  saveUser(user: any) {
    this.$http.post(this.url, user);
  }
}
