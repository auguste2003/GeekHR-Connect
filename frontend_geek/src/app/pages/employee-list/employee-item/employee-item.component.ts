import { Component, Input } from '@angular/core';
import { Employee } from '../../../models/employee';
import { Position } from '../../../enums/position';

@Component({
  selector: 'app-employee-item',
  templateUrl: './employee-item.component.html',
  styleUrl: './employee-item.component.scss'
})
export class EmployeeItemComponent {
  
  @Input()
  public employee!: Employee;
}
