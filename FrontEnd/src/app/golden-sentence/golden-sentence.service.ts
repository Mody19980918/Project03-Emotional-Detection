import { ApiService } from './../../api.service';
import { object } from 'cast.ts';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GoldenSentenceService {
  constructor(private api: ApiService) {}
  // determineMatch(body: { score: number }) {
  //   return this.api.post(`/golden-sentence`, body);
  // }
  submit(input: { score: number }) {
    let parser = object({});
    this.api.postFetch({
      url: '/golden-sentence',
      body: input,
      parser,
      successMessage: 'Submitted game record',
    });
  }
}
