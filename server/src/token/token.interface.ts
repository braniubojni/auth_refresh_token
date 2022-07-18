import { JwtPayload } from 'jsonwebtoken';
import { Types } from 'mongoose';
import { UserDto } from 'src/user/dto/user.dto';

export interface ITokens {
  accessToken: string;
  refreshToken: string;
}

export interface JwtUserData extends JwtPayload, UserDto {
  _id: Types.ObjectId;
}
