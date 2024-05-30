import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService { // un service de validation des erreurs pour les formulaires 

  constructor() { }

  public getErrorMessage(formControl: AbstractControl | null): string {
    if(!formControl){ // si le formcontrol n'est pas encore défini 
      return '';
    }

    const errors: ValidationErrors | null= formControl.errors;
    if(!errors){
      return '';
    }

    if(errors['email']){ // si L'erreur est l'email 
      return 'Please enter a valid email';
    }

    if(errors['required']){ // l'erreur est réquis
      return 'This field is required.';
    }

    if (errors['min']) { // une valeur minima 
      return `The minimum value is ${errors['min'].min}.`;
    }

    if (errors['max']) { // une valeur maximale 
      return `The maximum value is ${errors['max'].max}.`;
    }

    if (errors['trimValidator']) {
      return 'Please enter a valid value. Leading and trailing spaces are not allowed.';
    }

    if (errors['minAgeDate']) {
      return `You must be at least ${errors['minAgeDate'].requiredAge} years old. Current age: ${errors['minAgeDate'].actualAge}.`;
    }
    if (errors['maxAgeDate']) {
      return `You must be at least ${errors['maxAgeDate'].requiredAge} years old. Current age: ${errors['maxAgeDate'].actualAge}.`;
    }

    return 'Invalid input.';
  }
}
