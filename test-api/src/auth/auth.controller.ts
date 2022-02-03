import { Controller, Post, Body } from '@nestjs/common';
import { AuthDto } from './auth.dto';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}
  @Post('/signup')
  async signUp(@Body() authDto: AuthDto): Promise<User> {
    const salt = await bcrypt.genSalt();
    authDto['password'] = await bcrypt.hash(authDto.password, salt);
    return await this.auth.createUser(authDto);
  }

  @Post('/signin')
  async signIp(@Body() authDto: AuthDto): Promise<any> {
    return await this.auth.signin(authDto);
  }
}
