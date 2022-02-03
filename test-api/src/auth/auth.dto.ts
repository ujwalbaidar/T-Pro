import { IsNotEmpty, IsString, Matches, MaxLength, MinLength, Validate } from 'class-validator';
import { Unique } from 'sequelize-typescript';
import { User } from './user.entity';

export class AuthDto{
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(32)
  @Validate(Unique, [User])
  username: string;
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @Matches(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,{
    message: 'Password is too weak!'
  })
  password: string;
}