import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeNewComponent } from './components/employee-new/employee-new.component';
import { NgModule } from '@angular/core';
import { DefaultLayoutComponent } from '../share/default-layout/default-layout.component';
import { EmployeeDetailComponent } from './components/employee-detail/employee-detail.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  {
    path: 'employees',
    component: DefaultLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: EmployeeListComponent },
      { path: 'new', component: EmployeeNewComponent },
      { path: ':username', component: EmployeeDetailComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeeRoutingModule {}
