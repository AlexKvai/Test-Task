import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { NotificationsService } from './notifications/notifications.service';

@Injectable()
export class AppService {
  constructor(private readonly notificationsService: NotificationsService) {}
  getHello(): string {
    return 'Hello World!';
  }

  @Cron(CronExpression.EVERY_MINUTE)
  handleCron() {
    this.notificationsService.sendNotifications();
  }
}
