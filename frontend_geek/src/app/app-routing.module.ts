import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './pages/employee-list/employee-list.component';
import { OrganizationChartComponent } from './pages/organization-chart/organization-chart.component';

const routes: Routes = [

{
  path: '' , component: EmployeeListComponent
},
{
  path:'organisation', component: OrganizationChartComponent
},
{path: '**',component :EmployeeListComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
