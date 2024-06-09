import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import {MenuItem} from "primeng/api";
import { filter } from 'rxjs';
@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss'
})
export class BreadcrumbComponent implements OnInit{
// Ceci est un breadcrump . pour injecter le breadcrump de primengNG 



  public home: MenuItem = { icon: 'pi pi-home', routerLink: '/' };

  public breadcrumbItems: MenuItem[] = [{ label: 'Employee' }];

  constructor (private router : Router){

  }
  ngOnInit(): void {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(
      () => this.updateBreadcrumb()  
    )
  }

  private updateBreadcrumb() : void {
const url :string = this.router.url ; 
if(url === '/organisation'){
this.breadcrumbItems = [{label:'Organisation Chart'}]
}else if(url === '/'){
  this.breadcrumbItems =[{label : 'Employee'}]
}else{
  // Plus tard 
}
  }
}
