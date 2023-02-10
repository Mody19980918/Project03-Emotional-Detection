import { ApiService } from 'src/api.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ForgetService {
  constructor(private api: ApiService) {}
  confirmUser(user: { username: string; email: string }) {
    return this.api.post<{
      token: string;
      success: boolean;
      error: boolean;
    }>(`/forget`, user);
  }
}
