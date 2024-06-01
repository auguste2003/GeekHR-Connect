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
import {MessageService} from "primeng/api";
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BreadcrumbComponent,
    FooterComponent,
    EmployeeListComponent,
    AgePipePipe,
    EmployeeItemComponent
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
    ToastModule
  ],
  providers: [
    provideHttpClient(withFetch()),
    MessageService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
