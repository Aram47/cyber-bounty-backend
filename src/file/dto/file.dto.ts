import { IsString, IsNumber, IsPositive } from 'class-validator';

export class FileDto {
  @IsString()
  encRandKey: string;

  @IsString()
  hashData: string;

  @IsNumber()
  @IsPositive()
  recipientsId: number;
}
