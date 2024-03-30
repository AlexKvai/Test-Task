import { Module } from '@nestjs/common';
import { DoctorsModule } from 'src/doctors/doctors.module';
import { PrismaService } from 'src/prisma.service';
import { ScheduleController } from './schedule.controller';
import { ScheduleService } from './schedule.service';

@Module({
  imports: [DoctorsModule],
  controllers: [ScheduleController],
  providers: [ScheduleService, PrismaService],
})
export class ScheduleModule {}
