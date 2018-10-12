import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { UserApi } from '../api/user.api';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { cold, hot, getTestScheduler } from 'jasmine-marbles';
import { RouterTestingModule } from '@angular/router/testing';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let userApi: UserApi;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports: [FormsModule, HttpClientModule, RouterTestingModule],
      providers: [
        {
          provide: UserApi,
          useValue: {
            getAllUsers: jest.fn(),
            searchUser: jest.fn()
          }
        }
      ]
    }).compileComponents();
    userApi = TestBed.get(UserApi);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    userApi = TestBed.get(UserApi);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get all users', () => {
    const expectedUsers = [
      {
        title: 'mr',
        first: 'thomas',
        last: 'lopez',
        email: 'thomas.lopez@example.com',
        id: 2
      }
    ];
    const users$ = cold('--a|', { a: expectedUsers });
    userApi.getAllUsers = jest.fn(() => users$);
    fixture.detectChanges();
    expect(component.users$).toEqual(users$, 'no users');
  });

  it('can search user by first name', () => {
    const scheduler = getTestScheduler();
    component.debounce = 30;
    component.scheduler = scheduler;
    const users = [
      {
        title: 'mr',
        first: 'thomas',
        last: 'lopez',
        email: 'thomas.lopez@example.com',
        id: 2
      }
    ];
    const searchTerm$ = hot('--s---|', {
      s: 'red'
    });
    const response$ = cold('----a|', { a: users });
    const expected$ = cold('----------r|', { r: users });
    component.searchTerm$ = searchTerm$;
    userApi.searchUser = jest.fn(() => response$);

    component.ngOnInit();
    scheduler.flush();
    expect(component.users$).toBeObservable(expected$);
  });

  it('can search user by first name race condition', () => {
    const scheduler = getTestScheduler();
    component.debounce = 30;
    component.scheduler = scheduler;
    const users = [
      {
        title: 'mr',
        first: 'thomas',
        last: 'lopez',
        email: 'thomas.lopez@example.com',
        id: 2
      }
    ];

    const response$ = cold('----a|', { a: users });
    const expected$ = cold('----------r|', { r: users });
    component.searchTerm$ = hot('--s---|', {
      s: 'thomas'
    });
    userApi.searchUser = jest.fn(() => response$);

     
    const users1 = [
      {
        title: 'mr',
        first: 'John',
        last: 'Paul',
        email: 'john.paul@example.com',
        id: 3
      }
    ];
    component.searchTerm$ = hot('--s---|', {
      s: 'john'
    });
    const response$1 = cold('-a|', { a: users1 });
    const expected$1 = cold('------r|', { r: users1 });

    userApi.searchUser = jest.fn(() => response$1);


    component.ngOnInit();
    scheduler.flush();
    expect(component.users$).toBeObservable(expected$1);
  });
});
