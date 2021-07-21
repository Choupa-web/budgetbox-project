import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../../shared/interfaces';
import { ProductsService } from '../../services/products.service';


@Component({
  selector: 'app-products-grid',
  templateUrl: './products-grid.component.html',
  styleUrls: ['./products-grid.component.css']
})
export class ProductsGridComponent implements OnInit {
  @Input() productsData: Product[];
  @Output() EditProduct: EventEmitter<number> = new EventEmitter<number>();

  displayedColumns:string[] = ['id','name','scientificName', 'groupId','subGroupId'] ;
  columnsToDisplay: string[] = this.displayedColumns.slice();
  productsTotalNumber:number = 907;
  pageIndex:number = 0;
  pageSize:string = "30";

  //pageEvent: PageEvent;

  constructor(private ps:ProductsService) { }


  ngOnInit(): void {
  }

  handlePageEvent($event){
    console.log("paginator: ", $event);
    this.ps.getProducts(this.pageSize, $event.pageIndex +1).subscribe(
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

}
