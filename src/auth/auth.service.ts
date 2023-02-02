import { UserService } from 'src/user/user.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HashService } from 'src/user/hash.service';

@Injectable()
export class AuthService {
 constructor(private userService: UserService,
  private hashService: HashService,
  private jwtService: JwtService) { }

 async validateUser(username: string, password: string): Promise<any> {
  const user = await this.userService.getUserByName(username);
  if (user && (await this.hashService.comparePassword(password, user.password))) {
   return user;
  }
  return null;
 }

 async login(user: any) {
  const payload = {
   name: user.username,
   sub: user.email,
   password: user.password
  };
  return {
   access_token: this.jwtService.sign(payload),
  };
 }
}
