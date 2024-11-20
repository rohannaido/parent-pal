import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendPasswordSetupEmail(email: string, token: string) {
    const setupUrl = `${process.env.NEXT_PUBLIC_APP_URL}/set-password?token=${token}`;

    await resend.emails.send({
        from: 'ParentPal <parentpal@rohannaidu.com>',
        to: [email],
        subject: 'Set up your password',
        html: `
            <h1>Welcome to ParentPal!</h1>
            <p>Click the link below to set up your password:</p>
            <a href="${setupUrl}">Set up password</a>
        `
    });

}
