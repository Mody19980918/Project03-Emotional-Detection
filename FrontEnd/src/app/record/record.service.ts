import { RankItem } from './../rank-item';
import { ApiService } from 'src/api.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RecordService {
  constructor(private api: ApiService) {}

  getUserEmojiGameData() {
    return this.api.get<RankItem[]>(`/record/emoji_game`);
  }
  getUserGoldenSentenceData() {
    return this.api.get<RankItem[]>(`/record/golden_sentence`);
  }
}
