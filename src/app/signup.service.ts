import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http: HttpClient) { }

  signup(username: string, password: string, firstName: string, lastName: string, age: number, email: string, birthday: string, address: string, role: string){
    return this.http.post(`http://ec2-54-84-57-117.compute-1.amazonaws.com:8081/signup`, {
      "username": username,
      "password": password,
      "firstName": firstName,
      "lastName": lastName,
      "age": age,
      "email": email,
      "birthday": birthday,
      "address": address,
      "role": role
    }, {
      withCredentials: true,
      observe: 'response',
      responseType: 'text'
    })
  }
}
