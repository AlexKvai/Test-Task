import { IsEmail, IsIn, IsString } from 'class-validator';

export class UserDto {
  @IsString()
  phone: string;

  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsIn(['male', 'female'])
  gender: 'male' | 'female';
}
