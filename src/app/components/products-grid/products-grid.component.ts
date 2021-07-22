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
  @Output() DeleteProduct: EventEmitter<number> = new EventEmitter<number>();

  //displayedColumns:string[] = ['id','name','scientificName'] ;
  columnsToDisplay: string[] = ['action1', 'action2','id','name','scientificName'];
  dataSource: MatTableDataSource<Product>;

  @ViewChild(MatPaginator) paginator: MatPaginator;


  productsList:Product[];
  //pageEvent: PageEvent;

  constructor(private ps:ProductsService) {  }

  ngAfterViewInit() {
    /* console.log("afterviewinit productlist: ", this.productsData); */
    this.dataSource.paginator = this.paginator; 
  }


  ngOnInit(): void {
   /* console.log("oninit productlist: ", this.productsData);
    this.dataSource = new MatTableDataSource<Product>(this.productsData);
    console.log("datasource: ", this.dataSource); */
  }

  ngOnChanges() {
    this.dataSource = new MatTableDataSource<Product>(this.productsData);
    this.dataSource.paginator = this.paginator;
    console.log("datasource: ", this.dataSource);
  }

  editProduct(element:Product) {
    this.EditProduct.emit(Number(element.id));
  }

  deleteProduct(id:number){
    this.DeleteProduct.emit(id);
  }

}
