import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Observable, of, throwError } from 'rxjs';
import { Product } from '../shared/interfaces';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json", "Access-Control-Allow-Origin":"*" })
};

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private productsUrl:string = environment.apiUrl;
  private queryUrl:string;

  constructor(private http: HttpClient) { }

/**
 * Returns the list of products
 * @param id {number} number of products by page
 */
  getProducts(size?:number):Observable<any> {
    let productsPaginationSize = size ? "?size=" + size : "";
    if( size ) {
      this.queryUrl = this.productsUrl + productsPaginationSize;
    }
    else {
      this.queryUrl = this.productsUrl;
    }
    
    console.log("url:", this.queryUrl);
    return this.http.get(this.queryUrl, httpOptions).pipe(catchError(this.handlerror));
  }

  /**
  * Returns the information of a product
  * @param id {number} id of the product
  */
  getProductInfo(id:number):Observable<any>{
    this.queryUrl = this.productsUrl + id ;
    return this.http.get(this.queryUrl, httpOptions).pipe(catchError(this.handlerror));

  }

  /**
  * Update product information of one product
  * @param product{Product} all product info fields
  */
  updateProduct(product: Product) {
    this.queryUrl = this.productsUrl + product.id;
    return this.http.put(this.queryUrl,product).pipe(catchError(this.handlerror));
  }

  /**
  * Add new product
  * @param product {Product} all product info fields
  */
  addProduct(product:any) {
    return this.http.post(this.productsUrl,product).pipe(catchError(this.handlerror));
  }
 
  /**
  * Delete a product
  * @param id {number} all product info fields
  */
  deleteProduct(id:number){
    return this.http.delete(this.productsUrl + id).pipe(catchError(this.handlerror));

  }

  private handlerror<T>(error:string):  Observable<any>{
    console.log("my error: ",error);
    return of({ error: error, total:0, id:-1 });
  }


}
