import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { UserApi } from '../api/user.api';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { cold, hot, getTestScheduler } from 'jasmine-marbles';
import { of } from 'rxjs';

xdescribe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let employeeApiSpy: jasmine.SpyObj<UserApi>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports: [FormsModule, HttpClientModule],
      providers: [
        {
          provide: UserApi,
          useValue: jasmine.createSpyObj('employeeApi', ['getAllEmployee'])
        }
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    employeeApiSpy = TestBed.get(UserApi);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get employee', () => {
    const expected = [
      {
        gender: 'male',
        name: { title: 'mr', first: 'ruben', last: 'martinez' },

        email: 'ruben.martinez@example.com',
        login: {
          uuid: 'e877c944-a902-419f-b7f5-fc7216333576',
          username: 'yellowfrog999',
          password: 'idunno',
          salt: 'PMckfL7o',
          md5: '94cf6732a24095379af07cc0e9e8154c',
          sha1: 'd297f7ed590290f3b658a6b16a2b6d1b257674c8',
          sha256:
            '62bf561295d257ab1f36c68045d352863d535ac8b4c52c59778d3ba7fda231db'
        },
        dob: { date: '1985-05-15T14:49:33Z', age: 33 },
        registered: { date: '2009-09-26T01:27:51Z', age: 8 },
        phone: '904-222-343',
        cell: '677-757-448',
        id: 1,
        picture: {
          large: 'https://randomuser.me/api/portraits/men/16.jpg',
          medium: 'https://randomuser.me/api/portraits/med/men/16.jpg',
          thumbnail: 'https://randomuser.me/api/portraits/thumb/men/16.jpg'
        },
        nat: 'ES'
      }
    ];
    const employees = cold('---a|', { a: expected });
    employeeApiSpy.getAllUsers.and.returnValue(employees);
    fixture.detectChanges();
    component.ngOnInit();
    expect(component.users$).toEqual([], 'no employees');
    getTestScheduler().flush(); // flush the observables
    fixture.detectChanges(); // update view
    expect(component.users$).toEqual(expected, 'employees');
  });
});
