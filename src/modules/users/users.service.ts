import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Users } from '../entities';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private readonly usersRepository: Repository<Users>,
  ) {}
  async create(payload: any) {
    return this.usersRepository.save(payload);
  }

  async findAll() {
    return this.usersRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
