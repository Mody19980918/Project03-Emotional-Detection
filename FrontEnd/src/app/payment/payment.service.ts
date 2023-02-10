import { Injectable } from '@angular/core';

import { ApiService } from 'src/api.service';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(private api: ApiService) {}

  makePayment(stripeToken: string) {
    return this.api.post(`/payment`, { stripeToken });
  }
}
