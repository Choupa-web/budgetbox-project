import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../shared/interfaces';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {takeUntil} from 'rxjs/operators';
import {Subject, concat} from 'rxjs';
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
  totalRecords: number;

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

    // get total number of records
    this.getProductsList();
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
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }

  edit($event) {
    this.router.navigate(['/edit/'+$event]);
  }

  delete($event) {
    this.ps.deleteProduct($event).subscribe(
      result => {
        console.log("delete result: ", result);
        if(result == null) {
          this.message = "Produit supprimé avec succès";
          this.isSuccess= true;
          this.getProductsList();
        }
        else {
          this.message = "Problème rencontré lors de la suppression du produit";
          this.isSuccess = false;
        }
        this.isMessage = true;
      }
    )
  }

  getProductsList() {
      this.ps.getProducts().subscribe(
        data => {
          this.totalRecords = data.total;
          console.log("total Records: ", this.totalRecords);
          this.ps.getProducts(this.totalRecords).subscribe(
            fulldata => {
              this.productsList = fulldata.hits;
            });
        });
      /* TROUVER MEILLEUR SOLUTION  */
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
          this.getProductsList();
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
