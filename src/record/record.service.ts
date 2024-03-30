import { BadRequestException, Injectable } from '@nestjs/common';
import { DoctorsService } from 'src/doctors/doctors.service';
import { PrismaService } from 'src/prisma.service';
import { ScheduleService } from 'src/schedule/schedule.service';
import { UserService } from 'src/user/user.service';
import { RecordDto } from './dto/record.dto';

@Injectable()
export class RecordService {
  constructor(
    private prisma: PrismaService,
    private doctorsService: DoctorsService,
    private userService: UserService,
    private scheduleService: ScheduleService,
  ) {}

  async create(dto: RecordDto) {
    const isDoctor = await this.doctorsService.getById(dto.doctor_id);
    const isPatient = await this.userService.getById(dto.patient_id);
    const schedule = await this.scheduleService.getById(dto.schedule_id);
    const currentDT = new Date(Date.now());
    if (!isDoctor) throw new BadRequestException('Врача не существует');
    if (!isPatient) throw new BadRequestException('Пациента не существует');
    if (!schedule) throw new BadRequestException('Такой записи не существует');
    if (schedule.time_from < currentDT) {
      throw new BadRequestException('Слот недоступен для записи');
    }
    if (schedule.is_free != true) {
      throw new BadRequestException('Слот недоступен для записи');
    }
    const record = {
      doctor_id: dto.doctor_id,
      patient_id: dto.patient_id,
      schedule_id: dto.schedule_id,
    };
    return this.prisma.record
      .create({ data: record })
      .then(async () => {
        await this.prisma.schedule.update({
          where: { id: schedule.id },
          data: {
            is_free: false,
          },
        });
        await this.prisma.$disconnect();
        return record;
      })
      .catch(async (e) => {
        console.error(e);
        await this.prisma.$disconnect();
        throw new BadRequestException('Непредвиденная ошибка');
      });
  }
}
