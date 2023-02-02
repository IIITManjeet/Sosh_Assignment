import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('register')
export class UserController {
 constructor(private readonly userService: UserService) { }

 @UseGuards(AuthGuard('jwt'))
 @Get('name')
 getUserByName(@Param() param) {
  return this.userService.getUserByName(param.name);
 }
 @Post()
 registerUser(@Body() createUserDTO: CreateUserDTO) {
  return this.userService.registerUser(createUserDTO);
 }
}
