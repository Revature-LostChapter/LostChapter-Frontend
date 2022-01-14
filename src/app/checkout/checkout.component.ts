import { Component, OnInit } from '@angular/core';
import {MatRadioModule} from '@angular/material/radio';
import { Router } from '@angular/router';
import { ShippingAddress } from 'ShippingAddress';
import { User } from 'User';
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
  streetName!: string;
  state!: string;
  zipCode!: string;
  deliveryDate!: string;

  shippingAddress!: ShippingAddress;

  ngOnInit(): void {
    this.checkIfLoggedIn();

  }

  checkIfLoggedIn() {
    this.loginService.checkLoginStatus().subscribe((res) => {
      console.log(res);
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
    this.checkoutService.cartCheckout(this.cardNumber,this.expirationMonth, this.expirationYear, this.securityCode, this.cardholderName, this.shippingAddress).subscribe((res)=> {
      if (res.status === 200 || res.status === 201){
        console.log(res.body);
        this.router.navigate(['/checkout-summary'])
      }
    },
    (err) => {
      this.errorMessage = '';
      this.errorMessage = err.error;
      ;

    })
  }



}
