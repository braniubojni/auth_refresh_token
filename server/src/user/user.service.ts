import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as uuid from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { ALREADY_EXISTS } from './user.constants';
import { MailService } from 'src/mail/mail.service';
import { TokenService } from 'src/token/token.service';
import { UserDto } from './dto/user.dto';
import { IRegReturn } from './user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly mailService: MailService,
    private readonly tokenService: TokenService,
  ) {}

  async registration({ email, password }: CreateUserDto): Promise<IRegReturn> {
    const candidate = await this.userModel.findOne({ email: email }).exec();
    if (candidate) {
      throw new HttpException(ALREADY_EXISTS, HttpStatus.NOT_FOUND);
    }
    const hashPass = await bcrypt.hash(password, 3);
    const activationLink = uuid.v4();
    const user = new this.userModel({
      email,
      activationLink,
      password: hashPass,
    });
    await this.mailService.sendActivationMail(email, activationLink);

    const userDto = new UserDto(user);
    const tokens = this.tokenService.generateTokens({ ...userDto });
    await this.tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
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
