import {
  Body,
  Controller,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { EmailDto } from './dto/email.dto';
import { MailerService } from './mailer.service';

@Controller('mailer')
export class MailerController {
  constructor(private readonly mailerService: MailerService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('send')
  async send(@Body() dto: EmailDto) {
    return this.mailerService.sendEmail(dto);
  }
}
