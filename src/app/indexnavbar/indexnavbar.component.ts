import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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


  ngOnInit(): void {
  }

  searchItem!: string;
  displayResults: SearchProducts[] = [];

  // for page pagination

  // p: number = 1;
  // collection: any[] = someArrayOfThings;

  displaySearchReults() {
    this.searchProductService.getSearchResult(this.searchItem).subscribe((res) => {
      let responseObj = <{results:SearchProducts[]}>res;
      const idx = Math.floor(Math.random() * responseObj.results.length); // randomize search results
      const newSearchResults = responseObj.results[idx]
      console.log(newSearchResults);
      // this.displayResults = newSearchResults;
    })
  }
}
