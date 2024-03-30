import { BadRequestException, Injectable } from '@nestjs/common';
import { DoctorsService } from 'src/doctors/doctors.service';
import { PrismaService } from 'src/prisma.service';
import { GetScheduleDto, ScheduleDto } from './dto/schedule.dto';

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

  async getSchedule(dto: GetScheduleDto) {
    const { date, doctor_id, patient_id, time_from, time_to, is_free } = dto;

    const dateFrom = new Date(date);
    const dateTo = new Date(dateFrom);
    dateTo.setDate(dateFrom.getDate() + 1);

    const paramsBody: any = {
      time_from: { gte: dateFrom.toISOString() },
      time_to: { lte: dateTo.toISOString() },
    };

    if (doctor_id) paramsBody.doctor_id = doctor_id;
    if (time_from) paramsBody.time_from.gte = new Date(time_from).toISOString();
    if (time_to) paramsBody.time_to.lte = new Date(time_to).toISOString();
    if (is_free !== undefined) paramsBody.is_free = is_free;
    if (patient_id) paramsBody.patient_id = patient_id;

    const schedule = await this.prisma.schedule.findMany({
      where: paramsBody,
    });

    return schedule;
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
