import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee';

@Injectable({ providedIn: 'root' })
export class EmployeeApi {
  url = 'http://localhost:3000/employees';

  constructor(private $http: HttpClient) {}

  getAllEmployee(): Observable<any[]> {
    return this.$http.get(this.url) as Observable<any[]>;
  }

  getEmployeeById(id: string): Observable<any> {
    console.log('fetch url', `${this.url}/${id}`);
    return this.$http.get(`${this.url}/${id}`);
  }
}
