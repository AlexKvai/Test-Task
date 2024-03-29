import { BadRequestException, Injectable } from '@nestjs/common';
import { DoctorsService } from 'src/doctors/doctors.service';
import { PrismaService } from 'src/prisma.service';
import { UserService } from 'src/user/user.service';
import { ScheduleDto } from './dto/schedule.dto';

@Injectable()
export class ScheduleService {
  constructor(
    private prisma: PrismaService,
    private doctorsService: DoctorsService,
    private userService: UserService,
  ) {}

  async create(dto: ScheduleDto) {
    const isDoctor = await this.doctorsService.getById(dto.doctor_id);
    const isUser = await this.userService.getById(dto.patient_id);
    if (!isDoctor) throw new BadRequestException('Врача не существует');

    if (!isUser) throw new BadRequestException('Пользователя не существует');
    const schedule = {
      doctor_id: dto.doctor_id,
      time_from: dto.time_from,
      time_to: dto.time_to,
      patient_id: dto.patient_id,
      is_free: dto.is_free,
      type: dto.type,
    };
    return this.prisma.schedule.create({ data: schedule });
  }
}
