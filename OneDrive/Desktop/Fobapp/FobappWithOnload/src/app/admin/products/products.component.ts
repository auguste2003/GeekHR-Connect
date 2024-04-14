import { CommonModule } from '@angular/common';
import { Component,OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product/product.service';
// Les comoposants sont standalone , donc il n'ya pas de AppModule.ts 
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
isSidePanelVisible: boolean = false;
productObj :any ={
  "productId":0,
  "productSku":"",
  "productBame":"",
  "productPrice":0,
  "productShortName":"",
  "productDescription":"",
  "createData":new Date(),
  "deliveryTimeSpan":"",
  "categoryId":0,
  "productImageUrl":""
}
// liste des differentes cathégories 
categoryList: any[] = [];
constructor(private productSrv:ProductService){

}
ngOnInit():void{

}
// recevoir toutes les cathegoreies 
getCategory(){
  this.productSrv.getCategory().subscribe((res:any)=>{
    this.categoryList = res.data;
  });
}
//ouvre la liste de prioduits 
openSidePanel(){
  this.isSidePanelVisible = true;
}
//ferme la liste de produits 
closeSidePanel(){
  this.isSidePanelVisible = false;
}

//save the datas 
onSave(){
  
}
}
