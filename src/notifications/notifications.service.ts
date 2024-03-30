import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import * as moment from 'moment';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class NotificationsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly mailerService: MailerService,
  ) {}

  async sendNotifications(): Promise<void> {
    const schedules = await this.prismaService.schedule.findMany({
      where: {
        is_free: false,
      },
      include: {
        patient: true,
        doctor: true,
      },
    });

    if (!schedules || schedules.length === 0) {
      return;
    }

    schedules.forEach(async (schedule) => {
      const time = moment(schedule.time_from).subtract(7, 'hours');

      const currentDT = moment().subtract(1, 'minute');
      if (time.diff(currentDT, 'minutes') === 120) {
        await this.mailerService.sendMail({
          to: schedule.patient.email,
          subject: 'Напоминание о записи',
          text: `${currentDT.format('HH:mm DD.MM.YYYY')} | Привет ${schedule.patient.name}!  Через 2 часа у вас приём у ${schedule.doctor.spec} в ${time.format('HH:mm')}`,
        });
      }

      if (time.diff(currentDT, 'minutes') === 1440) {
        await this.mailerService.sendMail({
          to: schedule.patient.email,
          subject: 'Напоминание о записи',
          text: `${currentDT.format('HH:mm DD.MM.YYYY')} | Привет  ${schedule.patient.name}! Напоминаем что вы записаны к ${schedule.doctor.spec} завтра в ${time.format('HH:mm')}!`,
        });
      }
    });
  }
}
