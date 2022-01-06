import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchProductsService {

  constructor(private http: HttpClient) { }

  getSearchResult(searchItem: string){
    return this.http.get(`http://localhost:9090/books/search/${searchItem}`, {
      observe: 'response'
    })
  }

  addToCart(productId: string, quantity: string, userId: string){

    let parameter = new HttpParams();
    parameter = parameter.append('productId', productId);
    parameter = parameter.append('quantity', quantity);
    return this.http.post(`http://localhost:9090/users/${userId}/cart`, {},
      {
        "params": parameter,
        withCredentials: true,
        observe:'response'
      })
  }

}


