import { Component, OnInit } from '@angular/core';
import { EmployeeApi } from '../api/employee.api';
import { Subject } from 'rxjs';
import { withLatestFrom, map, mapTo, switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  user$;
  constructor(
    private route: ActivatedRoute,
    private employeeApi: EmployeeApi
  ) {}

  ngOnInit(): void {
    this.user$ = this.route.params.pipe(
      switchMap(params => this.employeeApi.getEmployeeById(params.id))
    );
  }
}
