import { PaymentService } from './payment.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {
  paymentHandler: any = null;

  placeHolderNumberOfAmount: string = '';

  constructor(private paymentService: PaymentService) {}

  ngOnInit() {
    this.invokeStripe();
  }
  ionViewWillEnter() {
    this.invokeStripe();
  }

  //For make Payment
  makePayment(amount: number) {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51M3GvwI11DBOYm9qJpaSy4fMkrWS06ADHFKcERy9tAc1rFIfTLfEO9IN4OsIeo2xkZ6K1BTmk0cgqyu2a6QaAORW00JNm7aitC',
      locale: 'auto',
      token: function (stripeToken: any) {
        console.log(stripeToken);
        paymentStripe(stripeToken);
      },
    });

    const paymentStripe = (stripeToken: any) => {
      this.paymentService.makePayment(stripeToken).subscribe((data) => {
        console.log(data);
      });
    };
    paymentHandler.open({
      name: 'Donation',
      description: 'Thank for you support!',
      amount: amount * 100,
    });
  }

  //For invoke Payment
  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51M3GvwI11DBOYm9qJpaSy4fMkrWS06ADHFKcERy9tAc1rFIfTLfEO9IN4OsIeo2xkZ6K1BTmk0cgqyu2a6QaAORW00JNm7aitC',
          locale: 'auto',
          token: function (stripeToken: any) {
            console.log(stripeToken);
          },
        });
      };
      window.document.body.appendChild(script);
    }
  }
}
