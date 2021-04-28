import { Component } from '@angular/core';
import { FirestoreService } from '../firestore.service';
import { Router } from '@angular/router';
import { FirebaseAuthService } from '../firebase-auth.service';
import { NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  today = new Date();
  userEmail: string;
  planList = [];
  planData: PlanDatas;
  planForm: FormGroup;
  userID: string;

  constructor(
    private fsService: FirestoreService,
    private router: Router,
    private authService: FirebaseAuthService,
    private navCtrl: NavController,
    public toastController: ToastController,
    public fb: FormBuilder,
    private afAuth: AngularFireAuth,
  ) {
    this.startTime();
    this.planData = {} as PlanDatas;
  }

  ngOnInit() {

    this.authService.userDetails().subscribe(res => {
      if (res !== null) {
        this.userEmail = res.email;
      } else {
        this.LogOutToast();
        this.navCtrl.navigateForward('/login');
      }
    }, err => {
      console.log('err', err);
    });


    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userID = user.uid;
        this.ListPlan(this.userID);
      } else {
        this.router.navigateByUrl('/login');
      }
    });

  }

  ListPlan(userID){
    this.fsService.list_plan(userID).then(
      success => {this.planList = success.data; console.log(success);    
        }, error => {console.log(error);
    })
  }

  routeCreate() {
    this.router.navigate(['/createplan']);
  }

  startTime() {
    var intervalVar = setInterval(function () {
      this.today = new Date().toISOString();
    }.bind(this), 500)
  };

  logOut() {
    this.authService.logoutUser()
      .then(res => {
        this.LogOutToast();
        this.router.navigateByUrl('/login');
      })
      .catch(error => {
        console.log(error);
      })
  }

  async LogOutToast() {
    const toast = await this.toastController.create({
      message: 'Exited successfully.',
      duration: 3000,
      position: "top",
      color: "medium",
      mode: "ios",
      cssClass: 'my-toast-css',
    });
    toast.present();
  }


  RemoveRecord(rowID) {
    this.fsService.delete_plan(rowID);
  }

  EditRecord(plan) {
    plan.isEdit = true;
    plan.EditName = plan.Name;
    plan.EditAge = plan.Age;
    plan.EditAddress = plan.Address;
  }

  UpdateRecord(planRow) {
    let record = {};
    record['Name'] = planRow.EditName;
    record['Age'] = planRow.EditAge;
    record['Address'] = planRow.EditAddress;
    this.fsService.update_plan(planRow.id, record);
    planRow.isEdit = false;
  }

}
