import { Component, OnInit } from '@angular/core';
import { UserApi } from '../api/user.api';
import { User } from '../models/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  users$: User[] = [];

  constructor(private userApi: UserApi) {}
  users;
  ngOnInit() {}

  search(name) {
    this.users = this.userApi
      .searchUser(name)
      .subscribe(users => (this.users = users));
  }
}
