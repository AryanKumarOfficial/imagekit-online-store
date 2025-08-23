import mongoose, {Document, model, models, Schema} from "mongoose";

import bcrypt from "bcryptjs";

export interface IUser {
    _id?: mongoose.Types.ObjectId;
    email: string;
    password: string;
    role: "user" | "admin";
    isVerified: Date | null;
    createdAt?: Date;
    updatedAt?: Date;
}

interface IUserSchema extends mongoose.Model<IUser> {
    changePassword: (email: string, password: string, newPassword: string) => Promise<void>;
    forgetPassword: (email: string, password: string) => Promise<void>;
}

interface IUserMethods {
    comparePassword: (candidatePassword: string) => Promise<boolean>;
}

type IUserDocument = IUser & IUserMethods & Document;

const userSchema = new Schema<IUserDocument, IUserSchema, IUserMethods>(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },
        isVerified: {
            type: Date,
            default: null,
        }
    },
    {timestamps: true}
);

userSchema.statics.changePassword = async function (email: string, password: string, newPassword: string) {
    const user = await this.findOne({email}) as IUserDocument;
    if (!user) {
        throw new Error("User does not exist");
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        throw new Error("Incorrect password");
    }

    user.password = newPassword;
    await user.save();
}

userSchema.statics.forgetPassword = async function (email: string, candidatePassword: string): Promise<void> {
    const user = await this.findOne({email}) as IUserDocument;
    if (!user) {
        throw new Error("User does not exist");
    }

    if (!candidatePassword) {
        throw new Error("candidatePassword does not exist");
    }

    user.password = candidatePassword;
    await user.save();
}

userSchema.methods.comparePassword = async function (candidatePassword: string) {
    return await bcrypt.compare(candidatePassword, this.password);
}

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

const User = (models.User as IUserSchema || model<IUserDocument, IUserSchema>("User", userSchema));

export default User;
