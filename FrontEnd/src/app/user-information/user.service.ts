import { ApiService } from 'src/api.service';
import { Injectable } from '@angular/core';
import { SelfProfile } from '../self-profile';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  host = this.api.api_origin;
  constructor(private api: ApiService) {}

  getUsername() {
    return this.api
      .get<{ username: string }>('/user/username')
      .pipe(map((json) => json.username));
  }

  getSelfProfile() {
    return this.api.get<SelfProfile>('/user/self-profile');
  }

  changePassword(password: string) {
    return this.api.post<{ success: boolean; message: string }>(
      `/user/password`,
      { password }
    );
  }

  updateProfile(user: SelfProfile) {
    return this.api.post('/user/profile', user);
  }
}
