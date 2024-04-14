import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import{FormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog'; // Module de dialogue de primeng 
import { ToastModule } from 'primeng/toast'; // Pour faire des alertes primeng 
import { MessageService } from 'primeng/api'; 
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
ButtonModule,
InputTextModule,
FormsModule,
BrowserAnimationsModule,
ReactiveFormsModule,
DialogModule,
ToastModule
  ],
  providers: [
    provideClientHydration(),
    MessageService // Ajouter le service au niveau du provider 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
