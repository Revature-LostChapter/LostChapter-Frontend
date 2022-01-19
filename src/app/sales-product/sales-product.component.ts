import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SearchProducts } from 'SearchProduct';
import { DisplayProductModalComponent } from '../display-product-modal/display-product-modal.component';
import { SearchProductsService } from '../search-products.service';

@Component({
  selector: 'app-sales-product',
  templateUrl: './sales-product.component.html',
  styleUrls: ['./sales-product.component.css']
})
export class SalesProductComponent implements OnInit {

  constructor(private getGenreService: SearchProductsService, public dialog: MatDialog) { }

  displayProducts: SearchProducts[] = [];
  selectedIndex: number = 1;
  selectedProducts!: SearchProducts;

  getBookBySales(){
    this.getGenreService.getBookBySales().subscribe((res) => {
      let body = <SearchProducts[]> res.body;
      this.displayProducts = body;
    })
  }

  dialogResult!: string;

  ngOnInit(): void {
    this.getBookBySales();
  }

  onDisplayProduct(bookId: number){
    let modalRef = this.dialog.open(DisplayProductModalComponent, {
      width: '800px',
      height: '600px',
      data: 'Book Information'
    });

      this.getGenreService.getBookById(bookId).subscribe((res) => {
          let responseObj = <SearchProducts>res.body;
          this.selectedProducts = responseObj

          let instance = modalRef.componentInstance;
          instance.selectedProducts = this.selectedProducts;

      });

    modalRef.afterClosed().subscribe(result => {
      this.dialogResult = result;
    });

  }

}
