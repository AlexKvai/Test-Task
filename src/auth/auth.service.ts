import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}
  async register(dto: RegisterDto) {
    const oldUserByEmail = await this.userService.getByEmail(dto.email);
    const oldUserByPhone = await this.userService.getByPhone(dto.phone);

    if (oldUserByEmail)
      throw new BadRequestException('Пользователь уже существует');

    if (oldUserByPhone)
      throw new BadRequestException('Пользователь уже существует');

    const user = await this.userService.create(dto);

    return {
      user,
    };
  }
}
