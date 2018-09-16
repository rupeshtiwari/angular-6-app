import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee';
import { EmployeeApi } from '../api/employee.api';
import { AddressApi } from '../api/address.api';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  constructor(
    private employeeApi: EmployeeApi,
    private addressApi: AddressApi
  ) {}

  getDashboardItem() {}
}
