import {Component, computed, inject, OnDestroy, OnInit, Signal, signal, WritableSignal} from '@angular/core';
import {EmployeeService} from "../../services/employee.service";
import {Observable, of, startWith, Subscription, take} from "rxjs";
import {Employee} from "../../models/employee";
import {ConfirmationService, MenuItem, MessageService} from "primeng/api";
import {FormControl, FormGroup, Validators} from "@angular/forms";

import {UUID} from "../../types/uuid";
import { EmployeeSearch } from '../../types/employee-search';
import { maxAgeDateValidator, minAgeDateValidator, trimValidator } from '../../utils/custom-validator';
import {  formatDate, getLocalISOTimeString } from '../../utils/utils';


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

   // Options pour le formulaire
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

  // Propriétés pour le dialogue
  public dialogTitle: string = "Creating an employee";
  public isEmployeeDialogOn: boolean = false;

  private employeeSearch: EmployeeSearch = 'SearchByName';
  private currentSearchText: string = "";
  private employees!: Employee[];
  private subscription: Subscription = new Subscription();

  constructor(private employeeService: EmployeeService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService) {}
 /**
   * Méthode ngOnInit
   * Appelée lors de l'initialisation du composant
   * Initialise le formulaire, récupère tous les employés et configure le filtrage
   */
 ngOnInit(): void {
  this.initializeForm();
  this.getAllEmployee();
  this.setupFilteredEmployees();
}          
            
 /**
   * Méthode ngOnDestroy
   * Appelée lorsque le composant est détruit
   * Désinscrit les abonnements pour éviter les fuites de mémoire
   */
  ngOnDestroy(): void { // Arréter la soubscription lorsque le composant est détruit .
    this.subscription.unsubscribe();
  }


  /**
   * Affiche le dialogue pour ajouter un employé
   */
  public showDialogForAddEmployee(){  // Montrer le dialogue pour l'ajout des employés 
    this.isEmployeeDialogOn = true;
  }


  /**
   * Soumet le formulaire pour ajouter un nouvel employé
   * Vérifie la validité du formulaire et appelle la méthode pour créer l'employé
   */
  public onSubmit(){
    if(!this.employeeForm.valid){
      this.employeeForm.markAllAsTouched();
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Form is invalid' });
    }else{
      this.isSubmitButtonOn = true;
      if(this.employeeForm.value.id){
        this.updateEmployee();
      }else{
        this.createEmployee();
      }
    }
  }


  /**
   * Initialise le formulaire avec des validateurs personnalisés
   */
  private initializeForm(): void{  // initialiser le formulaire en utilisant   validations 
    this.employeeForm = new FormGroup({
      id: new FormControl(null),
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

  /**
   * Crée un nouvel employé en utilisant le service EmployeeService
   * Met à jour la liste des employés et affiche un message de succès ou d'erreur
   */
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

// La methode initialise les employés 
  private updateEmployee(): void{
    this.employeeService.updateEmployee(
      this.employeeForm.value.id,
      {...this.employeeForm.value, dateOfBirth: getLocalISOTimeString(this.employeeForm.value.dateOfBirth)}
    ).pipe(take(1)).subscribe({
      next: (result: Employee): void =>{
        this.employees = this.employees.map((employee: Employee, index: number): Employee =>{
          if(employee.id===result.id){ // Au cas oú on trouve l'employé 
            result.imageURL = `https://afrogeek.fr/assets/img/hrconnect/${result.gender}/${index}.jpg`;
            return result;
          }else{
            return employee;
          }
        });
        this.filteredEmployees$ = of(this.employees);
        this.isSubmitButtonOn = false;
        this.isEmployeeDialogOn = false;
        this.messageService.add({severity: 'success', summary: 'Update Employee '+result.firstName+' successfully', detail: 'Update Employee successfully'})
      },
      error: (): void=>{
        this.isSubmitButtonOn = false;
        this.messageService.add({severity: 'error', summary: 'Update Employee error', detail: 'Update Employee error'});
      }
    })
  }

  // Boutton de supression d'un employé 
  public deleteEmployee(employee: Employee){
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete the Employee '+employee.firstName +' ?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon:"none",
      rejectIcon:"none",
      rejectButtonStyleClass:"p-button-text",
      accept: (): void => { // si l'uilisateur acepter qu'il veut suprimer 
        this.employeeService.deleteEmployee(employee.id as UUID).pipe(take(1)).subscribe({ // On renvoit le id au beackend pour la supression 
          next: (): void =>{ // Spécifer l'intension 
            this.messageService.add({severity: 'success', summary: 'Delete Employee '+employee.firstName+' successfully', detail: 'Delete Employee successfully'});
            this.employees = this.employees.filter((val: Employee): boolean => val.id !== employee.id); // Filtrer les valeur et retirer l'employé actuel
            this.filteredEmployees$ = of(this.employees); // recevoir les employés actuels , ,, Of réactualise la liste 
                    },
          error: (): void => { // renvoyer une erreur en cas d'érreur 
            this.messageService.add({severity: 'error', summary: 'Delete Employee '+employee.firstName+' error', detail: 'Delete Employee error'})
          }});
      }
    });
  }
 
    /**
   * Méthode utilisée pour suivre les employés par leur identifiant unique
   */
  public trackById(index: number, item: Employee): UUID | undefined {
    return item.id;
  }

   /**
   * Récupère tous les employés en utilisant le service EmployeeService
   * Met à jour la liste des employés et filtre les employés
   */
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

   /**
   * Configure le filtrage des employés en fonction des changements de valeur du champ de recherche
   */
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
/**
   * Filtre les employés en fonction du texte de recherche actuel et du critère de recherche sélectionné
   */
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



public openAddDialog(){
    this.employeeForm.reset();
    this.isEmployeeDialogOn = true;
  }


  // Ouverture du dialogue pour le update de l'employé 
  public openEditDialog(employee: Employee): void {
    this.dialogTitle = "Updating employee "+employee.firstName;
    this.isEmployeeDialogOn = true;
    this.employeeForm.patchValue({
      ...employee,
      dateOfBirth: formatDate(employee.dateOfBirth),
    });
  }




}