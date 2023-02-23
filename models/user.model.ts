import mongoose, { Model, model, Schema } from 'mongoose';

interface IUser {
  name: string;
  email: string;
  avatar?: string;
  password: string;
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  avatar: {
    type: String,
  },
});

const UserModel: Model<IUser> =
  mongoose.models && mongoose.models.User
    ? mongoose.models.User
    : model<IUser>('User', userSchema);

export default UserModel;
