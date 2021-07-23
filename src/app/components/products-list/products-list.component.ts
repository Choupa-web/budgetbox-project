import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../shared/interfaces';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  @Input() productsData: Product[];

  @Output() EditProduct: EventEmitter<number> = new EventEmitter<number>(); 
  @Output() DeleteProduct: EventEmitter<Product> = new EventEmitter<Product>();

  constructor(private ps:ProductsService) { }

  ngOnInit(): void {
  }

  editProduct(id:number) {
    this.EditProduct.emit(id);
  }

  deleteProduct(product: Product){
    this.DeleteProduct.emit(product);
  }

}
