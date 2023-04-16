import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity({ name: 'users' })
export class Users {
  @ObjectIdColumn()
  _id: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ unique: true })
  email: string;
}
