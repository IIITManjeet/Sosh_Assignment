import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../strategy/constants';
import { UserService } from 'src/user/user.service';
import { HashService } from 'src/user/hash.service';
import { LocalStrategy } from '../strategy/local.strategy';
import { JwtStrategy } from '../strategy/jwt.strategy';

@Module({
 imports: [
  MongooseModule.forFeature([{
   name: User.name,
   schema: UserSchema
  }]),
  JwtModule.register({
   secret: jwtConstants.secret,
   signOptions: {
    expiresIn: '60d'
   },
  }),
 ],
 controllers: [AuthController],
 providers: [AuthService, UserService, LocalStrategy, HashService,JwtStrategy],
})

export class AuthModule { }
