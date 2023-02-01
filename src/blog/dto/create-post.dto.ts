import { Date,ObjectId} from "mongoose";

export class CreatePostDTO {
 readonly title: string;
 readonly description: string;
 readonly createdBy: ObjectId;
 readonly createdOn: Date
}