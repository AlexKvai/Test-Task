import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DoctorsModule } from './doctors/doctors.module';
import { MailerModule } from './mailer/mailer.module';
import { RecordModule } from './record/record.module';
import { ScheduleModule as ScheduleModuleCustom } from './schedule/schedule.module';
import { UserModule } from './user/user.module';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    RecordModule,
    ScheduleModuleCustom,
    UserModule,
    DoctorsModule,
    MailerModule,
    ScheduleModule.forRoot(),
    NotificationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
