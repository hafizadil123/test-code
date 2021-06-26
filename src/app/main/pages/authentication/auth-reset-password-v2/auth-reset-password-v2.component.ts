import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/filter';
import { takeUntil, first } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { CoreConfigService } from '@core/services/config.service';
import { AuthenticationService } from 'app/auth/service';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-auth-reset-password-v2',
  templateUrl: './auth-reset-password-v2.component.html',
  styleUrls: ['./auth-reset-password-v2.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AuthResetPasswordV2Component implements OnInit {
  // Public
  public coreConfig: any;
  public passwordTextType: boolean;
  public confPasswordTextType: boolean;
  public resetPasswordForm: FormGroup;
  public submitted = false;
  public emailVar;
  public forgotPasswordForm: FormGroup;
  public loading = false;
  public returnUrl: string;
  public error = '';
  public message = '';
  public userId = '';

  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {CoreConfigService} _coreConfigService
   * @param {FormBuilder} _formBuilder
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
  get f() {
    return this.resetPasswordForm.controls;
  }

  /**
   * Toggle password
   */
  togglePasswordTextType() {
    this.passwordTextType = !this.passwordTextType;
  }

  /**
   * Toggle confirm password
   */
  toggleConfPasswordTextType() {
    this.confPasswordTextType = !this.confPasswordTextType;
  }

  /**
   * On Submit
   */
  onSubmit() {
    this.submitted = true;
    console.log(this.resetPasswordForm);
    // stop here if form is invalid
    if (this.resetPasswordForm.invalid) {
      console.log(this.resetPasswordForm.errors);
      return;
    }

    // Login
    this.loading = true;
    this._authenticationService
      .updatePassword(this.f.newPassword.value, this.userId)
      .pipe(first())
      .subscribe(
        data => {
          this.error = '';
          const { success, message} = data || {};
          if(success === 1) {
            this.message = message;
            this.loading = false;
            this.submitted = false;
            this.resetPasswordForm.reset();
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
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */

  // confirmPasswordValidator(_this) {
  //     return (control: AbstractControl) => {
  //       const newPassValue = _this.resetPasswordForm.get('newPassword').value;
  //       return (newPassValue !== control.value) ? { confirmPassword: { value: control.value } } : null;
  //     }
  // }

  ngOnInit(): void {
    this.resetPasswordForm = this._formBuilder.group({
      newPassword: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    });

    this._router.queryParams.filter(params => params.userId)
    .subscribe(params => {
    
    this.userId = params.userId;
      console.log(this.userId); // popular
    }
  );
      console.log(this._router.queryParams); // popular
    
    // Subscribe to config changes
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
