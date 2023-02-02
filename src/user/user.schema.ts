import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
 @Prop({ required: true })
 _id: string;

 @Prop({ required: true })
 name: string;

 @Prop({ required: true })
 email: string;

 @Prop({ required: true })
 token: string;
}

export const UserSchema = SchemaFactory.createForClass(User);