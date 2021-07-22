import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Product } from '../shared/interfaces';

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json", "Access-Control-Allow-Origin":"*" })
};

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private productsUrl:string = "http://localhost:8080/products/v1.0/";
  private queryUrl:string;

  constructor(private http: HttpClient) { }

  getProducts(size?:number):Observable<any> {
    let productsPaginationSize = size ? "?size=" + size : "";
    if( size ) {
      this.queryUrl = this.productsUrl + productsPaginationSize;
    }
    else {
      this.queryUrl = this.productsUrl;
    }
    
    console.log("url:", this.queryUrl);
    return this.http.get(this.queryUrl, httpOptions);
  }

  getProductInfo(id:number):Observable<any>{
    this.queryUrl = this.productsUrl + id ;
    return this.http.get(this.queryUrl, httpOptions);

  }

  updateProduct(product: Product) {
    this.queryUrl = this.productsUrl + product.id;
    return this.http.put(this.queryUrl,product);
  }

  addProduct(product:any) {
    return this.http.post(this.productsUrl,product);
  }

  deleteProduct(id:number){
    return this.http.delete(this.productsUrl + id);

  }


}
