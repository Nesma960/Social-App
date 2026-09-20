import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { NotificationsData, NotificationsResponse } from '../models/notifictions-data.interface';

@Injectable({
  providedIn: 'root',
})
export class NotifictionsService {

  private readonly httpClient = inject(HttpClient);

  getNotifications(): Observable<NotificationsResponse> {
    return this.httpClient.get<NotificationsResponse>(`${environment.base_url}/notifications?unread=false&page=1&limit=10`)
  }

}
