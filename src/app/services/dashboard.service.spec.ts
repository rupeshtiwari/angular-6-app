import { DashboardService } from './dashboard.service';
import { cold } from 'jasmine-marbles';

fdescribe('Dashboard Service', () => {
  let employeeApi;
  let addressApi;
  let service;
  beforeEach(() => {
    employeeApi = jasmine.createSpyObj('employeeApi', ['getEmployeeById']);
    addressApi = jasmine.createSpyObj('addressApi', ['getAddressById']);
    service = new DashboardService(employeeApi, addressApi);
  });
  it('can get employee', () => {
    const employee = {
      gender: 'male',
      name: { title: 'mr', first: 'ruben', last: 'martinez' },
      email: 'ruben.martinez@example.com',
      dob: { date: '1985-05-15T14:49:33Z', age: 33 },
      phone: '904-222-343',
      cell: '677-757-448',
      id: 2,
      picture: 'https://randomuser.me/api/portraits/men/16.jpg'
    };
    const location = {
      id: 2,
      street: 'dovresvingen 3930',
      city: 'skarde',
      state: 'finnmark - finnmárku',
      postcode: '0060'
    };
    const expectedEmployee = {
      gender: 'male',
      name: { title: 'mr', first: 'ruben', last: 'martinez' },
      email: 'ruben.martinez@example.com',
      dob: { date: '1985-05-15T14:49:33Z', age: 33 },
      phone: '904-222-343',
      cell: '677-757-448',
      id: 2,
      picture: 'https://randomuser.me/api/portraits/men/16.jpg',
      street: 'dovresvingen 3930',
      city: 'skarde',
      state: 'finnmark - finnmárku',
      postcode: '0060'
    };
    const expected = cold('--e', { e: expectedEmployee });
    employeeApi.getEmployeeById.and.returnValue(cold('--a|', { a: employee }));
    addressApi.getAddressById.and.returnValue(cold('--b|', { b: location }));

    const result = service.searchEmployeeById(2);

    expect(result).toBeObservable(expected);
  });
});
