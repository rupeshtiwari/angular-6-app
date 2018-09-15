import { Injectable } from '../../../node_modules/@angular/core';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { Observable } from '../../../node_modules/rxjs';
import { Employee } from '../models/employee';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  url = 'http://localhost:3000/Employees';

  constructor(private $http: HttpClient) {}

  getAllEmployee(): Observable<any[]> {
    return this.$http.get(this.url) as Observable<any[]>;
  }
}
