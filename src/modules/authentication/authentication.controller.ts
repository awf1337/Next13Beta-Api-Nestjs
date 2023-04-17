import {
  Body,
  Controller,
  ForbiddenException,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { SignInDto, SignUpDto } from './dto';
import { ErrorResponse } from 'src/helpers';
import { CookieOptions, Response } from 'express';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('sign-up')
  async signUp(
    @Body() payload: SignUpDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    try {
      if (!payload.TC) {
        throw new ForbiddenException('T&C must be checked');
      }

      const token = await this.authenticationService.signUp(payload);

      const options: CookieOptions = {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        maxAge: 3600 * 24,
      };

      response.cookie('Authorization', token, options);

      return {
        message: 'User registered successfully',
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      if (error.code === 11000) {
        //mongodb 11000 for uniq
        return ErrorResponse('Email already exists', HttpStatus.CONFLICT);
      }
      return ErrorResponse(error);
    }
  }

  @Post('sign-in')
  async SignIn(
    @Body() payload: SignInDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    try {
      const token = await this.authenticationService.signIn(payload);
      const options: CookieOptions = {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
      };

      if (payload.remember) {
        options.maxAge = 3600 * 24;
      }

      response.cookie('Authorization', token, options);

      return {
        message: 'Logged in successfully',
      };
    } catch (error) {
      return ErrorResponse(error);
    }
  }
}
