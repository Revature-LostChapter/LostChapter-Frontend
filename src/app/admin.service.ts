import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  updateBooks(bookId: Number, bookName: string, synoposis: string, author: string, genre: string, id: number, quantity: number, year: number, edition: string, publisher: string, salesIsActive: boolean, salesDiscountRate: number, bookPrice: number, bookImamge: string, isbn: string){
    return this.http.post(`http://localhost:8081/books`, {
      bookId: bookId,
      bookName: bookName,
      synoposis: synoposis,
      author: author,
      genre: {
        genre: genre,
        id: id
      },
      quantity:quantity,
      year: year,
      edition: edition,
      publisher: publisher,
      salesIsActive: salesIsActive,
      bookPrice: bookPrice,
      bookImamge: bookImamge,
      isbn: isbn
    },
    {
      withCredentials: true,
      observe: 'response'
    }
    )
  }
}
