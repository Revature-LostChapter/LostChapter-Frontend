import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SearchProductsService } from '../search-products.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  constructor(private http: HttpClient, private searchProduct: SearchProductsService) { }

  ngOnInit(): void {
  }

  selected = 'option2';

  // for page pagination

  // p: number = 1;
  // collection: any[] = someArrayOfThings;

}
