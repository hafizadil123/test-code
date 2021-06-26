import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'environments/environment';
import { User, Role } from 'app/auth/models';
import { ToastrService } from 'ngx-toastr';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  //public
  public currentUser: Observable<User>;

  //private
  private currentUserSubject: BehaviorSubject<User>;

  /**
   *
   * @param {HttpClient} _http
   * @param {ToastrService} _toastrService
   */
  constructor(private _http: HttpClient, private _toastrService: ToastrService) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  // getter: currentUserValue
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  /**
   *  Confirms if user is admin
   */
  get isAdmin() {
    return this.currentUser && this.currentUserSubject.value.role === Role.Admin;
  }

  /**
   *  Confirms if user is client
   */
  get isClient() {
    return this.currentUser && this.currentUserSubject.value.role === Role.Client;
  }

  /**
   * User login
   *
   * @param email
   * @param password
   * @returns user
   */
  login(email: string, password: string) {
    return this._http
      .post<any>(`${environment.apiUrl}/users/login`, { email, password })
      .pipe(
        map(user => {
          // login successful if there's a jwt token in the response
          if (user && user.token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));

            // Display welcome toast!
            setTimeout(() => {
              this._toastrService.success(
                'You have successfully logged',
                '👋 Welcome, ' + user.user.fullName + '!',
                { toastClass: 'toast ngx-toastr', closeButton: true }
              );
            }, 2500);

            // notify
            this.currentUserSubject.next(user);
          } else {
            console.log('sadf')
            setTimeout(() => {
              this._toastrService.error(
                user.message,
              );
              
            }, 2500);

            // this.currentUserSubject.next(user);
          }

          return user;
        })
      );
  }

    /**
   * User register
   *
   * @param email
   * @param password
   * @returns user
   */
  register(fullName: string, email: string, password: string) {
    return this._http
      .post<any>(`${environment.apiUrl}/users/register`, { fullName, email, password })
      .pipe(
        map(user => {
          // login successful if there's a jwt token in the response
          if (user && user.token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            // localStorage.setItem('currentUser', JSON.stringify(user));

            // Display welcome toast!
            setTimeout(() => {
              this._toastrService.success(
                user.message,
                '',
                { toastClass: 'toast ngx-toastr', closeButton: true }
              );
            }, 2500);

            // notify
            // this.currentUserSubject.next(user);
          } else {
            console.log('sadf')
            setTimeout(() => {
              this._toastrService.error(
                user.message,
              );
              
            }, 2500);

            // this.currentUserSubject.next(user);
          }

          return user;
        })
      );
  }
   /**
   * User forgot password
   *
   * @param email
   * @returns user
   */
  forgotPassword(email: string) {
    return this._http
      .post<any>(`${environment.apiUrl}/users/forgot-password`, { email })
      .pipe(
        map(user => {
          // login successful if there's a jwt token in the response
          if (user && (user.success === 1)) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes

            // Display welcome toast!
            setTimeout(() => {
              this._toastrService.success(
                user.message,
                '!',
                { toastClass: 'toast ngx-toastr', closeButton: true }
              );
            }, 2500);

            // notify
            // this.currentUserSubject.next(user);
          } else {
            console.log('sadf')
            setTimeout(() => {
              this._toastrService.error(
                user.message,
              );
              
            }, 2500);

            // this.currentUserSubject.next(user);
          }

          return user;
        })
      );
  }
   /**
   * User forgot password
   *
   * @param email
   * @returns user
   */
  updatePassword(newPassword: string, userId: string) {
    return this._http
      .post<any>(`${environment.apiUrl}/users/update-password`, { newPassword, userId })
      .pipe(
        map(user => {
          // login successful if there's a jwt token in the response
          if (user && (user.success === 1)) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes

            // Display welcome toast!
            setTimeout(() => {
              this._toastrService.success(
                user.message,
                '!',
                { toastClass: 'toast ngx-toastr', closeButton: true }
              );
            }, 2500);

            // notify
            // this.currentUserSubject.next(user);
          } else {
            console.log('sadf')
            setTimeout(() => {
              this._toastrService.error(
                user.message,
              );
              
            }, 2500);

            // this.currentUserSubject.next(user);
          }

          return user;
        })
      );
  }
  
  activateUser(userId: any, token: string) {
    return this._http
      .post<any>(`${environment.apiUrl}/users/activate-user`, {  userId, token })
      .pipe(
        map(user => {
          // login successful if there's a jwt token in the response
          if (user && (user.success === 1)) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes

            // Display welcome toast!
            setTimeout(() => {
              this._toastrService.success(
                user.message,
                '!',
                { toastClass: 'toast ngx-toastr', closeButton: true }
              );
            }, 2500);

          } else {
            setTimeout(() => {
              this._toastrService.error(
                user.message,
              );
              
            }, 2500);
          }

          return user;
        })
      );
  }
  /**
   * User logout
   *
   */
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    // notify
    this.currentUserSubject.next(null);
  }
}
