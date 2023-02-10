import { RankItem } from './../rank-item';
import { RecordService } from './record.service';
import { Component, OnInit } from '@angular/core';
import { GameData } from '../module/rankingData';
// import { Item } from '../module/rankingData';

@Component({
  selector: 'app-record',
  templateUrl: './record.page.html',
  styleUrls: ['./record.page.scss'],
})
export class RecordPage {
  constructor(private recordService: RecordService) {}
  segment: 'emoji' | 'golden' = 'emoji';

  emojiGameStatus = true;
  goldenSentenceStatus = false;

  itemsOfEmojiGame: RankItem[] = [];
  itemsOfGoldenSentence: RankItem[] = [];

  ionViewWillEnter() {
    this.getUserEmojiGameData();
    this.getUserGoldenSentenceData();
  }
  // For get User Emoji Game Data
  getUserEmojiGameData() {
    let userId = localStorage.getItem('token');
    this.recordService.getUserEmojiGameData().subscribe({
      next: (data) => {
        console.log(data);
        this.itemsOfEmojiGame = data;
      },
    });
  }
  getUserGoldenSentenceData() {
    let userId = localStorage.getItem('token');
    this.recordService.getUserGoldenSentenceData().subscribe({
      next: (data) => {
        console.log(data);
        this.itemsOfGoldenSentence = data;
      },
    });
  }
  selectEmojiGame() {
    this.emojiGameStatus = true;
    this.goldenSentenceStatus = false;
  }
  selectGoldenSentence() {
    this.goldenSentenceStatus = true;
    this.emojiGameStatus = false;
  }
}
