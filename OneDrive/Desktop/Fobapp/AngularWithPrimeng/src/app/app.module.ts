import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { CarouselModule } from 'primeng/carousel';
import { BadgeModule } from 'primeng/badge';import { TagModule } from 'primeng/tag';
import { CarouselResponsiveDemoComponent } from './components/carousel-responsive-demo/carousel-responsive-demo.component';
@NgModule({
  declarations: [
    AppComponent,
    CarouselResponsiveDemoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    MenuModule,
    MenubarModule,
    CarouselModule,
    BadgeModule,
    TagModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
