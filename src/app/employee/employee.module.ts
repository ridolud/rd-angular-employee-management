import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeNewComponent } from './components/employee-new/employee-new.component';
import { EmployeeRoutingModule } from './employee-routing.module';
import { provideHttpClient } from '@angular/common/http';
import { EmployeeService } from './services/employee.service';
import { ShareModule } from '../share/share.module';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { EmployeeDetailComponent } from './components/employee-detail/employee-detail.component';
import { AuthModule } from '../auth/auth.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [
    EmployeeListComponent,
    EmployeeNewComponent,
    EmployeeDetailComponent,
  ],
  providers: [provideHttpClient(), provideNativeDateAdapter(), EmployeeService],
  imports: [
    CommonModule,
    AuthModule,
    MatTableModule,
    ShareModule,
    MatFormFieldModule,
    FormsModule,
    MatRadioModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatPaginatorModule,
    MatSortModule,
    EmployeeRoutingModule,
  ],
})
export class EmployeeModule {}
