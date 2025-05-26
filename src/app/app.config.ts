import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { routes } from './app.routes';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyCbiXr6RUQ9RUonAFiAd11-kNXLyJ5U7gg",
  authDomain: "resumetask-8b9c5.firebaseapp.com",
  projectId: "resumetask-8b9c5",
  storageBucket: "resumetask-8b9c5.firebasestorage.app",
  messagingSenderId: "458316329246",
  appId: "1:458316329246:web:942b2ba89e26883113190f",
  measurementId: "G-7E0TB6CLLE"
};


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore())
  ]
};
