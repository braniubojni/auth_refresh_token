import { Types } from 'mongoose';
import { User } from '../entities/user.entity';

export class UserDto {
  id: Types.ObjectId;
  email: string;
  isActivated: boolean;

  constructor(model: User) {
    this.email = model.email;
    this.id = model._id;
    this.isActivated = model.isActivated;
  }
}
