import { Component, OnInit } from '@angular/core';
import { EmployeeApi } from '../api/employee.api';
import { Subject } from 'rxjs';
import { withLatestFrom } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(private employeeApi: EmployeeApi) {}
  $click = new Subject();
  $employees = [];
  searchTerm: string;

  ngOnInit() {
    this.employeeApi.getAllEmployee().subscribe(e => {
      this.$employees = e;
    });
  }

  search() {
    // this.$employees = this.searchTerm
    //   ? this.employeeApi.getAllEmployeeById(this.searchTerm)
    //   : this.employeeApi.getAllEmployee();
  }
}
