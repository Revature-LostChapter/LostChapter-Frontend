import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { SearchProducts } from 'SearchProduct';
import { SearchProductsService } from '../search-products.service';

@Component({
  selector: 'app-indexnavbar',
  templateUrl: './indexnavbar.component.html',
  styleUrls: ['./indexnavbar.component.css']
})
export class IndexnavbarComponent implements OnInit {

  constructor(private http: HttpClient, private searchProductService: SearchProductsService) { }

  searchProduct!: SearchProducts;

  ngOnInit(): void {
  }

  searchItem!: string;
  displayResults: SearchProducts[] = [];

  // for page pagination
  // p: number = 1;
  // collection: any[] = someArrayOfThings;

  displaySearchReults() {
    this.searchProductService.getSearchResult(this.searchItem).subscribe((res) => {
      console.log(res);
      let responseObj = <{items:SearchProducts[]}>res;
      this.displayResults = responseObj.items
      console.log(this.displayResults);
    })
  }
}
