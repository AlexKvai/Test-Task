import {
  IsBoolean,
  IsDateString,
  IsInt,
  IsOptional,
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

  @IsOptional()
  @IsString()
  patient_id: string;

  @IsInt()
  @Min(0)
  @Max(1)
  type: number;
}

export class GetScheduleDto {
  @IsDateString()
  date: string;

  @IsOptional()
  @IsString()
  doctor_id: string;

  @IsOptional()
  @IsDateString()
  time_from: string;

  @IsOptional()
  @IsDateString()
  time_to: string;

  @IsOptional()
  @IsBoolean()
  is_free: boolean;

  @IsOptional()
  @IsString()
  patient_id: string;
}
