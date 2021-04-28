import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { FirestoreService } from '../firestore.service';
import firebase from 'firebase/app';
require('firebase/auth')
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastController } from '@ionic/angular';




@Component({
  selector: 'app-createplan',
  templateUrl: './createplan.page.html',
  styleUrls: ['./createplan.page.scss'],
})
export class CreateplanPage implements OnInit {

  planForm: FormGroup;

  constructor(
    private router: Router,
    private fsService: FirestoreService,
    public fb: FormBuilder,
    private afStore: AngularFirestore,
    private toastController: ToastController
  ) { }


  ngOnInit() {
    this.planForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      time: ['', [Validators.required]]
    });
  }


  CreatePlan() {
    console.log(this.planForm.value);
    this.fsService.create_plan(this.planForm.value).then(resp => {
      this.CreatePlanToast();
      this.planForm.reset();
    })
      .catch(error => {
        console.log(error);
      });
  }


  async CreatePlanToast() {
    const toast = await this.toastController.create({
      message: 'Your plan has been created.',
      duration: 3000,
      color: "medium",
      mode: "ios"
    });
    toast.present();
  }
  

  backToHome() {
    this.router.navigate(['/home']);
  }

}
