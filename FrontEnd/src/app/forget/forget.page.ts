import { ApiService } from 'src/api.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ForgetService } from './forget.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forget',
  templateUrl: './forget.page.html',
  styleUrls: ['./forget.page.scss'],
})
export class ForgetPage implements OnInit {
  user = {
    username: '',
    email: '',
  };
  constructor(
    private forgetService: ForgetService,
    private toastController: ToastController,
    private api: ApiService,
    private router: Router
  ) {}

  ngOnInit() {}

  // For toast

  async toastModern(messages: string) {
    const toast = await this.toastController.create({
      message: messages,
      duration: 1500,
      position: 'top',
    });
    await toast.present();
  }
  // For submit information with key press enter
  async confirmUserError() {}
  confirmWithKeyboard(event: any) {
    if (event.key == 'Enter') {
      this.confirmUser();
    }
  }

  // For submit information with click button

  confirmUser() {
    this.forgetService.confirmUser(this.user).subscribe({
      next: (data) => {
        if (data.success == true) {
          this.toastModern(
            'Your identity is confirm , please change your password'
          );
          this.api.setToken(data.token);
          this.router.navigateByUrl('/changepassword');
        }
        if (data.error == true) {
          this.toastModern('User is not exist, please try again');
        }
      },
    });
  }
}
