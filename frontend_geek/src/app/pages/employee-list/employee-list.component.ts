import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {EmployeeService} from "../../services/employee.service";
import {Observable, of, startWith, Subscription, take} from "rxjs";
import {Employee} from "../../models/employee";
import {MenuItem, MessageService} from "primeng/api";
import {FormControl} from "@angular/forms";

import {UUID} from "../../types/uuid";
import { EmployeeSearch } from '../../types/employee-search';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss'
})
export class EmployeeListComponent implements OnInit, OnDestroy{

  //1)private employeeService: EmployeeService = inject(EmployeeService);

  public filteredEmployees$!: Observable<Employee[]>;
  public employeeSearchTextPlaceholder: string = "Search by Name...";
  public noEmployeeFound: string = 'no Employees found';
  public loadingMessage: string = 'Loading...';
  public searchControl: FormControl<string> = new FormControl();
  /**
   * 
   */
  public menuItems: MenuItem[] = [
    // Ceci est un item qui presente toutes les possibilités pour l'utilisateur de selectionner un employée 
    {
      //Message qui s'affiche dans le input 
      label: 'Search by Name',
      command: (): void =>{
        this.employeeSearchTextPlaceholder="Search by Name..."
        this.employeeSearch='SearchByName'
        this.filterEmployees()
      }
    },
    {
      label: 'Search by Location',
      command: (): void =>{
        this.employeeSearchTextPlaceholder="Search by Location..."
        this.employeeSearch='SearchByLocation'
        this.filterEmployees()

      }
    },
    {
      label: 'Search by Position',
      command: (): void =>{
        this.employeeSearchTextPlaceholder="Search by Position..."
        this.employeeSearch='SearchByPosition'
        this.filterEmployees() // lorsqu'on clique , on initialise le champ 
      }
    }
  ];

  private employeeSearch: EmployeeSearch = 'SearchByName';
  private currentSearchText: string = "";
  private employees!: Employee[];
  private subscription: Subscription = new Subscription();

  constructor(private employeeService: EmployeeService,
              private messageService: MessageService) {}

  ngOnInit(): void {
    this.getAllEmployee();
    this.setupFilteredEmployees();
  }

  ngOnDestroy(): void { // Arréter la soubscription lorsque le composant est détruit .
    this.subscription.unsubscribe();
  }

  public trackById(index: number, item: Employee): UUID | undefined {
    return item.id;
  }

  private getAllEmployee(): void{
    this.employeeService.getAllEmployee().pipe(take(1)).subscribe({
      next: (data: Employee[]): void => {
        this.employees = data;
        this.filterEmployees();
      },
      error: (): void =>{
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Unable to load data. Please try again later.' });
      }
    })
  }

  private setupFilteredEmployees(): void {
    this.subscription.add(
      this.searchControl.valueChanges
        .pipe(startWith('')) // Onactuallise la valeur choisie par l'utilisateur 
        .subscribe((text: string): void => {// filtrer les expace inutiles 
          this.currentSearchText = text.trim(); // Récupere la valeur du texte entrée
          this.filterEmployees();
        })
    );
  }

  private filterEmployees(): void { // Filtrer les différents employés 
    const filtered: Employee[] = this.employees?.filter((employee: Employee): boolean => { // Filtrer les différents employées 
      if(this.employeeSearch==='SearchByName'){ // Filtre en fonction du nom 
        return employee.firstName.toLowerCase().includes(this.currentSearchText.toLowerCase()) ||
          employee.lastName.toLowerCase().includes(this.currentSearchText.toLowerCase());
      }else if(this.employeeSearch==='SearchByPosition'){ // Filtre la position 
        return employee.position.toLowerCase().includes(this.currentSearchText.toLowerCase());

      }else if(this.employeeSearch==='SearchByLocation'){ // Filtrer en fonction de la location 
        return employee.country.toLowerCase().includes(this.currentSearchText.toLowerCase()) || // filtre le pays ou la ville 
          employee.city.toLowerCase().includes(this.currentSearchText.toLowerCase());
      }else{
        return false;
      }
    });
    this.filteredEmployees$ = of(filtered); // Transformer des données en observables 
  }






}