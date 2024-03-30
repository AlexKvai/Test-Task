import {
  Body,
  Controller,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { RecordDto } from './dto/record.dto';
import { RecordService } from './record.service';

@Controller('record')
export class RecordController {
  constructor(private readonly recordService: RecordService) {}
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('create')
  async create(@Body() dto: RecordDto) {
    return this.recordService.create(dto);
  }
}
