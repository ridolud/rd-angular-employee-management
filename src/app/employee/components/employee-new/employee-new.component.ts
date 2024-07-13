import { Component } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Employee } from '../../models/employee';
import { Location } from '@angular/common';

@Component({
  selector: 'app-employee-new',
  templateUrl: './employee-new.component.html',
})
export class EmployeeNewComponent {
  readonly maxDate = new Date();

  public employeeForm = new FormGroup({
    username: new FormControl('', [
      Validators.pattern(/^\S*$/),
      Validators.required,
    ]),
    email: new FormControl('', [Validators.email, Validators.required]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    birthDate: new FormControl('', [Validators.required]),
    group: new FormControl(null, [Validators.required]),
    basicSalary: new FormControl(null, [Validators.required]),
    status: new FormControl('active'),
    description: new FormControl('', [Validators.required]),
  });

  constructor(
    private readonly employeeService: EmployeeService,
    private router: Router,
    private _location: Location
  ) {}

  onSubmit() {
    if (!this.employeeForm.valid) return;

    this.employeeService.add(
      this.employeeForm.getRawValue() as unknown as Employee
    );

    this.router.navigate(['/employees']);
  }

  onBack() {
    this._location.back();
  }
}
