// src/app/auth.service.ts
import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth) { }

  // Benutzer registrieren
  async register(email: string, password: string) {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      console.log('Registrierung erfolgreich', userCredential);
      // Zusätzliche Aktionen nach der Registrierung, z.B. Weiterleitung
    } catch (error) {
      console.error('Registrierungsfehler', error);
    }
  }

  // Benutzer anmelden
  async login(email: string, password: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      console.log('Anmeldung erfolgreich', userCredential);
      // Zusätzliche Aktionen nach der Anmeldung, z.B. Weiterleitung
    } catch (error) {
      console.error('Anmeldefehler', error);
    }
  }

  // Benutzer abmelden
  async logout() {
    try {
      await signOut(this.auth);
      console.log('Abmeldung erfolgreich');
      // Zusätzliche Aktionen nach der Abmeldung
    } catch (error) {
      console.error('Abmeldefehler', error);
    }
  }
}
