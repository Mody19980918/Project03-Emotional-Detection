import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  title = 'Emotion - Game ';
  buttonStart = 'Game Start!';
  emojiGameTitle = 'Emoji Game';
  goldenSentenceGameTitle = 'Golden Sentence';

  constructor(private router: Router) {}
  // For visit emoji game page
  // For route to another path
  routerModel(path: string) {
    this.router.navigateByUrl(path);
  }
}
