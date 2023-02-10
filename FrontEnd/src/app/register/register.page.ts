import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { RegisterService } from './register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  placerHolderUsername = 'Please input more than 8 number';
  placerHolderPassword = 'Please input more than 8 number';
  placerHolderEmail = 'email';
  placerHolderAge = '0-99';

  username = '';
  password = '';
  email = '';
  gender = '';
  age = 0;

  errorOfUsername = 'username length must be more than 8 ';
  errorOfPassword = 'password length must be more than 8 ';
  errorOfEmail = 'please use email format';
  errorOfGender = 'please select the gender';
  errorOfAge = 'please input the  number from 0 to 99';

  displayErrorUsernameMessageBoolean = false;
  displayErrorPasswordMessageBoolean = false;
  displayErrorEmailMessageBoolean = false;
  displayErrorGenderMessageBoolean = false;
  displayErrorAgeMessageBoolean = false;

  errorOfUsernameMessageBoolean = false;
  errorOfPasswordMessageBoolean = false;
  errorOfEmailMessageBoolean = false;
  errorOfGenderBoolean = false;
  errorOfAgeBoolean = false;
  constructor(
    private registerService: RegisterService,
    private alertController: AlertController,
    private toastController: ToastController,
    private router: Router
  ) {}

  displayErrorModel(message: boolean) {
    return;
  }

  displayErrorUsernameMessage() {
    return (this.displayErrorUsernameMessageBoolean = true);
  }
  displayErrorPasswordMessage() {
    return (this.displayErrorPasswordMessageBoolean = true);
  }
  displayErrorEmailMessage() {
    return (this.displayErrorEmailMessageBoolean = true);
  }
  displayErrorGenderMessage() {
    return (this.displayErrorGenderMessageBoolean = true);
  }
  displayErrorAgeMessage() {
    return (this.displayErrorAgeMessageBoolean = true);
  }

  async registerAccountExistAlert() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'User is exist!',
      buttons: ['OK'],
    });
    await alert.present();
  }

  async registerAccountSuccessfulToast() {
    const toast = await this.toastController.create({
      message: 'Registration is Successful!!',
      duration: 1500,
      position: 'top',
    });
    await toast.present();
  }

  registerAccount() {
    let account = {
      username: this.username,
      password: this.password,
      email: this.email,
      gender: this.gender,
      age: this.age,
    };
    this.registerService.registerAccount(account).subscribe({
      next: (data) => {
        console.log('data', data);
        this.router.navigateByUrl('/login');
        this.registerAccountSuccessfulToast();
      },
      error: (error) => {
        console.log('error', error);
        this.registerAccountExistAlert();
      },
    });
  }

  checkUsernameLength(username: string) {
    return username.length >= 8
      ? (this.errorOfUsernameMessageBoolean = true)
      : (this.errorOfUsernameMessageBoolean = false);
  }
  checkPasswordLength(password: string) {
    return password.length >= 8
      ? (this.errorOfPasswordMessageBoolean = true)
      : (this.errorOfPasswordMessageBoolean = false);
  }
  checkEmailFormat(email: string) {
    return email.includes('@')
      ? (this.errorOfEmailMessageBoolean = true)
      : (this.errorOfEmailMessageBoolean = false);
  }
  checkGenderLength(gender: string) {
    return gender.length > 0
      ? (this.errorOfGenderBoolean = true)
      : (this.errorOfGenderBoolean = false);
  }
  checkAgeLength(age: number) {
    return age > 0 && age < 99
      ? (this.errorOfAgeBoolean = true)
      : (this.errorOfAgeBoolean = false);
  }
  checkAccount() {
    return (
      this.checkUsernameLength(this.username) &&
      this.checkPasswordLength(this.password) &&
      this.checkEmailFormat(this.email) &&
      this.checkGenderLength(this.gender) &&
      this.checkAgeLength(this.age)
    );
  }
}
