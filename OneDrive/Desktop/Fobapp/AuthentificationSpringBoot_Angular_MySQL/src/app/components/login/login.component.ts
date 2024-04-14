import { Component } from '@angular/core';
import {Router} from '@angular/router'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  username!: string;
  password!: string;
  onchangePassword: boolean = false;
userMail :string = "" 
constructor(private router: Router){

}
  login(): void {
    this.router.navigate(['/register']);
   
  }
    // Pour ouvrir l'espace permettant de changer le mot de passe .
showResetForm(){
  this.onchangePassword = true ;
}
  async resePasswort(email: string){
   
    }

}
