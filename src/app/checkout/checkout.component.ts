import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Checkout } from 'Checkout';
import { ShippingAddress } from 'ShippingAddress';
import { CheckoutService } from '../checkout.service';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor(private router: Router, private checkoutService: CheckoutService, private loginService: LoginService) { }

  errorMessage!: string;

  cardNumber!: string;
  expirationMonth!: string;
  expirationYear!: string;
  securityCode!: string;
  cardholderName!: string;
  firstName!: string;
  lastName!: string;
  deliveryDate!: string;
  streetName!: string;
  city!: string;
  state!: string;
  zipCode!: string

  transactionId!: number;


  value = "7 Days Delivery Date";

  deliveryDates = [{name: "1 Month Delivery Date", value: "1 Month Delivery Date"}, {name: "7 Days Delivery Date", value: "7 Days Delivery Date"}];

  shippingAddress!: ShippingAddress;

  ngOnInit(): void {
    this.checkIfLoggedIn();
  }

  checkIfLoggedIn() {
    this.loginService.checkLoginStatus().subscribe((res) => {
      if (res.status === 401 || res.status === 400){
        this.router.navigate(['']);
      }
    },
    (err) => {
      this.errorMessage = '';
      this.errorMessage = err.error;
    });
  }

  onCheckoutCart(){
    this.checkoutService.cartCheckout(this.cardNumber,this.expirationMonth, this.expirationYear, this.securityCode, this.cardholderName, this.firstName, this.lastName, this.streetName, this.city, this.state, this.zipCode, this.value).subscribe((res)=> {
      if (res.status === 200 || res.status === 201){
        let body = <Checkout> res.body
        this.transactionId = body.transactionId;

        this.router.navigate([`/checkout-summary/${this.transactionId}`])
      }
    },
    (err) => {
      this.errorMessage = '';
      this.errorMessage = err.error;
      ;

    })
  }



}
