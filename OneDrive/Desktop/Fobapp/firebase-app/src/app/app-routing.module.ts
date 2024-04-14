import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import path from 'path';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
  {
    path :'', redirectTo : 'register' , pathMatch:'full'
  },
  {
    path: 'register', component :RegisterComponent
  },
  {
    path :'login', component : LoginComponent
  }
 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
