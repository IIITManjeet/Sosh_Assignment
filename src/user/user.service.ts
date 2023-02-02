import { Injectable, BadRequestException} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { InjectModel} from '@nestjs/mongoose';
import { Model} from 'mongoose';
import { User, UserDocument} from './user.schema';
import { HashService } from './hash.service';

@Injectable()
export class UserService {
 constructor(@InjectModel(User.name) private userModel: Model<UserDocument>, private hashService: HashService) { }

 async getUserByName(username: string) {
  return this.userModel.findOne({username: username}).exec();
 }

 async registerUser(createUserDTO: CreateUserDTO) {
  const user = await this.getUserByName(createUserDTO.username);
  if (user) {
   console.log(user)
   console.log('user exists')
   throw new BadRequestException();
  }
  const createUser = new this.userModel(createUserDTO);
  
  createUser.password = await this.hashService.hashPassword(createUser.password);
  return createUser.save();
 }
}
