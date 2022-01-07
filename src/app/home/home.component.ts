import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { SearchProducts } from 'SearchProduct';
import { DisplayProductModalComponent } from '../display-product-modal/display-product-modal.component';
import { LoginService } from '../login.service';
import { SearchProductsService } from '../search-products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private loginService: LoginService, private getGenreService: SearchProductsService,
    private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getGenreById(2)
  }

  displayProducts: SearchProducts[] = [];
  selectedIndex: number = 1;

  @Output( "displayProducts") searchProductEmitter = new EventEmitter<SearchProducts[]>()

  // bookId!: number;
  dialogResult!: string;


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

  onDisplayProduct(bookId: number){
    let modalRef = this.dialog.open(DisplayProductModalComponent, {
      width: '1200px',
      height: '600px',
      data: 'Book Information'
    });

    this.getGenreService.getBookById(bookId).subscribe((res) => {
      let responseObj = <SearchProducts[]><unknown>res;
       this.searchProductEmitter.emit(responseObj)

    });

    modalRef.afterClosed().subscribe(result => {
      this.dialogResult = result;
    });

  }

  showResults: SearchProducts[] = [];
  setShowResults(showResults: SearchProducts[]) {
    this.showResults = showResults;
  }
}


