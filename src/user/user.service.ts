import { Injectable, BadRequestException} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { InjectModel} from '@nestjs/mongoose';
import { Model} from 'mongoose';
import { User, UserDocument} from './user.schema';
import { HashService } from './hash.service';

@Injectable()
export class UserService {
 constructor(@InjectModel(User.name) private userModel: Model<UserDocument>, private hashService: HashService) { }

 async getUserByName(name: string) {
  return this.userModel.findOne({name}).exec();
 }

 async registerUser(createUserDTO: CreateUserDTO) {
  const createUser = new this.userModel(createUserDTO);
  const user = await this.getUserByName(createUser.name);
  if (user) {
   throw new BadRequestException();
  }
  createUser.token = await this.hashService.hashPassword(createUser.token);
  return createUser.save();
 }
}
