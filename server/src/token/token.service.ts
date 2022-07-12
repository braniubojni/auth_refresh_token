import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as jwt from 'jsonwebtoken';
import { Model, Types } from 'mongoose';
import { UserDto } from 'src/user/dto/user.dto';
import { Token } from './entities/token.entity';
import { ITokens } from './token.interface';

@Injectable()
export class TokenService {
  constructor(
    @InjectModel(Token.name) private readonly tokenModel: Model<Token>,
  ) {}

  generateTokens(payload: UserDto): ITokens {
    const accessToken = jwt.sign(
      payload,
      process.env.JWT_ACCESS_TOKEN || 'secret_token_123',
      { expiresIn: '30m' },
    );
    const refreshToken = jwt.sign(
      payload,
      process.env.JWT_REFRESH_TOKEN || 'secret_token_456',
      { expiresIn: '30d' },
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  async saveToken(
    userId: Types.ObjectId,
    refreshToken: string,
  ): Promise<Token> {
    /** 
    Here we can save only one device, 
    if he login from another device he would be thrown out
    from old device
    */
    const tokenData = await this.tokenModel.findById(userId).exec();
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return await tokenData.save();
    }
    const token = new this.tokenModel({
      user: userId,
      refreshToken,
    });
    return await token.save();
  }
}
