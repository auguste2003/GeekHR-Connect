import { Component } from '@angular/core';
import {MenuItem} from "primeng/api";
@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss'
})
export class BreadcrumbComponent {
  public items: MenuItem[] = [{ label: 'Employee' }];

  public home: MenuItem = { icon: 'pi pi-home', routerLink: '/' };
}
