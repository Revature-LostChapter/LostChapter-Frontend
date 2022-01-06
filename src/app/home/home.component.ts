import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { SearchProducts } from 'SearchProduct';
import { LoginService } from '../login.service';
import { SearchProductsService } from '../search-products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private loginService: LoginService, private getGenreService: SearchProductsService) { }

  ngOnInit(): void {
    this.getGenreById(2)
  }

  displayProducts: SearchProducts[] = [];
  selectedIndex: number = 1;

  getSelectedIndex(): number {
    return this.getGenreService.currentTabIndex
  }

  onTabChange(event: MatTabChangeEvent){
    this.selectedIndex = event.index + 1;
  }

  getGenreById(genreId: number) {
    this.getGenreService.getSearchByGenre(genreId).subscribe((res) => {
      let body = <SearchProducts[]> res.body;
      this.displayProducts = body
    })
  }

}


