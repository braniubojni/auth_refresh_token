import { IsBoolean, IsEmail, IsMongoId } from 'class-validator';
import { Types } from 'mongoose';
import { User } from '../entities/user.entity';

export class UserDto {
  @IsMongoId()
  id: Types.ObjectId;

  @IsEmail()
  email: string;

  @IsBoolean()
  isActivated: boolean;

  constructor(model: User) {
    this.email = model.email;
    this.id = model._id;
    this.isActivated = model.isActivated;
  }
}
