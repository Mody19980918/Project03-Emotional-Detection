import { ApiService } from 'src/api.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { LoginService } from './login.service';
import { SocialAuthService } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  placerHolderUsername = 'username';
  placerHolderPassword = 'password';
  username = '';
  password = '';
  watchPassword = false;
  user: any;
  loggedIn: any;

  constructor(
    private loginService: LoginService,
    private alertController: AlertController,
    private toastController: ToastController,
    private router: Router,
    private authService: SocialAuthService,
    private api: ApiService
  ) {}

  ngOnInit() {
    this.authService.authState.subscribe({
      next: (data) => {
        console.log(data);
        this.loginService.confirmGoogleLogin(data).subscribe({
          next: (data) => {
            console.log(data);
            
            this.toastModel('Login is Successful!!');
            this.api.setToken(data.token);
            this.router.navigateByUrl('/tabs/home');
          },
        });
      },
    });
  }

  loginWithKeyboard(event: any) {
    console.log(event.key);
    if (event.key == 'Enter') {
      this.loginAccount();
    }
  }

  async toastModel(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: 'top',
    });
    await toast.present();
  }

  async alertModel(message: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  // For the toast of login no username

  async loginWrongThreeTimesTimer() {
    setTimeout(() => {
      console.log('HIHI');
    }, 30000);
  }
  // For login Account
  loginAccount() {
    let account = {
      username: this.username,
      password: this.password,
    };
    this.loginService.loginAccount(account).subscribe({
      next: (data) => {
        console.log(data);

        if (data.admin == true) {
          console.log(data);

          this.api.setToken(data.token);
          this.router.navigateByUrl('/admin');
          return;
        }
        this.toastModel('Login is Successful!!');
        // console.log(data.id)

        this.api.setToken(data.token);
        this.api;
        this.router.navigateByUrl('/tabs/home');
      },
      error: (json: { error: { error: string; message: string } }) => {
        console.log('error', json);
        let message = json.error.message || json.error.error;
        this.alertModel(message);
      },
    });
    return;
  }
}
