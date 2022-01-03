import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchProductsService {

  constructor(private http: HttpClient) { }

  getSearchResult(searchItem: string){
    return this.http.get(`https://www.googleapis.com/books/v1/volumes?q=${searchItem}&key=AIzaSyBPlrx-d7E56iWYhLW2fNt7LW3Vr9ESXs0`, {
    })
  }
}
