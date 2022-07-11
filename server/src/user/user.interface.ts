import { ITokens } from 'src/token/token.interface';
import { UserDto } from './dto/user.dto';

export interface IRegReturn extends ITokens {
  user: UserDto;
}
