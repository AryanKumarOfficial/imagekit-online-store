import mongoose, {model, models, Schema} from "mongoose";

import bcrypt from "bcryptjs";
import {DateTime} from "next-auth/providers/kakao";

export interface IUser {
    _id?: mongoose.Types.ObjectId;
    email: string;
    password: string;
    role: "user" | "admin";
    isVerified: DateTime | null;
    createdAt?: Date;
    updatedAt?: Date;
}

const userSchema = new Schema<IUser>(
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

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

const User = models.User || model<IUser>("User", userSchema);

export default User;
