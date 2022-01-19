import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Cart } from 'Cart';

import { Products } from 'src/app/Products';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient) {}
  sub: Subject<Cart> = new Subject();
  items: Products[] = [];
  p!: Products;

  addToCart(pId: string, quantity: string, cartId: string) {
    let parameter = new HttpParams();
    parameter = parameter.append('productId', pId);
    parameter = parameter.append('quantity', quantity);
    return this.http.post(
      `http://ec2-54-84-57-117.compute-1.amazonaws.com:8081/carts/${cartId}`,
      {},
      {
        params: parameter,
        withCredentials: true,
        observe: 'response',
      }
    );
  }

  getCartFromCustomerPage(userId: string) {
    return this.http.get<Cart>(`http://ec2-54-84-57-117.compute-1.amazonaws.com:8081/users/${userId}/cart`, {
        withCredentials: true
      }).subscribe((res)=> {
        this.sub.next(res);
      })
  }

  deleteProductFromCart(bookId: string, userId: string) {
    return this.http.delete(`http://ec2-54-84-57-117.compute-1.amazonaws.com:8081/users/${userId}/cart`, {

      withCredentials: true,
      observe: 'response',
      params: {
        'bookId': bookId,
      },
    });
  }
}
