import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ShippingAddress } from 'ShippingAddress';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(private http: HttpClient) { }

  cartCheckout(cardNumber: string, expirationMonth: string, expirationYear: string, securityCode: string, cardholderName: string, shippingAddress: ShippingAddress){
    return this.http.post(`http://localhost:8081/user/checkout`, {

      "cardNumber": cardNumber,
      "expirationMonth": expirationMonth,
      "expirationYear": expirationYear,
      "securityCode": securityCode,
      "cardholderName": cardholderName,
      "shippingAddress": shippingAddress
    }, {
      withCredentials: true,
      observe: 'response'
    })
  }

}
