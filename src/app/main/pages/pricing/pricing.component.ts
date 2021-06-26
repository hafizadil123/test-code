import { Component, OnInit } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { PricingService } from 'app/main/pages/pricing/pricing.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
 
import { StripeService, Elements, Element as StripeElement, ElementsOptions } from "ngx-stripe";

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent implements OnInit {
  // public
  public data: any;

  Monthly = false;
  stripeKey = 'pk_test_52Pstu25HXmWQutxZr17xZVH00eZwtoftv';
  strikeCheckout:any = null;
  token: any = null;


 
/**
   * Constructor
   *
   * @param {PricingService} _pricingService
   */
  constructor(private _pricingService: PricingService,  private fb: FormBuilder,
    private stripeService: StripeService) {
    this._unsubscribeAll = new Subject();
  }
 
  ngOnInit() {
      this._pricingService.onDatatablessChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
        this.data = response;
      });
  }
  checkout() {
    this._pricingService.requestMemberSession(); 
  }
  
  

  // private
  private _unsubscribeAll: Subject<any>;


}
