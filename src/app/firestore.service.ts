import { Injectable } from '@angular/core';
import { AngularFireModule, FirebaseApp } from '@angular/fire';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from "firebase/app";
import { FirebaseAuthService } from './firebase-auth.service';



@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  scSub: any;  

  constructor(
    private angularFireModule: AngularFireModule,
    private firestore: AngularFirestore,
    private afModule: AngularFireAuthModule,
    private afAuth: AngularFireAuth
    ) { }

    create_plan(value){
      return new Promise<any>((resolve, reject) => {
        let currentUser = firebase.auth().currentUser;
        this.firestore.collection('people').doc(currentUser.uid).collection('plans').add({
          title: value.title,
          description: value.description,
          time: value.time
        })
        .then(
          res => resolve(res),
          err => reject(err)
        )
      })
    }

    list_plan(user){
      return new Promise<any>((resolve, reject) => {
        this.afAuth.user.subscribe(currentUser => {
          if(currentUser){
            this.scSub = this.firestore.collection('people').doc(currentUser.uid).collection('plans').snapshotChanges();
            resolve(this.scSub)
          }
        })
      });
    }

}
