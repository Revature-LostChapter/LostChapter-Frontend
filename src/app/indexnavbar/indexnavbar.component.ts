import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Output( "searchProduct") searchProductEmitter = new EventEmitter<SearchProducts[]>()

  // for page pagination
  // p: number = 1;
  // collection: any[] = someArrayOfThings;

  displaySearchReults() {
    console.log(this.searchItem);
    this.searchProductService.getSearchResult(this.searchItem).subscribe((res) => {
      let body = <SearchProducts[]> res.body;
      console.log(body)
      this.searchProductEmitter.emit(body);

    })
  }
}
