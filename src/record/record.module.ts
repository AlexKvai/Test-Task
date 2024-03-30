import { Module } from '@nestjs/common';
import { DoctorsModule } from 'src/doctors/doctors.module';
import { PrismaService } from 'src/prisma.service';
import { ScheduleModule } from 'src/schedule/schedule.module';
import { UserModule } from 'src/user/user.module';
import { RecordController } from './record.controller';
import { RecordService } from './record.service';

@Module({
  imports: [DoctorsModule, UserModule, ScheduleModule],
  controllers: [RecordController],
  providers: [RecordService, PrismaService],
})
export class RecordModule {}
