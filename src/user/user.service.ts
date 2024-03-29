import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getByEmail(email: string) {
    return this.prisma.patients.findUnique({
      where: { email },
    });
  }

  async getById(id: string) {
    return this.prisma.patients.findUnique({
      where: { id },
    });
  }

  async getByPhone(phone: string) {
    return this.prisma.patients.findUnique({
      where: { phone },
    });
  }

  async create(dto: UserDto) {
    const user = {
      email: dto.email,
      name: dto.name,
      phone: dto.phone,
      gender: dto.gender,
    };
    return this.prisma.patients.create({ data: user });
  }
}
