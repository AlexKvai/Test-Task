import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { DoctorsDto } from './dto/doctors.dto';

@Injectable()
export class DoctorsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: DoctorsDto) {
    const doctor = {
      name: dto.name,
      spec: dto.spec,
      price: dto.price,
    };
    return this.prisma.doctors.create({ data: doctor });
  }
}
