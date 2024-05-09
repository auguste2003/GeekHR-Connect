import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Employee} from "../models/employee";
//  Définir un service qui permettra de communiquer avec le backend 

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  // readonly : 
  private readonly apiUrl: string = "http://localhost:8080/employees";

  constructor(private http: HttpClient) { }

  public getAllEmployee(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiUrl}`);
  }
}
