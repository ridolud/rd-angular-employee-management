import { Injectable } from '@angular/core';
import { AuthUser } from '../models/AuthUser';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {
  // dummy data
  private authUser: AuthUser = {
    username: 'admin',
    password: 'password',
  };

  constructor() {}

  isAuthenticated() {
    const token = localStorage.getItem('token');
    return !!token;
  }

  login(args: AuthUser) {
    return new Observable((subcriber) => {
      if (
        args.password != this.authUser.password ||
        args.username != this.authUser.username
      ) {
        subcriber.error('Username or password invalid');
      } else {
        localStorage.setItem('token', 'token-example');
        subcriber.next(true);
      }

      subcriber.complete();
    });
  }

  logout() {
    return new Observable((subcriber) => {
      localStorage.removeItem('token');
      subcriber.next(true);
      subcriber.complete();
    });
  }
}
