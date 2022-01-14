import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Checkout } from 'Checkout';
import { CheckoutService } from '../checkout.service';
@Component({
  selector: 'app-checkout-summary',
  templateUrl: './checkout-summary.component.html',
  styleUrls: ['./checkout-summary.component.css'],
})
export class CheckoutSummaryComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute, private checkoutService: CheckoutService) {}

  private sub: any;
  transactionId!: number;
  showSummary!: Checkout;

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
    this.transactionId = params['transactionId'];
    this.showCheckoutSummary();

    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  showCheckoutSummary(){
    this.checkoutService.getCheckoutSummary(this.transactionId).subscribe((res) => {
      let body = <Checkout> res.body;
      console.log(body);
      this.showSummary = body;

    });
  }
}

