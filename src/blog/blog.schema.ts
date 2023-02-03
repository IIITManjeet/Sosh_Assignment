import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, SchemaTypes, ObjectIdExpression, ObjectId } from 'mongoose';

export type BlogDocument = HydratedDocument<Blog>;

@Schema({ timestamps: true })
export class Blog {
 @Prop({ required: true })
 title: string;

 @Prop({ required: true })
 description: string;

 @Prop({ required: true })
 createdBy: mongoose.Types.ObjectId;

 @Prop()
 createdOn:Date;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);