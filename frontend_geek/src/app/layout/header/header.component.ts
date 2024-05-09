import { Component } from '@angular/core';
import {MenuItem} from "primeng/api";
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  public items: MenuItem[] = [
    {
      label: 'Employee',
      icon: 'pi pi-home'
    },
    {
      label: 'Company Organisation chart',
      icon: 'pi pi-th-large'
    }
  ];
}
