import { Injectable } from '@angular/core';
import { merge, map } from 'rxjs/operators';

import { EmployeeApi } from '../api/employee.api';
import { AddressApi } from '../api/address.api';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  constructor(
    private employeeApi: EmployeeApi,
    private addressApi: AddressApi
  ) {}

  searchEmployeeById(id) {
    return this.employeeApi.getEmployeeById(id).pipe(
      merge(this.addressApi.getAddressById(id)),
      map(([info, addressInfo]) => {
        return {
          ...info,
          ...addressInfo
        };
      })
    );
  }
}
