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
  let userApiSpy: jasmine.SpyObj<UserApi>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports: [FormsModule, HttpClientModule],
      providers: [
        {
          provide: UserApi,
          useValue: jasmine.createSpyObj('userApi', ['getAllUsers'])
        }
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    userApiSpy = TestBed.get(UserApi);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get employee', () => {
    const expectedUsers = [
      {
        title: 'mr',
        first: 'thomas',
        last: 'lopez',
        email: 'thomas.lopez@example.com',
        id: 2
      }
    ];
    const users = cold('---a|', { a: expectedUsers });
    const emptyUsers = cold('--b|', { b: [] });
    userApiSpy.getAllUsers.and.returnValue(users);
    fixture.detectChanges();
    component.ngOnInit();
    expect(component.users$).toEqual(emptyUsers, 'no users');
    getTestScheduler().flush(); // flush the observables
    fixture.detectChanges(); // update view
    expect(component.users$).toEqual(users, 'users');
  });
});
