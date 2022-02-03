import { Injectable, Inject, ConflictException, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { USER_REPOSITORY } from 'src/core/constants';
import { AuthDto } from './auth.dto';
import { User } from './user.entity';
import * as bycript from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
   /* Create Todo */
  constructor(private jwtService: JwtService, @Inject(USER_REPOSITORY) private readonly userRepository: typeof User) { }

  async createUser(user: AuthDto): Promise<User> {
    try{
      return await this.userRepository.create<User>(user);
    }catch(error){
      if(error.original.code === '23505')
        throw new ConflictException('Username already exists');
      else{
        throw new InternalServerErrorException();
      }
    }
  }

  async signin(user: AuthDto):Promise<{accessToken: string}>{
    const userData = await this.userRepository.findOne({where:{username:user.username}});
    if(userData && (await bycript.compare(user.password, userData.password))){
      const payload = { username: user.username };
      const accessToken: string = await this.jwtService.sign(payload);
      return {accessToken};
    }else{
      throw new UnauthorizedException({value: false, message:'Please Check Login Credential'})
    }
  }
}
