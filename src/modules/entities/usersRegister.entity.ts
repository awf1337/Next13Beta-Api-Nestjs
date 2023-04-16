import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity({ name: 'usersRegister' })
export class UsersRegister {
  @ObjectIdColumn()
  _id: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ unique: true })
  email: string;
}
