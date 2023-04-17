import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { isEmpty } from 'lodash';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';
import { Users } from '../entities';
import { JwtPayload } from './types/jwt-payload.interface';
import { Request as RequestType } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject('USERS_REPOSITORY')
    private readonly usersRepository: Repository<Users>,
  ) {
    super({
      secretOrKey: 'test',
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtStrategy.extractJWT,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
    });
  }

  //NoHttp cookies jwt
  private static extractJWT(req: RequestType): string | null {
    if (
      req.cookies &&
      'Authorization' in req.cookies &&
      req.cookies.Authorization.length > 0
    ) {
      return req.cookies.Authorization;
    }
    return null;
  }

  async validate(payload: any) {
    const { email } = payload;
    const user = await this.usersRepository.find({ where: { email } });

    if (isEmpty(user)) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
