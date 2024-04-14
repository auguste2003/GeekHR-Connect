import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
// Neue Importe für AngularFire
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component'; // Stelle sicher, dass du deine Komponenten richtig importierst
import { RegisterComponent } from './register/register.component';
import { ServiceWorkerModule } from '@angular/service-worker'; // Stelle sicher, dass du deine Komponenten richtig importierst
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent, // Und hier deklarieren wir LoginComponent
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)), // firebase initialisieren 
    provideAuth(() => getAuth()), // Autentifizierungseinstellungen bereitstellen 
    FormsModule, ServiceWorkerModule.register('ngsw-worker.js', {
  enabled: !isDevMode(),
  // Register the ServiceWorker as soon as the application is stable
  // or after 30 seconds (whichever comes first).
  registrationStrategy: 'registerWhenStable:30000'
})
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
