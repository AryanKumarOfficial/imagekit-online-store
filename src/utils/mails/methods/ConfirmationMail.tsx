import {transporter} from "@/utils/mails/setup";
import verificationToken from "@/models/VerificationToken";
import {ConfirmMailTemplate} from "@/utils/mails/templates/ConfirmationMail"
import {renderTemplate} from "@/utils/mails/methods/renderTemplate";

export async function sendConfirmationMail(email: string) {
    try {
        await transporter.verify();
        console.log("Transporter successfully verified.");
        const token = await verificationToken.generate(email);
        const content = await renderTemplate(
            ConfirmMailTemplate,
            {
                email,
                token: token.token,
                base_url: `${process.env.REACT_APP_BASE_URL || 'http://localhost:3000'}/verify`,
            }
        )
        const mailOptions = {
            from: `ImageKit Responder <${process.env.GMAIL_USER}>`,
            to: email,
            subject: `Confirmation Mail`,
            html: content,
        }
        await transporter.sendMail(mailOptions);
    } catch (e: any) {
        console.error(e);
        throw new Error("Failed to Send email: ", e);
    }
}