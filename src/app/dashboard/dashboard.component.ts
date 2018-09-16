import { Component, OnInit } from '@angular/core';
import { EmployeeApi } from '../api/employee.api';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(private employeeService: EmployeeApi) {}
  $employees;
  searchTerm: string;
  ngOnInit() {
    this.$employees = this.employeeService.getAllEmployee();
  }
  search() {
    this.$employees = this.searchTerm
      ? this.employeeService.getAllEmployeeById(this.searchTerm)
      : this.employeeService.getAllEmployee();
  }
}
