import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { Notification } from './models/notifictions-data.interface';
import { NotifictionsService } from './services/notifictions.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-notifications',
  imports: [DatePipe],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css',
})
export class NotificationsComponent implements OnInit {

  private readonly notifictionsService = inject(NotifictionsService);

  NotificationList: WritableSignal<Notification[]> = signal<Notification[]>([])


  ngOnInit(): void {
    this.getNotificationsData()
  }

  getNotificationsData(): void {
    this.notifictionsService.getNotifications().subscribe({
      next: (res) => {
        if (res.success) {
          this.NotificationList.set(res.data.notifications)
        }
      }
    })
  }


}
