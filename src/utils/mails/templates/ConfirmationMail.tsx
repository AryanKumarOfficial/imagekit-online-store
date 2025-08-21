import React, {FC} from 'react'

type confirmMailType = {
    email: string,
    base_url: string,
    token: string,
}

const ConfirmationMail: FC<confirmMailType> = ({base_url, email, token}) => {
    return (
        <div style={{fontFamily: "Arial, sans-serif", backgroundColor: "#f9f9f9", padding: "20px"}}>
            <table
                width="100%"
                cellPadding="0"
                cellSpacing="0"
                style={{
                    maxWidth: "600px",
                    margin: "0 auto",
                    backgroundColor: "#ffffff",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    overflow: "hidden",
                }}
            >
                <tbody>
                <tr>
                    <td
                        style={{
                            backgroundColor: "#4f46e5",
                            color: "#ffffff",
                            padding: "20px",
                            textAlign: "center",
                            fontSize: "24px",
                            fontWeight: "bold",
                        }}
                    >
                        Verify Your Email
                    </td>
                </tr>
                <tr>
                    <td style={{padding: "30px", fontSize: "16px", color: "#333333"}}>
                        <p style={{marginBottom: "20px"}}>Hi, {email}</p>
                        <p style={{marginBottom: "20px"}}>
                            Thank you for signing up! Please verify your email address by clicking the button below:
                        </p>
                        <p style={{textAlign: "center", marginBottom: "30px"}}>
                            <a
                                href={`${base_url}/token=${token}`}
                                style={{
                                    display: "inline-block",
                                    backgroundColor: "#4f46e5",
                                    color: "#ffffff",
                                    textDecoration: "none",
                                    padding: "12px 24px",
                                    borderRadius: "6px",
                                    fontSize: "16px",
                                    fontWeight: "bold",
                                }}
                            >
                                Verify Email
                            </a>
                        </p>
                        <p style={{marginBottom: "20px"}}>
                            If you didn’t create an account, you can safely ignore this email.
                        </p>
                        <p style={{marginBottom: "0"}}>Best regards,<br/>The Team</p>
                    </td>
                </tr>
                <tr>
                    <td
                        style={{
                            backgroundColor: "#f3f4f6",
                            color: "#555555",
                            padding: "15px",
                            textAlign: "center",
                            fontSize: "14px",
                        }}
                    >
                        © {new Date().getFullYear()} ImageKit Responder. All rights reserved.
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}
export {ConfirmationMail as ConfirmMailTemplate};
