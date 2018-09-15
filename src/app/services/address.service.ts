import { Injectable } from '../../../node_modules/@angular/core';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { Observable } from '../../../node_modules/rxjs';
import { Employee } from '../models/employee';

@Injectable({ providedIn: 'root' })
export class AddressService {
  url = 'http://localhost:3000/locations';

  constructor(private $http: HttpClient) {}

  getAllAddress(): Observable<any[]> {
    return this.$http.get(this.url) as Observable<any[]>;
  }

  getAddressById(id: number) {
    return this.$http.get(`${this.url}?id=${id}`) as Observable<any[]>;
  }
}
