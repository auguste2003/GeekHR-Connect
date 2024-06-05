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
  public onDelete: EventEmitter<Employee> = new EventEmitter<Employee>();

  // L'évenement qui sera envoyé au parent pour la suppression d'un employé 
  @Output()
  public onEdit: EventEmitter<Employee> = new EventEmitter<Employee>();

  // Évenement qui sera envoyé au parent pour permetre de montrer un employé  
  @Output()
  public onShow: EventEmitter<Employee> = new EventEmitter<Employee>();


  public edit(employee: Employee) { // Lorsqu'on clique sur le boutton , on déclenche l'evenement 
    this.onEdit.emit(employee);
  }
  // Cette méthode joue le meme role que edit . Elle envoit l'employé au parent apres l'évenement 
  public delete(employee: Employee) {
    this.onDelete.emit(employee);
  }
  // Envoie de d'employé 
  public show(employee: Employee): void {
    this.onShow.emit(employee);
  }
}
