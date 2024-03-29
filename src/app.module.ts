import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { RecordModule } from './record/record.module';
import { ScheduleModule } from './schedule/schedule.module';
import { UserModule } from './user/user.module';
import { DoctorsModule } from './doctors/doctors.module';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule, RecordModule, ScheduleModule, UserModule, DoctorsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
