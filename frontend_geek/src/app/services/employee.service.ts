import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Employee} from "../models/employee";
import { UUID } from 'crypto';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private readonly apiUrl: string = "http://localhost:8080/employees";

  constructor(private http: HttpClient) { }
// entrer dans la réquette avec un pipe() et on y utilise un map() 
  public getAllEmployee(): Observable<Employee[]> { // Quel est le role de la map () ? 
    return this.http.get<Employee[]>(`${this.apiUrl}`).pipe(
      map((employees: Employee[]) => this.transformEmployees(employees))
    );
  }

  private transformEmployees(employees: Employee[]): Employee[] {
    return employees.map(
      (employee: Employee, index: number)=> this.transformEmployee(employee, index)
    )
  }

  private transformEmployee(employee: Employee, index: number): Employee {
    return {
      ...employee, // Copie conforme de l'employé 
      imageURL: `https://randomuser.me/api/portraits/${employee.gender}/${index}.jpg`
    }
  }

  // On doit faire le update d'un employé 
  public updateEmployee(id: UUID, employee: Employee): Observable<Employee>{
    return this.http.put<Employee>(`${this.apiUrl}/${id}`, employee);
  }

  // Supression d'un employé 
  public deleteEmployee(id: UUID): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }


  public createEmployee(employee: Employee): Observable<Employee>{
    return this.http.post<Employee>(`${this.apiUrl}`, employee);
  }  // Créer des employées 
}