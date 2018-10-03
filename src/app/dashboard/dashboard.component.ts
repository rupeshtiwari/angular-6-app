import { Component, OnInit } from '@angular/core';
import { UserApi } from '../api/user.api';
import { Subject, Observable, asyncScheduler } from 'rxjs';
import { withLatestFrom, debounce, debounceTime } from 'rxjs/operators';
import { User } from '../models/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(private userApi: UserApi) {}
  $click = new Subject();
  users$: Observable<User[]>;
  searchTerm: string;
  searchUser = new Subject<string>();
  debounce = 500;
  scheduler = asyncScheduler;

  ngOnInit() {
    this.users$ = this.userApi.getAllUsers();
    this.searchUser
      .pipe(debounceTime(this.debounce, this.scheduler))
      .subscribe(this.search.bind(this));
  }

  search(name) {
    this.users$ = this.userApi.searchUser(name);
  }
}
