import { ApiService } from 'src/api.service';
import { UserAccount } from './../module/rankingData';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  // host = 'http://localhost:3000';

  host = this.api.api_origin;

  constructor(private api: ApiService) {}

  // For login account
  loginAccount(account: any) {
    return this.api.post<{ token: string; admin: boolean }>(
      `/user/login`,
      account
    );
  }
  confirmGoogleLogin(data: object) {
    return this.api.post<{ token: string }>('/google-login/confirm', data);
  }
}
