import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../shared/interfaces';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';

interface newProduct  {
  name:string;
  scientificName:string;
  groupId:string;
  subGroupId:string;
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

  productsList:Product[];
  addProductForm: FormGroup;
  showAddForm:boolean = false;
  payload:newProduct;
  message:string ='';
  isMessage:boolean = false;
  isSuccess:boolean;
  isValues: boolean = false;

  displayNameMap = new Map([
    [Breakpoints.XSmall, 'XSmall'],
    [Breakpoints.Small, 'Small'],
    [Breakpoints.Medium, 'Medium'],
    [Breakpoints.Large, 'Large'],
    [Breakpoints.XLarge, 'XLarge'],
  ]);

  destroyed = new Subject<void>();
  currentScreenSize: string;
  screenIsBig:boolean = true;
  screenIsSmall:boolean = false;

  constructor(private ps: ProductsService, breakpointObserver: BreakpointObserver, private router:Router, private fb:FormBuilder){ 
    breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge,
    ]).pipe(takeUntil(this.destroyed)).subscribe(result => {
        for (const query of Object.keys(result.breakpoints)) {
          if (result.breakpoints[query]) {
            this.currentScreenSize = this.displayNameMap.get(query) ?? 'Unknown';
            if(this.currentScreenSize === "XLarge" || this.currentScreenSize === "Large" || this.currentScreenSize === "Medium") {
              this.screenIsBig = true;
            }
            else if(this.currentScreenSize === "Small" || this.currentScreenSize === "XSmall" ) {
              this.screenIsBig = false;
            }
            this.screenIsSmall = !this.screenIsBig;
          }
        }
    });
   }

  ngOnInit(): void {
    this.getProductsList("30",1);
    this.addProductForm = this.fb.group({
      productName: [''],
      productScientificName:[''],
    });

    this.addProductForm.valueChanges.subscribe(
      data => {
        if(data.productName != '' && data.productScientificName !='') {
          this.isValues = true;
        }
        else if(data.productName == '' || data.productScientificName =='') { this.isValues = false;}
      }
    );
    //console.log("current size:", this.currentScreenSize);
   
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }

  edit($event) {
    this.router.navigate(['/edit/'+$event]);
  }

  getProductsList(size?:string, page?:number) {
    this.ps.getProducts(size,page).subscribe(
      data => {
        this.productsList = data.hits;
        console.log("products: ", this.productsList);
      }
    );
  }

  addButton(){
    this.showAddForm = !this.showAddForm;
  }

  onSubmitAddForm(){
    // Recuperation des infos du formulaire
    this.payload = {
      name: this.addProductForm.value['productName'],
      scientificName: this.addProductForm.value['productScientificName'],
      groupId:"136",
      subGroupId:"137"
    };
    this.ps.addProduct(this.payload).subscribe(
      data => {
        if(data) {
          this.message = "Produit ajouté avec succes";
          this.isSuccess = true;
        }
        else {
          this.message = "Erreur de lors de l'ajout du produit";
          this.isSuccess = false;
        }
        this.isMessage = true;
      }
    );
  }

}
