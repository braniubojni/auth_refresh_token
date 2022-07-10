import { Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('registration')
  registration() {
    return this.userService.registration();
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
  activate() {
    return this.userService.activate();
  }

  @Get('refresh')
  refresh() {
    return this.userService.refresh();
  }

  @Get(':id')
  getUser() {
    return this.userService.getUser();
  }
}
