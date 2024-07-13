import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthUser } from '../../models/AuthUser';
import { catchError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  public loginForm = new FormGroup({
    username: new FormControl('', [
      Validators.pattern(/^(\d|\w)+$/),
      Validators.required,
    ]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private _snackBar: MatSnackBar
  ) {}

  onLogin() {
    if (!this.loginForm.valid) return;

    this.authService.login(this.loginForm.getRawValue() as AuthUser).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        this._snackBar.open(err, 'dismiss');
      },
    });
  }
}
