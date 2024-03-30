import { IsOptional, IsString } from 'class-validator';

export class EmailDto {
  @IsOptional()
  @IsString()
  from: string;

  @IsString()
  to: string;

  @IsString()
  subject: string;

  @IsString()
  text: string;
}
