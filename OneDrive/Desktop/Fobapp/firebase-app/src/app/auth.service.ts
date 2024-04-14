import { Injectable, inject } from "@angular/core";
import { Auth, createUserWithEmailAndPassword, updateProfile } from "@angular/fire/auth";
import { response } from "express";
import { Observable, from } from "rxjs";

@Injectable({
    providedIn :'root'
})
export class AuthService{
    firebaseAuth = inject(Auth)
  // Einstellung von dem Register 
    register(email : string, userName:string, password:string):Observable<void>{
        // With angular/ fire 
        const promise = createUserWithEmailAndPassword(this.firebaseAuth,
            email,
            password,
            ).then((response) => 
            updateProfile(response.user,{displayName: userName  }),
            );
          return from(promise)
    }
}