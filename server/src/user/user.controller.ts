import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UsePipes(ValidationPipe)
  @Post('registration')
  async registration(@Body() userDto: CreateUserDto, @Res() res: Response) {
    const userData = await this.userService.registration(userDto);
    res.cookie('refreshToken', userData.refreshToken, {
      maxAge: 2592000000, // 30 day
      httpOnly: true,
    });
    return res.json(userData);
  }

  @Post('login')
  async login(@Body() userDto: CreateUserDto, @Res() res: Response) {
    const userData = await this.userService.login(userDto);
    res.cookie('refreshToken', userData.refreshToken, {
      maxAge: 2592000000, // 30 day
      httpOnly: true,
    });
    return res.json(userData);
  }

  @Post('logout')
  logout(@Req() req: Request, @Res() res: Response) {
    const { refreshToken } = req.cookies;
    const token = this.userService.logout(refreshToken);
    res.clearCookie('refreshToken');

    return res.json(token);
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
