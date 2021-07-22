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
  columnsToDisplay: string[] = ['actions','id','name','scientificName'];
  productsTotalNumber:number = 907;
  dataSource: MatTableDataSource<Product>;

  @ViewChild(MatPaginator) paginator: MatPaginator;


  productsList:Product[];
  //pageEvent: PageEvent;

  constructor(private ps:ProductsService) { 
    console.log("constructeur productlist: ", this.productsData);
  }

  ngAfterViewInit() {
    console.log("afterviewinit productlist: ", this.productsData);
    this.dataSource.paginator = this.paginator;
  }


  ngOnInit(): void {
    console.log("oninit productlist: ", this.productsData);
    this.dataSource = new MatTableDataSource<Product>(this.productsData);
    console.log("datasource: ", this.dataSource);
  }

  ngOnChanges() {
    this.productsList = this.productsData;
    console.log("onchange productlist: ", this.productsData);
  }

  handlePageEvent($event){
    console.log("paginator: ", $event);
    this.ps.getProducts().subscribe(
      data => {
        this.productsData = data.hits;
        console.log("products: ", this.productsData);
      }
    )
  }

  editProduct(element:Product) {
    console.log("element: ", element.id);
    this.EditProduct.emit(Number(element.id));
  }

  deleteProduct(id:number){
    console.log("delete id: ", id);
    this.DeleteProduct.emit(id);
  }

}
