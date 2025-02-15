import { IsEmail, IsNotEmpty, IsString, ValidateIf } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsEmail()
  @ValidateIf((o) => !o.email)
  email?: string;

  @IsNotEmpty()
  @IsString()
  @ValidateIf((o) => !o.username)
  username?: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
