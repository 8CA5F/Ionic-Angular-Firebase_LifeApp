import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular';
import { FirebaseAuthService } from '../firebase-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  validations_form: FormGroup;
  errorMessage: string = '';

  constructor(
    private navCtrl: NavController,
    private authService: FirebaseAuthService,
    private formBuilder: FormBuilder,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required
      ])),
    });
  }

  validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please enter a valid email.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 6 characters long.' }
    ]
  };

  loginUser(value) {
    this.authService.loginUser(value)
      .then(res => {
        console.log(res);
        this.LoginToast();
        this.errorMessage = "";
        this.navCtrl.navigateForward('/home');
      }, err => {
        this.errorMessage = err.message;
      })
  }

  goToRegisterPage() {
    this.navCtrl.navigateForward('/register');
  }

  async LoginToast() {
    const toast = await this.toastController.create({
      message: 'Login successful.',
      duration: 3000,
      position: "top",
      color: "medium",
      mode: "ios",
      cssClass: 'my-toast-css',
    });
    toast.present();
  }

}
