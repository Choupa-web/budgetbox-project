import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../shared/interfaces';
import {takeUntil} from 'rxjs/operators';
import {Subject, concat} from 'rxjs';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit, OnDestroy {
  productToEdit:Product;
  updateProductForm:FormGroup;
  payload:Product;
  isValueChanged:boolean = false;
  destroyed = new Subject<void>();

  constructor(private router: Router, private route: ActivatedRoute, private ps: ProductsService, private fb:FormBuilder) { }

  ngOnInit(): void {
     this.getProductInfo(this.route.snapshot.params['id']);  
    
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }

  getProductInfo(id:number) {
    this.ps.getProductInfo(id).subscribe(
      data => {
        this.productToEdit = data;
        this.updateProductForm = this.fb.group({
          productName: [this.productToEdit.name],
          productScientificName: [this.productToEdit.scientificName],
        });
        this.updateProductForm.valueChanges.subscribe(
          value => {
            console.log("values: ", value);
            if(value.productName === this.productToEdit.name && value.productScientificName === this.productToEdit.scientificName){
              this.isValueChanged = false;
            }
            else if(value.productName != this.productToEdit.name || value.productScientificName != this.productToEdit.scientificName) { this.isValueChanged = true;}
          }
        ); 
      }
    );
  }

  onSubmitForm() {
    console.log("submitted: ", this.updateProductForm.value['productName']);
    this.payload = {
      id:this.productToEdit.id,
      name: this.updateProductForm.value['productName'],
      scientificName: this.updateProductForm.value['productScientificName'],
      groupId:this.productToEdit.groupId,
      subGroupId:this.productToEdit.subGroupId,
    };
    console.log("payload:", this.payload);
    this.ps.updateProduct(this.payload).subscribe(
      data => {
        console.log("update result: ", data);
        if(data) {
          this.router.navigate(['/']);
        }
      }
    );
  }

  backButton(){
    this.router.navigate(['/']);
  }



}
