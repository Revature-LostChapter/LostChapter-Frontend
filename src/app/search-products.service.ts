import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchProductsService {

  constructor(private http: HttpClient) { }

  getSearchResult(searchItem: string){
    return this.http.get(`http://ec2-18-219-69-82.us-east-2.compute.amazonaws.com:8081/http://localhost:8081/books/search/${searchItem}`, {
      observe: 'response'
    })
  }

  addToCart(productId: string, quantity: string, userId: string){

    let parameter = new HttpParams();
    parameter = parameter.append('productId', productId);
    parameter = parameter.append('quantity', quantity);
    return this.http.post(`http://ec2-18-219-69-82.us-east-2.compute.amazonaws.com:8081/http://localhost:8081/users/${userId}/cart`, {},
      {
        "params": parameter,
        withCredentials: true,
        observe:'response'
      })
  }

}


