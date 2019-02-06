import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { FcmService } from '../providers/fcm.service';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { FirestoreSettingsToken } from '@angular/fire/firestore';
import { Firebase } from '@ionic-native/firebase';

const config = {
    apiKey: "AIzaSyAyS15fezR9-7EGnTs95ZPdd_kFKGn7p84",
    authDomain: "notifydemo-c5e40.firebaseapp.com",
    databaseURL: "https://notifydemo-c5e40.firebaseio.com",
    projectId: "notifydemo-c5e40",
    storageBucket: "notifydemo-c5e40.appspot.com",
    messagingSenderId: "1012693885749"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Firebase,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FcmService,
    { provide: FirestoreSettingsToken, useValue: {} }
  ]
})
export class AppModule {}
