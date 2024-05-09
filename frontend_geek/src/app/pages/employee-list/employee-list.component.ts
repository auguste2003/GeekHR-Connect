import {Component, OnInit} from '@angular/core';
import {EmployeeService} from "../../services/employee.service";
import {take} from "rxjs";
import {Employee} from "../../models/employee";

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss'
})
//  Ce composant récupere les différents employés 
export class EmployeeListComponent implements OnInit{

  public employees: Employee[] = [];

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.getAllEmployee();
  }
// Souscription pour récupérer les employés dans l'observable , pipe() dit d'annuler l'abonnement apres la récupération 
  private getAllEmployee(): void{
    this.employeeService.getAllEmployee().pipe(take(1)).subscribe({
      next: (data: Employee[]): void => {
        this.employees = data;
      }
    })
  }


}