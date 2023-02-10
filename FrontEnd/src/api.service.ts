import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Parser } from 'cast.ts';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  api_origin = window.location.origin.includes('https')
    ? window.location.origin
    : 'http://localhost:3000';

  private token = localStorage.getItem('token');

  constructor(
    private toastController: ToastController,
    private http: HttpClient
  ) {}

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('token', token);
  }

  private fetch<T>(
    url: string,
    init: RequestInit,
    parser: Parser<T>
  ): Promise<T> {
    let p = fetch(this.api_origin + url, {
      ...init,
      headers: {
        ...init.headers,
        Authorization: 'Bearer ' + this.token,
      },
    }).then((res) =>
      res.json().then((json) => {
        if (200 <= res.status && res.status <= 299) {
          if (json.error) {
            throw json.error;
          }
          return parser.parse(json, {});
        } else {
          throw json.message;
        }
      })
    );
    p.catch(async (error) => {
      this.showToast({
        message: String(error),
        color: 'danger',
        duration: 3500,
      });
    });
    return p;
  }

  private async showToast(options: {
    message: string;
    color: string;
    duration: number;
  }) {
    let toast: HTMLIonToastElement = await this.toastController.create({
      color: options.color,
      duration: options.duration,
      message: options.message,
      buttons: [
        { text: 'Dismiss', role: 'cancel', handler: () => toast.dismiss() },
      ],
    });
    await toast.present();
  }

  async postFetch<T>(input: {
    successMessage: string;
    url: string;
    body: object;
    parser: Parser<T>;
  }) {
    let json = await this.fetch(
      input.url,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input.body),
      },
      input.parser
    );
    this.showToast({
      message: input.successMessage,
      duration: 3000,
      color: 'success',
    });
    return json;
  }

  post<T>(url: string, body: object) {
    console.log('posting', `${this.api_origin}${url}`, {
      headers: {
        Authorization: 'Bearer ' + this.token,
      },
      body,
    });
    return this.http.post<T>(`${this.api_origin}${url}`, body, {
      headers: {
        Authorization: 'Bearer ' + this.token,
      },
    });
  }

  get<T>(url: string) {
    return this.http.get<T>(`${this.api_origin}${url}`, {
      headers: {
        Authorization: 'Bearer ' + this.token,
      },
    });
  }
}
