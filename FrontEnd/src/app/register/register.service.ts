import { ApiService } from 'src/api.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private api: ApiService) {}
  // TODO specify the type of object
  registerAccount(account: object) {
    return this.api.post('/user/register', account);
  }
}
