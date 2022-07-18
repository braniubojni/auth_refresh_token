import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as jwt from 'jsonwebtoken';
import { Model, Types } from 'mongoose';
import { UserDto } from 'src/user/dto/user.dto';
import { Token } from './entities/token.entity';
import { ITokens, JwtUserData } from './token.interface';

@Injectable()
export class TokenService {
  constructor(
    @InjectModel(Token.name) private readonly tokenModel: Model<Token>,
  ) {}

  generateTokens(payload: UserDto): ITokens {
    const accessToken = jwt.sign(
      payload,
      process.env.JWT_ACCESS_TOKEN || 'secret_token_123',
      { expiresIn: '30s' },
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

  validateAccessToken(token: string): JwtUserData {
    try {
      return jwt.verify(
        token,
        process.env.JWT_ACCESS_TOKEN || 'secret_token_123',
      ) as JwtUserData;
    } catch (error) {
      Logger.error('Access token validate error', error.message);
      return null;
    }
  }

  validateRefreshToken(token: string): JwtUserData {
    try {
      return jwt.verify(
        token,
        process.env.JWT_REFRESH_TOKEN || 'secret_token_456',
      ) as JwtUserData;
    } catch (error) {
      Logger.error('Refresh token validate error => ', error.message);
      return null;
    }
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

  async removeToken(refreshToken: string): Promise<Token> {
    const tokenData = await this.tokenModel
      .findOneAndDelete({ refreshToken })
      .exec();
    return tokenData;
  }

  async getToken(refreshToken: string): Promise<Token> {
    return await this.tokenModel.findOne({ refreshToken }).exec();
  }
}
