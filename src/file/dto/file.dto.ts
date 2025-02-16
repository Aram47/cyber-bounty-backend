import { IsString, IsNumber, IsPositive, IsNotEmpty } from 'class-validator';

export class FileDto {
  @IsString()
  encRandKey: string;

  @IsString()
  hashData: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  recipientsId: number;
}
