import {Component, OnInit} from '@angular/core';
import {MessageService, TreeNode} from "primeng/api";
import {EmployeeService} from "../../services/employee.service";
import {Employee} from "../../models/employee";
import {take} from "rxjs";
import {Position} from "../../enums/position";
import {UUID} from "../../types/uuid";

@Component({
  selector: 'app-organization-chart',
  templateUrl: './organization-chart.component.html',
  styleUrl: './organization-chart.component.scss'
})
export class OrganizationChartComponent implements OnInit {
  selectedNodes!: TreeNode[];
  data: TreeNode[] = [];

  constructor(private employeeService: EmployeeService,
              private messageService: MessageService) {}


  ngOnInit(): void {
    this.updateOrganizationChart();
  }

  updateOrganizationChart(): void {
    this.employeeService.getAllEmployee().pipe(take(1)).subscribe({
      next: (employees: Employee[]): void => {
        this.data = this.transformToTreeNodes(employees);
      },
      error: (): void => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Unable to load data. Please try again later.'
        });
      }
    })
  }

  public transformToTreeNodes(employees: Employee[]): TreeNode[] {
    const employeeMap = new Map<string, TreeNode>(); // Prend chaque fois des uid qui seront les id de nos collaborateurs et un array du treenode 

    employees.forEach(emp => {
      employeeMap.set(emp.id as UUID, { // le but est de remplir notre map 
        expanded: true,  // Le contenu corespondant 
        type: 'person',
        data: {
          image: emp.imageURL,
          name: `${emp.firstName} ${emp.lastName}`,
          title: emp.position
        },
        children: []
      })
    });

    const rootNodes: TreeNode[] = [];

    employees.forEach(emp => {
      const node = employeeMap.get(emp.id as UUID);
      if(node){
        switch (emp.position){  // Si on trouve le CEO , On L'ajoute en haut 
          case Position.CEO:
            rootNodes.push(node);
            break;
          case Position.Director: // et on met ensuite les  directeurs 
            rootNodes.forEach(ceoNode => {
              if (ceoNode.data.title === Position.CEO) {
                ceoNode.children?.push(node);
              }
            });
            break;
          case Position.ProjectManager: // On ajoute les projets manager 
            rootNodes.forEach(ceoNode => {
              ceoNode.children?.forEach(directorNode => {
                if (directorNode.data.title === Position.Director) {
                  directorNode.children?.push(node);
                }
              });
            })
            break;
          case Position.Developer:
          case Position.SystemAnalyst:
          case Position.ITSupport:
          case Position.NetworkEngineer:
            rootNodes.forEach(ceoNode => {
              ceoNode.children?.forEach(directorNode => {
                directorNode.children?.forEach(pmNode => {
                  if (pmNode.data.title === Position.ProjectManager) {
                    pmNode.children?.push(node);
                  }
                });
              });
            });
            break;
          default:
            break;
        }
      }
    })

    return rootNodes;
  }



}