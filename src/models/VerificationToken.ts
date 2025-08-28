import mongoose, {model, models} from "mongoose";
import crypto from "crypto";
import User from "@/models/User";

export interface IVerificationToken {
    identifier: string;
    token: string;
    expires: Date;
}

// Define the possible outcomes of a verification attempt
export type VerificationResult =
    | { success: true; email: string }
    | { success: false; reason: "invalid" | "expired" };

interface VerificationTokenModel extends mongoose.Model<IVerificationToken> {
    generate(identifier: string): Promise<IVerificationToken>;

    verify(token: string): Promise<VerificationResult>
}

const verificationTokenSchema = new mongoose.Schema<IVerificationToken>({
    identifier: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        unique: true,
        default: () => crypto.randomBytes(32).toString("hex"),
    },
    expires: {
        type: Date,
        default: () => new Date(Date.now() + 60 * 60 * 1000),
    }
}, {timestamps: true});

// verificationTokenSchema.pre("save", async function (next) {
//     try {
//         if (!this.token) {
//             this.token = crypto.randomBytes(32).toString("hex");
//         }
//         if (!this.expires) {
//             this.expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
//         }
//         next();
//     } catch (e: any) {
//         next(e as any);
//     }
// })

verificationTokenSchema.statics.generate = async function (identifier: string): Promise<IVerificationToken> {
    await this.findOneAndDelete({identifier});
    const token = new this({identifier});
    await token.save();
    return token;
}

verificationTokenSchema.statics.verify = async function (token: string): Promise<VerificationResult> {
    const record = await this.findOne({token});
    console.log("record", record);
    if (!record) {
        return {success: false, reason: "invalid"};
    }

    if (record.expires < new Date()) {
        await this.findOneAndDelete({token});
        return {success: false, reason: "expired"};
    }

    const user = await User.findOneAndUpdate({
            email: record.identifier,
            isVerified: null
        },
        {$set: {isVerified: new Date()}},
        {new: true}
    )

    console.log("User verification token", user);

    if (!user) {
        await this.findOneAndDelete({token});
        return {success: false, reason: "invalid"};
    }

    await this.findByIdAndDelete(record._id);

    return {success: true, email: user.email}


}

verificationTokenSchema.index({identifier: 1, token: 1}, {unique: true});
verificationTokenSchema.index({expires: 1}, {expireAfterSeconds: 0});


const VerificationToken = (models.VerificationToken as VerificationTokenModel || model<IVerificationToken, VerificationTokenModel>("VerificationToken", verificationTokenSchema));

export default VerificationToken;