import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BreadcrumbComponent } from './layout/breadcrumb/breadcrumb.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { DividerModule } from 'primeng/divider';
import {TagModule} from "primeng/tag";
import { ToastModule } from 'primeng/toast';
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule, provideHttpClient, withFetch} from "@angular/common/http";
import { EmployeeListComponent } from './pages/employee-list/employee-list.component';
import { AgePipePipe } from './age-pipe.pipe';
import { MenuModule } from 'primeng/menu';
import { EmployeeItemComponent } from './pages/employee-list/employee-item/employee-item.component';
import {ReactiveFormsModule} from "@angular/forms";
import {ConfirmationService, MessageService} from "primeng/api";
import { ErrorMessagesComponent } from './shared/error-messages/error-messages.component';
import {DropdownModule} from "primeng/dropdown";
import {InputSwitchModule} from "primeng/inputswitch";
import { DialogModule } from 'primeng/dialog';
import {ConfirmDialogModule} from "primeng/confirmdialog";
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BreadcrumbComponent,
    FooterComponent,
    EmployeeListComponent,
    AgePipePipe,
    EmployeeItemComponent,
    ErrorMessagesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ButtonModule,
    MenubarModule,
    BreadcrumbModule,
    DividerModule,
    InputTextModule,
    TagModule,
    HttpClientModule,
    MenuModule,
    ReactiveFormsModule,
    ToastModule,
    DialogModule,
    DropdownModule,
    InputSwitchModule,
    ConfirmDialogModule
  ],
  providers: [
    provideHttpClient(withFetch()),
    MessageService,
    ConfirmationService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
