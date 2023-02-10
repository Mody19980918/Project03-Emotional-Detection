import { IsString, IsEmail } from 'class-validator';

export class ConfirmUserDTO {
  @IsString()
  username: string;

  @IsString()
  @IsEmail()
  email: string;
}
