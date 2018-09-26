import { Component, OnInit } from '@angular/core';
import { UserApi } from '../api/user.api';
import { Subject } from 'rxjs';
import { withLatestFrom } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(private employeeApi: UserApi) {}
  $click = new Subject();
  users$ = [];
  searchTerm: string;

  ngOnInit() {
    this.employeeApi.getAllUsers().subscribe(e => {
      this.users$ = e;
    });

    this.$click.subscribe(this.search.bind(this));
  }

  search(event) {

    // this.$employees = this.searchTerm
    //   ? this.employeeApi.getAllEmployeeById(this.searchTerm)
    //   : this.employeeApi.getAllEmployee();
  }
}
