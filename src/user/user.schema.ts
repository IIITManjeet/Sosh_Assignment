import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
 @Prop()
 _id: string;

 @Prop()
 name: string;

 @Prop()
 email: string;

 @Prop()
 token: string;
}

export const UserSchema = SchemaFactory.createForClass(User);