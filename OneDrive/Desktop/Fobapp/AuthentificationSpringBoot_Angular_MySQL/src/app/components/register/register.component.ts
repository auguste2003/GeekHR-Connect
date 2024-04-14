import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api'; // Importer le service pour montrer le message de validation 
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'] // Correction ici
})
export class RegisterComponent {
  registerForm: FormGroup;
 // displayDialog: boolean = false; // On initialise le dialog á false 
  constructor(private router: Router, private fb: FormBuilder, private messageService : MessageService) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    //  phone: new FormControl(''), // Aucun validateur n'est nécessaire ici
      phone: ['', [Validators.required, Validators.pattern("[0-9 ]{11}")]], // exemple pour un format de 10 chiffres
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });

  }

  get f() { return this.registerForm.controls; }

  register(): void {
    if (this.registerForm.valid) {
      this.messageService.add({severity:'success', summary: 'Inscription Réussie', detail: 'Vous êtes maintenant inscrit!'});
 
    //  this.displayDialog = true; // Affiche le dialogue
      this.router.navigate(['/login']);
    }
  }

  logout(): void {
    // Logique de déconnexion ici.
  }
}
