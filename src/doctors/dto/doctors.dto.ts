import { IsInt, IsString } from 'class-validator';

export class DoctorsDto {
  @IsString()
  name: string;

  @IsString()
  spec: string;

  @IsInt()
  price: number;
}
