import { BadRequestException, Injectable } from '@nestjs/common';
import { DoctorsService } from 'src/doctors/doctors.service';
import { PrismaService } from 'src/prisma.service';
import { ScheduleDto } from './dto/schedule.dto';

@Injectable()
export class ScheduleService {
  constructor(
    private prisma: PrismaService,
    private doctorsService: DoctorsService,
  ) {}

  async getById(id: string) {
    return this.prisma.schedule.findUnique({
      where: { id },
    });
  }

  async create(dto: ScheduleDto) {
    const isDoctor = await this.doctorsService.getById(dto.doctor_id);
    if (!isDoctor) throw new BadRequestException('Врача не существует');
    const schedule = {
      doctor_id: dto.doctor_id,
      time_from: dto.time_from,
      time_to: dto.time_to,
      is_free: dto.is_free,
      type: dto.type,
    };
    return this.prisma.schedule.create({ data: schedule });
  }
}
