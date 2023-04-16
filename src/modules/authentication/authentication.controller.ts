import {
  Body,
  Controller,
  ForbiddenException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { SignInDto, SignUpDto } from './dto';
import { ErrorResponse } from 'src/helpers';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('sign-up')
  async signUp(@Body() payload: SignUpDto) {
    try {
      if (!payload.TC) {
        throw new ForbiddenException('T&C must be checked');
      }

      const { accessToken } = await this.authenticationService.signUp(payload);

      return {
        message: 'User registered successfully',
        statusCode: HttpStatus.OK,
        data: { accessToken },
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
  async SignIn(@Body() payload: SignInDto): Promise<{ accessToken: string }> {
    try {
      return this.authenticationService.signIn(payload);
    } catch (error) {
      return ErrorResponse(error);
    }
  }
}
