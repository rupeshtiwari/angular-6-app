import { Injectable } from '@angular/core';
import { merge, map } from 'rxjs/operators';

import { UserApi } from '../api/user.api';
import { AddressApi } from '../api/address.api';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  constructor(
    private employeeApi: UserApi,
    private addressApi: AddressApi
  ) {}

  searchEmployeeById(id) {
    return this.employeeApi.getUserByID(id).pipe(
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
