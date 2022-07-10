import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  async registration() {
    return 'Test';
  }
  async login() {
    return 'Test';
  }
  async logout() {
    return 'Test';
  }
  async activate() {
    return 'Test';
  }
  async refresh() {
    return 'Test';
  }
  async getUser() {
    return 'Test get user';
  }
}
