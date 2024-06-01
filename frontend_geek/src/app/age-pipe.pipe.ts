import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'agePipe'
})
export class AgePipePipe implements PipeTransform {

  // On prend la langue actuelle en parametre 
  transform(birthDate:Date | string, lang:string='en'): string {
    const today :Date = new Date()
      const birth:Date = new Date(birthDate)
      let age:number = today.getFullYear() -birth.getFullYear() ;
      const m: number = today.getMonth()-birth.getMonth()
      if(m<0 || (m ==0 && today.getDate()< birth.getDate())){ // On récupere la data , la compare avec celle actulle et renvoit l'age de l'employée
       age --;
      }
switch(lang){
    case 'fr':
      return `${age} ans `;
      case 'de' : 
      return `${age} Jahre alt `;
      default :
      return `${age} years old `;
}
  }

}
