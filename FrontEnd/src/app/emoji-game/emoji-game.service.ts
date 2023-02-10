import { Injectable } from '@angular/core';
import { object } from 'cast.ts';
import { ApiService } from 'src/api.service';

@Injectable({
  providedIn: 'root',
})
export class EmojiGameService {
  constructor(private api: ApiService) {}
  determineMatch(body: { score: number }) {
    return this.api.post(`/emoji-game`, body);
  }

  submit(input: { score: number }) {
    let parser = object({});
    this.api.postFetch({
      url: '/emoji-game',
      body: input,
      parser,
      successMessage: 'Submitted game record',
    });
  }
}
