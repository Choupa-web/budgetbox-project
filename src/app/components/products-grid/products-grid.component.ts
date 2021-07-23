import { Component, EventEmitter, Input, OnInit, Output, ViewChild, AfterViewInit, OnChanges } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Product } from '../../shared/interfaces';
import { ProductsService } from '../../services/products.service';


@Component({
  selector: 'app-products-grid',
  templateUrl: './products-grid.component.html',
  styleUrls: ['./products-grid.component.css']
})
export class ProductsGridComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() productsData: Product[];
  @Output() EditProduct: EventEmitter<number> = new EventEmitter<number>();
  @Output() DeleteProduct: EventEmitter<Product> = new EventEmitter<Product>();

  columnsToDisplay: string[] = ['action1','action2','id','name','scientificName'];
  dataSource: MatTableDataSource<Product>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  productsList:Product[];

  constructor(private ps:ProductsService) {  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator; 
  }


  ngOnInit(): void {
  }

  ngOnChanges() {
    this.dataSource = new MatTableDataSource<Product>(this.productsData);
    this.dataSource.paginator = this.paginator;
    console.log("datasource: ", this.dataSource);
  }

  editProduct(element:Product) {
    this.EditProduct.emit(Number(element.id));
  }

  deleteProduct(product:Product){
    this.DeleteProduct.emit(product);
  }

}
