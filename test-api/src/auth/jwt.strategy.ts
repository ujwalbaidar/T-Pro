import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { USER_REPOSITORY } from "src/core/constants";
import { User } from "./user.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
  constructor(@Inject(USER_REPOSITORY) private readonly userRepository: typeof User) {
    super({
      secretOrKey: 't0d0Secret',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: any): Promise<User>{
    const { username } = payload;
    const user:User = await this.userRepository.findOne({where:{username: payload.username}});
    if(!user){
      throw new UnauthorizedException();
    }
    return user;
  }
}