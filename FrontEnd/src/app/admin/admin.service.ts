import { ApiService } from 'src/api.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private api: ApiService) {}

  getUserStats() {
    return this.api.get<{
      members: { member_create_to_month: string; member_count: number }[];
      genders: { gender: string; count: number }[];
    }>('/user/stats');
  }
}
