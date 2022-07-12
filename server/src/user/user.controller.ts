import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('registration')
  async registration(@Req() req: Request, @Res() res: Response) {
    const userDto: CreateUserDto = req.body;
    const userData = await this.userService.registration(userDto);
    res.cookie('refreshToken', userData.refreshToken, {
      maxAge: 2592000000, // 30 day
      httpOnly: true,
    });
    return res.json(userData);
  }

  @Post('login')
  login() {
    console.log('Login worked');
    return this.userService.login();
  }

  @Post('logout')
  logout() {
    return this.userService.logout();
  }

  @Get('activate/:link')
  activate() {
    return this.userService.activate();
  }

  @Get('refresh')
  refresh() {
    return this.userService.refresh();
  }

  @Get(':id')
  getUser() {
    console.log('Get user worked');
    return this.userService.getUser();
  }
}
