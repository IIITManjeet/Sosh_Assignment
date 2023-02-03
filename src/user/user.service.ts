import { Injectable, BadRequestException} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { InjectModel} from '@nestjs/mongoose';
import { Model} from 'mongoose';
import { User, UserDocument} from './user.schema';
import { HashService } from './hash.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
 constructor(@InjectModel(User.name) private userModel: Model<UserDocument>, private hashService: HashService, private jwtService: JwtService) { }

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
  const payload = {
   name: createUser.username,
   sub: createUser.email,
   password: createUser.password
  };
  createUser.password = await    
   this.hashService.hashPassword(createUser.password);
   createUser.save();
   return {
    access_token: this.jwtService.sign(payload),
   }
 }
}
