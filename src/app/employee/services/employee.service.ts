import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Employee } from '../models/employee';

// dummy data
import rawEmployeeData from '../../../assets/employees.json';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private employees$ = new BehaviorSubject<Employee[]>(
    rawEmployeeData as unknown as Employee[]
  );

  constructor(private readonly http: HttpClient) {}

  add(employee: Employee) {
    this.employees$.next([employee, ...this.employees$.value]);
  }

  getAll() {
    return this.employees$.asObservable();
  }

  getByUsername(username: string): Observable<Employee | undefined> {
    return this.employees$.pipe(
      map((employees) =>
        employees.find((employee) => employee.username === username)
      )
    );
  }
}
