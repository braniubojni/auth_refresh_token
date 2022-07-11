import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { IRegReturn } from './user.interface';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {
    console.log('Worked')
  }

  @Post('registration')
  async registration(
    // @Req() req: Request,
    // @Res({ passthrough: true }) res: Response,
    @Body() body: any,
  ): Promise<any> {
    // const userDto: CreateUserDto = req.body;
    // const userData = await this.userService.registration(userDto);
    // res.cookie('refreshToken', userData.refreshToken, {
    //   maxAge: 2592000000, // 30 day
    //   httpOnly: true,
    // });
    console.log(body, 'worked');
    return 'OK';
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
