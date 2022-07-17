import { Controller, Get, Param, Post, Req, Res } from '@nestjs/common';
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
    return this.userService.login();
  }

  @Post('logout')
  logout() {
    return this.userService.logout();
  }

  @Get('activate/:link')
  async activate(@Param('link') link: string, @Res() res: Response) {
    await this.userService.activate(link);
    return res.redirect(process.env.CLIENT_URL);
  }

  @Get('refresh')
  refresh() {
    return this.userService.refresh();
  }
}
