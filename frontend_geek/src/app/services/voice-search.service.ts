// src/app/services/voice-search.service.ts
import { Injectable, NgZone } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VoiceSearchService {
  private recognition: any;

  constructor(private zone: NgZone) {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      if (SpeechRecognition) {
        this.recognition = new SpeechRecognition();
        this.recognition.continuous = false;
        this.recognition.interimResults = false;
        this.recognition.lang = 'en-US';
      } else {
        console.warn('Speech recognition not supported in this browser.');
      }
    } else {
      console.warn('Window is not defined.');
    }
  }

  startListening(): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!this.recognition) {
        return reject('Speech recognition not supported in this browser.');
      }
      this.recognition.start();
      this.recognition.onresult = (event: any) => {
        this.zone.run(() => {
          resolve(event.results[0][0].transcript);
        });
      };
      this.recognition.onerror = (event: any) => {
        this.zone.run(() => {
          reject(event.error);
        });
      };
    });
  }
}
