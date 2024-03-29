import {
  IsBoolean,
  IsDateString,
  IsInt,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class ScheduleDto {
  @IsString()
  doctor_id: string;

  @IsDateString()
  time_from: string;

  @IsDateString()
  time_to: string;

  @IsBoolean()
  is_free: boolean;

  @IsInt()
  @Min(0)
  @Max(1)
  type: number;
}
