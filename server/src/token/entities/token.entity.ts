import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Token extends Document {
  @Prop({ type: Types.ObjectId, default: false })
  user: Types.ObjectId;

  @Prop({ type: String })
  refreshToken: string;
}

export const TokenSchema = SchemaFactory.createForClass(Token);
