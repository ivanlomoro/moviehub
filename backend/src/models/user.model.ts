import { Document, model, Schema } from 'mongoose'

interface IUserDocument extends Document {
    name: string;
    email: string;
    password: string;
    createdAt?: Date;
    updateAt?: Date;
}

const UserSchema = new Schema<IUserDocument>({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    }
});

const UserModel = model<IUserDocument>("User", UserSchema);

export default UserModel;