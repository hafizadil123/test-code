import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntil, first } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { CoreConfigService } from '@core/services/config.service';
import { AuthenticationService } from 'app/auth/service';
import 'rxjs/add/operator/filter';


@Component({
  selector: 'app-auth-activate-user-v2',
  templateUrl: './auth-activate-user-v2.component.html',
  styleUrls: ['./auth-activate-user-v2.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ActivateUserV2Component implements OnInit {
  // Public
  public emailVar;
  public coreConfig: any;
  public forgotPasswordForm: FormGroup;
  public submitted = false;
  public passwordTextType: boolean;
  public registerForm: FormGroup;
  public loginForm: FormGroup;
  public loading = false;
  public returnUrl: string;
  public error = '';
  public message = '';
  public userId = '';
  public token = '';

  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {CoreConfigService} _coreConfigService
   * @param {FormBuilder} _formBuilder
   *
   */
  constructor(private _coreConfigService: CoreConfigService, private _formBuilder: FormBuilder,
    private _authenticationService: AuthenticationService,
    private _router: ActivatedRoute,
    ) {
    this._unsubscribeAll = new Subject();

    // Configure the layout
    this._coreConfigService.config = {
      layout: {
        navbar: {
          hidden: true
        },
        menu: {
          hidden: true
        },
        footer: {
          hidden: true
        },
        customizer: false,
        enableLocalStorage: false
      }
    };
  }

  // convenience getter for easy access to form fields
  // get f() {
  //    // return this.forgotPasswordForm.controls;
  // }

  /**
   * On Submit
   */
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    // if (this.forgotPasswordForm.invalid) {
    //   return;
    // }

  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    
  // Subscribe to config changes
  this._router.queryParams.filter(params => params.userId)
    .subscribe(params => {
    
    this.userId = params.userId;
      console.log(this.userId); // popular
    }
  );
  this._router.queryParams.filter(params => params.code)
    .subscribe(params => {
    
    this.token = params.code;
      console.log(this.token); // popular
    }
  );
      console.log(this._router.queryParams); // popular

  this._authenticationService
      .activateUser(this.userId, this.token)
      .pipe(first())
      .subscribe(
        data => {
          this.error = '';
          const { success, message} = data || {};
          if(success === 1) {
            this.message = message;
            this.loading = false;
            this.forgotPasswordForm.reset();
          } 
          else {
            this.loading = false;
            this.error = message
          }
        },
        error => {
          this.error = error;
          this.loading = false;
        }
      );
    this._coreConfigService.config.pipe(takeUntil(this._unsubscribeAll)).subscribe(config => {
      this.coreConfig = config;
    });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
