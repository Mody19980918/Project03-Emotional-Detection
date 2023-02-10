import { RegisterPage } from '../register/register.page';
import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage {
  loginPage = 'Login';
  registerPage = 'Register';
  title = 'GameOfLife';
  content = '請選擇模型:';
  buttonStart = 'Game Start !';
  emojiGameTitle = 'Emoji Game';
  goldenSentenceGameTitle = 'Golden Sentence Game';
  constructor(private router: Router) {}

  routerModel(path: string) {
    this.router.navigateByUrl(path);
  }
}
