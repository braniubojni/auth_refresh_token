import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: String, default: false })
  isActivated: boolean;

  @Prop({ type: String })
  activationLink: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
