import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee';

@Injectable({ providedIn: 'root' })
export class EmployeeApi {
  url = 'http://localhost:3000/Employees';

  constructor(private $http: HttpClient) {}

  getAllEmployee(): Observable<any[]> {
    return this.$http.get(this.url) as Observable<any[]>;
  }
  getAllEmployeeById(id: string): Observable<any[]> {
    return this.$http.get(`${this.url}?id=${id}`) as Observable<any[]>;
  }
}
