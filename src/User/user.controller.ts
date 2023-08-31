import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common'
import { UserService } from './user.service'

@Controller('api')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  addUser(@Body('fullname') fullname: string, @Body('age') age: number) {
    return this.userService.insertUser(fullname, age)
  }
  @Get('all')
  getAllUser() {
    const users = this.userService.getAllUsers()
    return users
  }

  @Get(':id')
  getUserById(@Param('id') id: number) {
    return this.userService.userById(id)
  }

  @Patch(':id')
  updateUser(
    @Body('fullname') fullname: string,
    @Body('age') age: number,
    @Param('id') id: number,
  ) {
    return this.userService.updateUser(fullname, age, id)
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    this.userService.deleteUser(id)
    return { id: id }
  }
}
