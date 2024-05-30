import {Component, computed, inject, OnDestroy, OnInit, Signal, signal, WritableSignal} from '@angular/core';
import {EmployeeService} from "../../services/employee.service";
import {Observable, of, startWith, Subscription, take} from "rxjs";
import {Employee} from "../../models/employee";
import {MenuItem, MessageService} from "primeng/api";
import {FormControl, FormGroup, Validators} from "@angular/forms";

import {UUID} from "../../types/uuid";
import { EmployeeSearch } from '../../types/employee-search';
import { maxAgeDateValidator, minAgeDateValidator, trimValidator } from '../../utils/custom-validator';
import { getLocalISOTimeString } from '../../utils/utils';

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

//  public counter:WritableSignal<number> = signal(0);   // utilisaer pour changer les valluer d'une variable en temp réel 

//  derivedCounter:Signal<number> = computed(()=>{
//   return this.counter()*10 ; 
//  })
//   public increment(){
//    this.counter.set(this.counter()+1); 
//   } 
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

  public genderOptions = [
    { label: 'Men', value: 'men' },
    { label: 'Women', value: 'women' }
  ];

  public positionOptions = [
    { label: 'CEO', value: 'CEO' },
    { label: 'Director', value: 'Director' },
    { label: 'Project Manager', value: 'ProjectManager' },
    { label: 'Developer', value: 'Developer' },
    { label: 'System Analyst', value: 'SystemAnalyst' },
    { label: 'IT Support', value: 'ITSupport' },
    { label: 'Network Engineer', value: 'NetworkEngineer' }
  ];

  public employeeForm!: FormGroup;
  public isSubmitButtonOn: boolean = false;

  public dialogTitle: string = "Creating an employee";
  public isEmployeeDialogOn: boolean = false;

  private employeeSearch: EmployeeSearch = 'SearchByName';
  private currentSearchText: string = "";
  private employees!: Employee[];
  private subscription: Subscription = new Subscription();

  constructor(private employeeService: EmployeeService,
              private messageService: MessageService) {}

              ngOnInit(): void {
                this.initializeForm();
                this.getAllEmployee();
                this.setupFilteredEmployees();
              }
            

  ngOnDestroy(): void { // Arréter la soubscription lorsque le composant est détruit .
    this.subscription.unsubscribe();
  }

  public showDialogForAddEmployee(){  // Montrer le dialogue pour l'ajout des employés 
    this.isEmployeeDialogOn = true;
  }

  public onSubmit(){ // Submission des donnees du formulaire 
    if(!this.employeeForm.valid){
      this.employeeForm.markAsTouched(); // Avec un unique formulaire qui peut etre marqué comme toucher 
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Form is invalid' });
    }else{
      this.isSubmitButtonOn = true;
      this.createEmployee();
    }
  }

  private initializeForm(): void{  // initialiser le formulaire en utilisant   validations 
    this.employeeForm = new FormGroup({
      gender: new FormControl(null, [Validators.required, trimValidator]),
      firstName: new FormControl('', [Validators.required, trimValidator]), // Ces validateurs sont des validateurs spécifiques pours créer des composants 
      lastName: new FormControl('', [Validators.required, trimValidator]),
      email: new FormControl('', [trimValidator, Validators.required, Validators.email] ),
      phone: new FormControl('', [Validators.required, trimValidator] ),
      dateOfBirth: new FormControl('', [Validators.required, minAgeDateValidator(18),maxAgeDateValidator(70)], ),
      city: new FormControl('', [Validators.required, trimValidator]),
      country: new FormControl('', [Validators.required, trimValidator]),
      remainingVacationDays: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(30)]),
      onVacation: new FormControl(false),
      position: new FormControl(null, [Validators.required, trimValidator])
    });
  }

  private createEmployee(): void{
    this.employeeService.createEmployee(
      {...this.employeeForm.value, dateOfBirth: getLocalISOTimeString(this.employeeForm.value.dateOfBirth)} // Copie inegralle des données et changer uniquement la date 
    ).pipe(take(1)).subscribe({
      next: (result: Employee): void =>{
        result.imageURL = `https://randomuser.me/api/portraits/${result.gender}/${this.employees.length}.jpg` // Ajouter l'image á l'employé crée car l'image n'est pas spécifié en backend 
        this.isSubmitButtonOn = false; // Arreter le submitbutton 
        this.isEmployeeDialogOn = false; // arrater öe button du dialogue 
        this.employees.unshift(result);// Ajouter 
        this.filteredEmployees$ = of(this.employees);
        this.employeeForm.reset();
        this.messageService.add({severity: 'success', summary: 'Create Employee '+result.firstName+' successfully', detail: 'Create Employee successfully'})
      },
      error: (): void=>{
        this.isSubmitButtonOn = false; // C'est lorsque le traitement est finit qu'on actualise le button 
        this.messageService.add({severity: 'error', summary: 'Create Employee error', detail: 'Create Employee error'});
      }
    })
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