import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class UpdateProfileDTO {
  @IsString()
  @IsOptional()
  public gender: string;

  @IsOptional()
  @IsEmail()
  @IsString()
  public email: string;

  @IsOptional()
  @IsNumber()
  public age: number;

  @IsOptional()
  @IsString()
  public username: string;
}

export class ChangePasswordDTO {
  @IsString()
  @MinLength(8)
  public password: string;
}
