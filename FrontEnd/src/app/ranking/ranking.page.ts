import { RankingService } from './ranking.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.page.html',
  styleUrls: ['./ranking.page.scss'],
})
export class RankingPage {
  // create the segment option
  segment: 'emoji' | 'golden' = 'emoji';

  emojiGameStatus = true;
  goldenSentenceStatus = false;
  gameTitle = 'Emoji Game';
  itemsOfEmojiGame$ = this.rankingService.getEmojiGameData();
  itemsOfGoldenSentence$ = this.rankingService.getGoldenSentenceData();

  constructor(private rankingService: RankingService, private router: Router) {}

  // For every time activate the function when visit the page
  ionViewWillEnter() {
    this.itemsOfEmojiGame$;
    this.itemsOfGoldenSentence$;
  }

  routerModel(path: string) {
    this.router.navigateByUrl(path);
  }
}
