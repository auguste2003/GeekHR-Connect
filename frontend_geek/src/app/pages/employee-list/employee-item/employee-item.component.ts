import {Component, EventEmitter, Input, Output} from '@angular/core';
import { Employee } from '../../../models/employee';
import { Position } from '../../../enums/position';

@Component({
  selector: 'app-employee-item',
  templateUrl: './employee-item.component.html',
  styleUrl: './employee-item.component.scss'
})
export class EmployeeItemComponent {
  // L'employée est comme un fils et la liste des employés est le pere et cela permet justement d'utiliser un carte employé comme enfant 
  @Input()
  public employee!: Employee;


  
  @Output()
  public onEdit: EventEmitter<Employee> = new EventEmitter<Employee>();

  public edit(employee: Employee) { // Lorsqu'on clique sur le boutton , on déclenche l'evenement 
    this.onEdit.emit(employee);
  }
}
