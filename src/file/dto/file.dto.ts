import { IsString, IsNumber, IsPositive, IsNotEmpty } from 'class-validator';

export class FileDto {
  @IsNotEmpty()
  @IsString()
  encRandKey: string;

  @IsNotEmpty()
  @IsString()
  hashData: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  recipientsId: number;
}
