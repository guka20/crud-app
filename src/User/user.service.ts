import { Injectable, NotFoundException } from '@nestjs/common'
import { User } from './user.model'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity } from 'src/typeorm/entities/User'

@Injectable()
export class UserService {
  users: User[] = []
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}
  insertUser(fullname: string, age: number) {
    if (!fullname || !age)
      return {
        message: 'Please fill all blanks',
      }
    const newUser = this.usersRepository.create({
      fullname: fullname,
      age: age,
    })
    return this.usersRepository.save(newUser)
  }
  getAllUsers() {
    const allUsers = this.usersRepository.find()

    return allUsers
  }
  userById(id: number): Promise<UserEntity | undefined> {
    const userById = this.usersRepository.findOne({ where: { id: Number(id) } })
    if (!userById) throw new NotFoundException('User could not found')
    return userById
  }

  updateUser(fullname: string, age: number, id: number) {
    const message = this.usersRepository.update(id, { fullname, age })
    message.then((res) => {
      if (res.affected === 0) {
        throw new NotFoundException('User Could not found')
      }
    })
    const updatedData = this.usersRepository.findOne({
      where: { id: Number(id) },
    })

    return updatedData
  }

  deleteUser(id: string) {
    const message = this.usersRepository.query(
      `DELETE FROM users WHERE id = ${id}`,
    )
    message.then((res) => {
      if (res?.affectedRows === 0) {
        throw new NotFoundException('Could not find user')
      }
    })

    return { message: 'Deleted successfully' }
  }
}
