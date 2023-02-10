import { SelfProfile } from './../self-profile';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { UserService } from './user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-information',
  templateUrl: './user-information.page.html',
  styleUrls: ['./user-information.page.scss'],
})
export class UserInformationPage implements OnInit {
  placerHolderUsername = 'Please input more than 8 number';
  placerHolderEmail = 'email';
  placerHolderAge = '0-99';

  errorOfUsername = 'username length must be more than 8 ';
  errorOfEmail = 'please use email format';
  errorOfGender = 'please select the gender';
  errorOfAge = 'please input the  number from 0 to 99';

  placeholderEmail = 'email';
  password = '';

  // username = '';
  // email = '';
  // gender = '';
  // age = 0;
  // information: any = {};

  user$ = this.userService.getSelfProfile();

  constructor(
    private userService: UserService,
    private toastController: ToastController,
    private router: Router
  ) {}

  changeEmailColor = false;

  focusedField?: keyof SelfProfile;

  ngOnInit() {}
  ionViewWillEnter() {
    console.log('ionViewWillEnter');
    this.user$ = this.userService.getSelfProfile();
  }

  validateUsername(username: string) {
    return username.length >= 8;
  }

  validateEmail(email: string) {
    return email.includes('@');
  }

  validateGender(gender: string) {
    switch (gender) {
      case 'male':
      case 'female':
      case 'other':
        return true;
      default:
        return false;
    }
  }

  validateAge(age: number) {
    return 0 < age && age < 99;
  }

  checkAccount(user: SelfProfile) {
    return (
      this.validateUsername(user.username) &&
      this.validateEmail(user.email) &&
      this.validateGender(user.gender) &&
      this.validateAge(user.age)
    );
  }

  changeUserInformation(user: SelfProfile) {
    // if (user.email.includes('@')) {
    //   this.information['email'] = this.email;
    // }
    // if (user.gender.length > 0) {
    //   this.information['gender'] = this.gender;
    // }
    // if (user.username.length >= 8) {
    //   this.information['username'] = this.username;
    // }
    // if (user.age > 0) {
    //   this.information['age'] = this.age;
    // }
    console.log(user);
    this.userService.updateProfile(user).subscribe({
      next: (res) => {
        console.log(res);
        this.changeSuccessfulToast();
        this.router.navigateByUrl('/tabs/setting');
      },
    });
  }

  async changeSuccessfulToast() {
    const toast = await this.toastController.create({
      message: 'Change Information Successful!',
      duration: 1500,
      position: 'top',
    });

    await toast.present();
  }
}
