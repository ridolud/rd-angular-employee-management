import { NgModule } from '@angular/core';
import { DefaultLayoutComponent } from './default-layout/default-layout.component';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { IdrCurrency } from './pipes/idr-currency.pipe';

@NgModule({
  declarations: [DefaultLayoutComponent, IdrCurrency],
  imports: [RouterModule, MatButtonModule],
  exports: [
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    IdrCurrency,
  ],
})
export class ShareModule {}
