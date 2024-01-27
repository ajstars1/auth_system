import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sendTwoFactorTokenEmail = async(
    email: string,
    token: string,
) => {
    await resend.emails.send({
        from: "oboarding@resend.dev",
        to: email,
        subject: "Your two factor authentication Code",
        html: `
            <h1>Your two factor authentication Code</h1>
            <p>Your Code is <strong>${token}</strong></p>
        `,
    });
}

export const sendPasswordResetEmail = async(
    email: string,
    token: string,
) => {
    const resetLink = `${domain}/auth/new-password?token=${token}`;

    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Reset your password",
        html: `
            <h1>Reset your password</h1>
            <p>Click <a href="${resetLink}">here</a> to reset your password.</p>
        `,
    });
}


export const sendVerificationEmail = async (
    email: string,
    token: string,
) => {
    const confirmLink = `${domain}/auth/new-verification?token=${token}`;

    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Confirm your email",
        html: `
            <h1>Confirm your email</h1>
            <p>Click <a href="${confirmLink}">here</a> to confirm your email.</p>
        `,
    });
}