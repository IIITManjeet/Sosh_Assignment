import { AuthService} from './auth.service';
import { Controller, Request, UseGuards, Post } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
 constructor(private authService: AuthService) { }
 @UseGuards(AuthGuard('local'))
 @Post(`/login`)
 async login(@Request() req: any) {
  console.log(req.body);
  return await this.authService.login(req.body);
 }

}
