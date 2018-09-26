import { Component, OnInit } from '@angular/core';
import { UserApi } from '../api/user.api';
import { switchMap } from 'rxjs/operators';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-save-user',
  templateUrl: './save-user.component.html'
})
export class SaveUserComponent implements OnInit {
  user$;
  userForm$;
  constructor(
    private route: ActivatedRoute,
    private userApi: UserApi,
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.route.params
      .pipe(switchMap(params => this.userApi.getUserByID(params.id)))
      .subscribe(s => this.userForm$.patchValue(s));
  }

  createForm() {
    this.userForm$ = this.fb.group({
      title: ['', Validators.required],
      first: ['', Validators.required],
      last: ['', Validators.required],
      email: ['', Validators.required],
      picture: ['', Validators.required],
      id: ['', Validators.required]
    });
  }

  save() {
    const value = this.userForm$.values;
    this.userApi.saveUser(value);
  }
}
