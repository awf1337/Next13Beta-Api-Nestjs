import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInDto, SignUpDto } from './dto';
import { Repository } from 'typeorm';
import { Users } from '../entities';
import * as bcrypt from 'bcrypt';
import { isEmpty } from 'lodash';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './types/jwt-payload.interface';

@Injectable()
export class AuthenticationService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private readonly usersRepository: Repository<Users>,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(payload: SignUpDto) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(payload.password, salt);

    payload.password = hashedPassword;
    payload.email = payload.email.toLowerCase();

    await this.usersRepository.save(payload);

    return this.tokenGenerator({ email: payload.email });
  }

  async signIn(payload: SignInDto): Promise<string> {
    const { email, password } = payload;

    const user = await this.usersRepository.findOne({ where: { email } });

    if (isEmpty(user)) {
      // for attackers throw unauthorized 401
      throw new UnauthorizedException();
    }

    if (user && (await bcrypt.compare(password, user.password))) {
      return this.tokenGenerator({ email: user.email });
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }

  async tokenGenerator(payload: JwtPayload) {
    const payloadJwt: JwtPayload = payload;
    const accessToken = this.jwtService.sign(payloadJwt);

    return accessToken;
  }
}
