import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, MatSortable, Sort } from '@angular/material/sort';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
})
export class EmployeeListComponent implements OnInit, AfterViewInit {
  public employeesDataSource = new MatTableDataSource<Employee>([]);
  public columns: string[] = [
    'firstName',
    'lastName',
    'email',
    'group',
    'status',
    'actions',
  ];

  public search = '';

  constructor(
    private readonly employeeService: EmployeeService,
    private _location: Location,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) short!: MatSort;

  ngOnInit(): void {
    this.employeeService.getAll().subscribe((employees) => {
      this.employeesDataSource.data = employees;

      this.route.queryParams.subscribe((params) => {
        this.employeesDataSource?.sort?.sort(<MatSortable>{
          id: params['sortKey'],
          start: params['sort'],
        });

        this.search = params['search'];
        this.employeesDataSource.filter = this.search.trim().toLowerCase();
      });
    });
  }

  ngAfterViewInit() {
    this.route.queryParams.subscribe((params) => {
      this.paginator.pageIndex = params['pageIndex'];
      this.paginator.pageSize = params['pageSize'];

      this.employeesDataSource.paginator = this.paginator;
      this.employeesDataSource.sort = this.short;
    });
  }

  applyFilter(event: Event) {
    this.updateQuery();
    this.employeesDataSource.filter = this.search.trim().toLowerCase();
  }

  updateQuery() {
    const searchparams = new URLSearchParams();

    searchparams.set('search', this.search ?? '');
    searchparams.set('pageIndex', this.paginator.pageIndex.toString());
    searchparams.set('pageSize', this.paginator.pageSize.toString());

    if (this.short?.active) {
      searchparams.set(`sortKey`, this.short.active);
      searchparams.set('sort', this.short.start);
    }
    this._location.go('/employees', searchparams.toString());
  }
  setQuery() {}

  onSortChange(sortState: Sort) {
    this.updateQuery();
  }

  onDelete() {
    this._snackBar.open('Are you sure to delete it?', 'Ok', {
      panelClass: 'error-snackbar',
    });
  }

  onEdit() {
    this._snackBar.open('Are you sure to edit it?', 'ok', {
      panelClass: 'warning-snackbar',
    });
  }
}
