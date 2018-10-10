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

  it('can search user by name', () => {
    const scheduler = getTestScheduler();
    const users = [
      {
        title: 'mr',
        first: 'thomas',
        last: 'lopez',
        email: 'thomas.lopez@example.com',
        id: 2
      }
    ];
    const debounce = 600;
    const response$ = cold('--a|', { a: users });
    const expected$ = cold('-- 599ms a|', { a: users });
    const searchTerm$ = hot('--s--|', {
      s: 'red'
    });

    component.debounce = debounce;
    component.scheduler = scheduler;

    fixture.detectChanges();

    userApi.searchUser = jest.fn(() => response$);
    component.searchTerm$ = searchTerm$;
    component.ngOnInit();

    scheduler.flush();

    expect(component.users$).toBeObservable(expected$);
  });
});
