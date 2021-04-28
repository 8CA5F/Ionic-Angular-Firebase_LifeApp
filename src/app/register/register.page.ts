import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { FirebaseAuthService } from '../firebase-auth.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { User } from '../user-class'


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  validations_form: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Enter a valid email.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 6 characters long.' }
    ]
  };

  constructor(
    private navCtrl: NavController,
    private authService: FirebaseAuthService,
    private formBuilder: FormBuilder,
    public toastController: ToastController,
    private router: Router
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

  tryRegister(value) {
    this.authService.registerUser(value)
      .then(res => {
        console.log(res);
        this.errorMessage = "";
        this.SuccessRegisterToast();
        this.goLoginPage();

      }, err => {
        console.log(err);
        this.ErrorRegisterToast();
        this.successMessage = "";
      })
  }

  async SuccessRegisterToast() {
    const toast = await this.toastController.create({
      message: 'Your account has been created. Please log in.',
      duration: 3000,
      color: "medium",
      mode: "ios"
    });
    toast.present();
  }

  async ErrorRegisterToast() {
    const toast = await this.toastController.create({
      message: 'The email address is badly formatted.',
      duration: 3000,
      color: "medium",
      mode: "ios"
    });
    toast.present();
  }

  goLoginPage() {
    this.router.navigateByUrl('/login')
  }

}
