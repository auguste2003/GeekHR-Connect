import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';


import { provideHttpClient } from '@angular/common/http';
import { routes } from './app-routing.module';


export const firebaseConfig = {
    apiKey: "AIzaSyATMmram-XDcQLyJPlrsgjd_GM4gSo43t8",
    authDomain: "angular-firebase-app-dbe4d.firebaseapp.com",
    projectId: "angular-firebase-app-dbe4d",
    storageBucket: "angular-firebase-app-dbe4d.appspot.com",
    messagingSenderId: "820737394505",
    appId: "1:820737394505:web:6e033a6583954abfeafc98"
  };
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), 
    provideHttpClient(),
   
],
  
};