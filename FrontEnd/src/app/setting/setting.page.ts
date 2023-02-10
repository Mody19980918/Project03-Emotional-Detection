import { SelfProfile } from './../self-profile';
import { UserService } from '../user-information/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { SocialAuthService } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage {
  darkStatus = false;
  user$ = this.userService.getSelfProfile();

  constructor(
    private router: Router,
    private toastController: ToastController,
    private userService: UserService
  ) {}

  goToUserInformation() {
    this.router.navigateByUrl('/user-information');
  }
  goToPayment() {
    this.router.navigateByUrl('/payment');
  }
  goToRecord() {
    this.router.navigateByUrl('/record');
  }
  goToRankingPage() {
    this.router.navigateByUrl('/tabs/ranking');
  }
  goToHomePage() {
    this.router.navigateByUrl('/tabs/home');
  }

  changeDarkModeAndLightMode() {
    console.log(this.darkStatus);

    if (this.darkStatus == false) {
      document.body.parentElement?.classList.add('dark');
    } else {
      document.body.parentElement?.classList.remove('dark');
    }

    this.darkStatus = !this.darkStatus;
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter');
    this.user$ = this.userService.getSelfProfile();
  }
  // ngOnInit() {
  //   this.getUserInformation();
  // }

  // ngOnChange() {
  //   this.getUserInformation();
  // }

  async logoutSuccessfulAlert() {
    const toast = await this.toastController.create({
      message: 'Logout Successful!',
      duration: 1500,
      position: 'top',
    });
    await toast.present();
  }
  async logoutAccount() {
    // @ts-ignore
    // google.accounts.id.revoke('')
    // await this.authService.signOut();
    localStorage.removeItem('token');
    // this.router.navigateByUrl('/welcome');
    this.logoutSuccessfulAlert();
    setTimeout(() => {
      location.href = '/welcome';
    }, 1000);
  }
}
