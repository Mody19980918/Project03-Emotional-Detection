import { UserService } from './../user-information/user.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.page.html',
  styleUrls: ['./changepassword.page.scss'],
})
export class ChangepasswordPage {
  username$ = this.userService.getUsername();
  password = '';
  errorOfPassword = 'password length must be more than 8 ';
  displayErrorPasswordMessageBoolean = false;
  errorOfPasswordBoolean = false;
  constructor(
    private userService: UserService,
    private toastController: ToastController,
    private router: Router
  ) {}

  ionViewWillEnter() {
    this.username$ = this.userService.getUsername();
  }

  // For remove token
  removeToken() {
    localStorage.removeItem('token');
  }

  // For toast
  async toastModel(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: 'top',
    });
    await toast.present();
  }
  displayErrorPasswordMessage() {
    return (this.displayErrorPasswordMessageBoolean = true);
  }
  //For submit changed password with mouse click
  changePassword() {
    this.userService.changePassword(this.password).subscribe({
      next: (data) => {
        if (data.success === true) {
          this.toastModel(data.message);
          this.router.navigateByUrl('/welcome');
        }
      },
    });
  }
  //For submit  changed password with keyboard enter button
  changePasswordWithEnter(event: any) {
    if (event.key == 'Enter') {
      return this.changePassword();
    }
  }
  // For checking the format of password
  checkPasswordLength(password: string) {
    return password.length >= 8
      ? (this.errorOfPasswordBoolean = true)
      : (this.errorOfPasswordBoolean = false);
  }
}
