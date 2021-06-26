import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { BehaviorSubject, Observable } from 'rxjs';
import { ICustomerPortal, Plan, ISession } from './pricing';
import { environment } from 'environments/environment';
declare const Stripe: any;
@Injectable()
export class PricingService implements Resolve<any> {
  rows: any;
  onDatatablessChanged: BehaviorSubject<any>;
  priceId = 'price_1J6XX1Cxa2qwVR0HSQQsW4AW';
   baseUrl: string = environment.baseUrl;
  /**
   * Constructor
   *
   * @param {HttpClient} _httpClient
   */
  constructor(private _httpClient: HttpClient) {
    // Set the defaults
    this.onDatatablessChanged = new BehaviorSubject({});
  }
  redirectToCustomerPortal() {
    this._httpClient
      .post<ICustomerPortal>(
        this.baseUrl + 'api/payments/customer-portal',
        { returnUrl: environment.homeUrl },
        this.getHttpOptions()
      )
      .subscribe((data) => {
        window.location.href = data.url;
      });
  }
  redirectToCheckout(sessionId: string) {
    const stripe = Stripe('pk_test_52Pstu25HXmWQutxZr17xZVH00eZwtoftv');
    console.log('sessionId', sessionId);
    stripe.redirectToCheckout({
      sessionId: sessionId,
    });
  }
  getHttpOptions() {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('currentUser')).token,
      }),
    };

    return httpOptions;
  }
  requestMemberSession(): void {
    this._httpClient
      .post<ISession>(this.baseUrl + '/users/create-checkout-session', {
        priceId: this.priceId,
        successUrl: environment.successUrl,
        failureUrl: environment.cancelUrl,
        userId: JSON.parse(localStorage.getItem('currentUser')).user._id
      })
      .subscribe((session) => {
        this.redirectToCheckout(session.sessionId);
      });
  }

  
  /**
   * Resolver
   *
   * @param {ActivatedRouteSnapshot} route
   * @param {RouterStateSnapshot} state
   * @returns {Observable<any> | Promise<any> | any}
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return new Promise<void>((resolve, reject) => {
      Promise.all([this.getDataTableRows()]).then(() => {
        resolve();
      }, reject);
    });
  }

  /**
   * Get rows
   */
  getDataTableRows(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this._httpClient.get('api/pricing-data').subscribe((response: any) => {
        this.rows = response;
        this.onDatatablessChanged.next(this.rows);
        resolve(this.rows);
      }, reject);
    });
  }
}
