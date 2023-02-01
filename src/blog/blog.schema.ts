import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, ObjectIdExpression, ObjectId } from 'mongoose';

export type BlogDocument = HydratedDocument<Blog>;

@Schema({ timestamps: true })
export class Blog {
 @Prop({ required: true })
 title: string;

 @Prop({ required: true })
 description: string;

 @Prop({ type: SchemaTypes.ObjectId, required: true })
 createdBy: ObjectId;

 @Prop({ required: true })
 createdOn:Date;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);