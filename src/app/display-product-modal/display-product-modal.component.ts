import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SearchProducts } from 'SearchProduct';
import { SearchProductsService } from '../search-products.service';

@Component({
  selector: 'app-display-product-modal',
  templateUrl: './display-product-modal.component.html',
  styleUrls: ['./display-product-modal.component.css']
})
export class DisplayProductModalComponent implements OnInit {

  constructor(public dialog: MatDialog, private getGenreService: SearchProductsService, public dialogRef: MatDialogRef<DisplayProductModalComponent>, @Inject(MAT_DIALOG_DATA)public data: string) { }

  selectedProducts!: SearchProducts;

  ngOnInit(): void {
  }

  onCloseDisplayProduct() {
    this.dialogRef.close('Confirm');
  }

}
