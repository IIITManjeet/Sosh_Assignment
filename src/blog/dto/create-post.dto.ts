import { Date,ObjectId} from "mongoose";
import * as mongoose from 'mongoose';

export class CreatePostDTO {
 readonly title: string;
 readonly description: string;
 readonly createdBy: mongoose.Types.ObjectId;
 readonly createdOn: Date
}