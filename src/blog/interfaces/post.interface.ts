import { Date, Document,ObjectId} from 'mongoose';

export interface Post extends Document {
 readonly title: string;
 readonly description: string;
 readonly createdBy: ObjectId;
 readonly createdOn: Date
}