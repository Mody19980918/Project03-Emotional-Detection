import { RankItem } from './../rank-item';
import { ApiService } from 'src/api.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RankingService {
  constructor(private api: ApiService) {}
  // for get the rank of Emoji Game
  getEmojiGameData() {
    return this.api.get<RankItem[]>(`/ranking/emoji_game`);
  }
  // for get the rank of Golden Sentence

  getGoldenSentenceData() {
    return this.api.get<RankItem[]>(`/ranking/golden_sentence`);
  }
}
