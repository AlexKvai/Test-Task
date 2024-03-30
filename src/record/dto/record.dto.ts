import { IsString } from 'class-validator';

export class RecordDto {
  @IsString()
  doctor_id: string;

  @IsString()
  patient_id: string;

  @IsString()
  schedule_id: string;
}
