import { Component, OnInit } from '@angular/core';
import { UserApi } from '../api/user.api';
import { Subject, Observable, asyncScheduler } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { User } from '../models/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  users$: Observable<User[]>;
  _searchTerm$ = new Subject<string>();
  debounce = 500;
  scheduler = asyncScheduler;
  searchTerm$ = this._searchTerm$.asObservable();

  constructor(private userApi: UserApi) {}

  ngOnInit() {
    this.users$ = this.userApi.getAllUsers();
    this.searchTerm$
      .pipe(debounceTime(this.debounce, this.scheduler))
      .subscribe(this.search.bind(this));
  }

  onSearch(val: string) {
    this._searchTerm$.next(val);
  }

  search(name) {
    this.users$ = this.userApi.searchUser(name);
  }
}
