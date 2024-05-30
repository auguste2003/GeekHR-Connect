import {AbstractControl, ValidationErrors} from "@angular/forms";



// Renvoyer des messages spécifiques pour la validation 
export function trimValidator(control: AbstractControl): ValidationErrors | null { // important pour eviter la validation des formulaire nuls 
  if(control.value && control.value.trim().length === 0){ // .trim() veux dire vide 
    return {trimValidator: true};
  }
  return null;
}

export function minAgeDateValidator(minAge: number) {  // obtenir l'age minimal et vérifier si l'age de l'employé respecte les normes 
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }

    const birthDate: Date = new Date(control.value);
    const currentDate: Date  = new Date();
    const diff: number = currentDate.getFullYear() - birthDate.getFullYear();
    const age: number = diff - (currentDate.getMonth() < birthDate.getMonth() || (currentDate.getMonth() === birthDate.getMonth() && currentDate.getDate() < birthDate.getDate()) ? 1 : 0);

    if (age < minAge) {
      return { minAgeDate: { requiredAge: minAge, actualAge: age } };
    }

    return null;
  };
}

export function maxAgeDateValidator(maxAge: number) {  // obtenir l'age minimal et vérifier si l'age de l'employé respecte les normes 
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }
  
      const birthDate: Date = new Date(control.value);
      const currentDate: Date  = new Date();
      const diff: number = currentDate.getFullYear() - birthDate.getFullYear();
      const age: number = diff - (currentDate.getMonth() < birthDate.getMonth() || (currentDate.getMonth() === birthDate.getMonth() && currentDate.getDate() < birthDate.getDate()) ? 1 : 0);
  
      if (age > maxAge) {
        return { maxAgeDate: { requiredAge: maxAge, actualAge: age } };
      }
  
      return null;
    };
  }