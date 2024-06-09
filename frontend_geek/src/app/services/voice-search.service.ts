// src/app/services/voice-search.service.ts
import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VoiceSearchService { // La reconnaissance se fait en utilisant une APII dont on goit specifier á Angular qu'on est dans sa zone .
  private recognition: any;

  constructor(private zone: NgZone) {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      if (SpeechRecognition) {
        this.recognition = new SpeechRecognition();
        this.recognition.continuous = true;  // Enable continuous recognition
        this.recognition.interimResults = true;  // Les résultats sont fornits en temp réel -
        this.recognition.lang = 'en-US';
      } else {
        console.warn('Speech recognition not supported in this browser.');
      }
    } else {
      console.warn('Window is not defined.');
    }
  }

  startListening(): Observable<string> {
    return new Observable(observer => {
      if (!this.recognition) {
        observer.error('Speech recognition not supported in this browser.');
        return;
      }
      this.recognition.start();

      this.recognition.onresult = (event: any) => {
        this.zone.run(() => { // Garantie que le code est executé dans la zone angular 
          for (let i = event.resultIndex; i < event.results.length; i++) {
            if (event.results[i].isFinal) { // Lorsue l'utilisateur arrete de parler 
              observer.next(event.results[i][0].transcript);
            } else {
              observer.next(event.results[i][0].transcript + '...'); // il parle 
            }
          }
        });
      };

      this.recognition.onerror = (event: any) => {
        this.zone.run(() => {
          observer.error(event.error);
        });
      };

      this.recognition.onend = () => {
        this.zone.run(() => { 
          observer.complete();
        });
      };

      // Cleanup function in case the subscription is cancelled
      return () => {
        this.recognition.abort();
      };
    });
  }
}
