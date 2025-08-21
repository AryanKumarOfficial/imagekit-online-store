import {transporter} from "@/utils/mails/setup";
import verificationToken from "@/models/VerificationToken";
import {ConfirmMailTemplate} from "@/utils/mails/templates/ConfirmationMail"
import {renderToStaticMarkup} from "react-dom/server";

export async function sendConfirmationMail(email: string) {
    try {
        await transporter.verify();
        console.log("Transporter successfully verified.");
        const token = await verificationToken.generate(email);
        const mailOptions = {
            from: `ImageKit Responder <${process.env.GMAIL_USER}>`,
            to: email,
            subject: `Confirmation Mail`,
            html: renderToStaticMarkup(
                <ConfirmMailTemplate email={email} base_url={"http://localhost/verify"} token={token.token}/>
            ),
        }
        await transporter.sendMail(mailOptions);
    } catch (e: any) {
        console.error(e);
        throw new Error("Failed to Send email: ", e);
    }
}