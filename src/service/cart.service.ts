import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Cart } from 'src/app/Cart';

import { Products } from 'src/app/Products';
import { ThisReceiver } from '@angular/compiler';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient) {}
  sub: Subject<Cart> = new Subject();
  items: Products[] = [];
  p!: Products;

  addToCart(pId: string, quantity: string, cartId: string) {
    console.log('cartService', pId);
    console.log(quantity);
    let parameter = new HttpParams();
    parameter = parameter.append('productId', pId);
    parameter = parameter.append('quantity', quantity);
    return this.http.post(
      `http://localhost:8081/carts/${cartId}`,
      {},
      {
        params: parameter,
        withCredentials: true,
        observe: 'response',
      }
    );
  }

  getCarFromCustomerPage(cardId: string) {
    return this.http
      .get<Cart>(`http//localhost:8081/carts/${cardId}`, {
        withCredentials: true,
      })
      .subscribe((data) => {
        this.sub.next(data);
      });
  }

  deleteProductFromCart(pId: string, cartId: string) {
    return this.http.delete(`http://localhost:8081/carts/${cartId}`, {
      withCredentials: true,
      observe: 'response',
      params: {
        productId: pId,
      },
    });
  }
}
