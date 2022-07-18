import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as uuid from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import {
  ALREADY_EXISTS,
  NOT_EQUAL_PASS,
  USR_NOT_EXISTS,
} from './user.constants';
import { MailService } from '../mail/mail.service';
import { TokenService } from '../token/token.service';
import { UserDto } from './dto/user.dto';
import { IRegReturn } from './user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly mailService: MailService,
    private readonly tokenService: TokenService,
  ) {}

  private async getUser(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      throw new HttpException(USR_NOT_EXISTS, HttpStatus.NOT_FOUND);
    }
    return user;
  }

  private async genTokens(user: User): Promise<IRegReturn> {
    const userDto = new UserDto(user);
    const tokens = this.tokenService.generateTokens({ ...userDto });
    await this.tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async registration({ email, password }: CreateUserDto): Promise<IRegReturn> {
    const candidate = await this.userModel.findOne({ email }).exec();
    if (candidate) {
      throw new HttpException(ALREADY_EXISTS, HttpStatus.NOT_FOUND);
    }
    const hashPass = await bcrypt.hash(password, 3);
    const activationLink = uuid.v4();
    const user = await new this.userModel({
      email,
      activationLink,
      password: hashPass,
    }).save();

    await this.mailService.sendActivationMail(
      email,
      `${process.env.API_URL}/api/user/activate/${activationLink}`,
    );

    return await this.genTokens(user);
  }

  async login({ email, password }: CreateUserDto) {
    const user = await this.getUser(email);
    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw new HttpException(NOT_EQUAL_PASS, HttpStatus.FORBIDDEN);
    }

    return await this.genTokens(user);
  }
  async logout(refreshToken: string) {
    const token = await this.tokenService.removeToken(refreshToken);
    return token;
  }

  async activate(activationLink: string): Promise<void> {
    const usr = await this.userModel.findOne({ activationLink }).exec();
    if (!usr) {
      throw new HttpException(
        'Incorrect link for confirmation',
        HttpStatus.FORBIDDEN,
      );
    }
    usr.isActivated = true;
    await usr.save();
  }

  async refresh(refreshToken: string): Promise<IRegReturn> {
    if (!refreshToken) {
      throw new UnauthorizedException();
    }
    const userData = this.tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await this.tokenService.getToken(refreshToken);
    /**If don't pass validation or can't find token in db */
    if (!userData && !tokenFromDb) {
      throw new UnauthorizedException();
    }
    const user = await this.userModel.findById(userData.id).exec();
    return await this.genTokens(user);
  }

  async getAllUsers() {
    const users = await this.userModel.find().exec();
    return users;
  }
}
