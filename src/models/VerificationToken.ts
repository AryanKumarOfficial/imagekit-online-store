import mongoose, {model, models} from "mongoose";
import crypto from "crypto";

export interface IVerificationToken {
    identifier: string;
    token: string;
    expires: Date;
}

interface VerificationTokenModel extends mongoose.Model<IVerificationToken> {
    generate(identifier: string): Promise<IVerificationToken>;

    verify(identifier: string, token: string): Promise<boolean>
}

const verificationTokenSchema = new mongoose.Schema<IVerificationToken>({
    identifier: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        default: () => crypto.randomBytes(32).toString("hex"),
    },
    expires: {
        type: Date,
        default: () => new Date(Date.now() + 24 * 60 * 60 * 1000),
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
    const token = new this({identifier: identifier});
    await token.save();
    return token;
}

verificationTokenSchema.statics.verify = async function (identifier: string, token: string): Promise<boolean> {
    const record = await this.findOneAndDelete({identifier, token, expires: {$gte: new Date(Date.now())}});
    return !!record;
}

verificationTokenSchema.index({identifier: 1, token: 1}, {unique: true});
verificationTokenSchema.index({expires: 1}, {expireAfterSeconds: 0});


const VerificationToken = (models.VerificationToken as VerificationTokenModel || model<IVerificationToken, VerificationTokenModel>("VerificationToken", verificationTokenSchema));

export default VerificationToken;