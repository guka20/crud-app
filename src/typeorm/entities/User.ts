import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number
  @Column()
  fullname: string
  @Column()
  age: number
}
