import nodemailer from 'nodemailer';

// Krijo transporter për email
const createTransporter = () => {
    // Nëse email settings nuk janë konfiguruar, kthe null
    if (!process.env.EMAIL_HOST || !process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        return null;
    }

    return nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: parseInt(process.env.EMAIL_PORT) || 587,
        secure: false, // true për 465, false për portet e tjera
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });
};

// Dërgo email notification për admin kur vjen contact
export const sendContactNotification = async (contact) => {
    try {
        const transporter = createTransporter();
        if (!transporter) {
            console.log('Email not configured - skipping notification');
            return;
        }

        const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_USER;

        await transporter.sendMail({
            from: `"Solvey Labs" <${process.env.EMAIL_FROM || process.env.EMAIL_USER}>`,
            to: adminEmail,
            subject: `New Contact Message: ${contact.subject}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #2563eb;">New Contact Message</h2>
                    <p>You have received a new contact message from your website.</p>
                    
                    <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <p><strong>Name:</strong> ${contact.fullName}</p>
                        <p><strong>Email:</strong> ${contact.email}</p>
                        <p><strong>Subject:</strong> ${contact.subject}</p>
                        <p><strong>Message:</strong></p>
                        <p style="white-space: pre-wrap; background: white; padding: 15px; border-radius: 4px; margin-top: 10px;">
                            ${contact.message}
                        </p>
                    </div>
                    
                    <p style="color: #6b7280; font-size: 14px; margin-top: 20px;">
                        View this message in your admin dashboard.
                    </p>
                </div>
            `,
        });

        console.log('Contact notification email sent');
    } catch (error) {
        console.error('Error sending contact notification:', error);
        // Mos e throw error - nuk duhet të ndikojë në response
    }
};

// Dërgo email notification për admin kur vjen application
export const sendApplicationNotification = async (application) => {
    try {
        const transporter = createTransporter();
        if (!transporter) {
            console.log('Email not configured - skipping notification');
            return;
        }

        const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_USER;

        await transporter.sendMail({
            from: `"Solvey Labs" <${process.env.EMAIL_FROM || process.env.EMAIL_USER}>`,
            to: adminEmail,
            subject: `New Job Application: ${application.fullName}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #2563eb;">New Job Application</h2>
                    <p>You have received a new job application from your website.</p>
                    
                    <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <p><strong>Name:</strong> ${application.fullName}</p>
                        <p><strong>Email:</strong> ${application.email}</p>
                        ${application.message ? `<p><strong>Message:</strong></p>
                        <p style="white-space: pre-wrap; background: white; padding: 15px; border-radius: 4px; margin-top: 10px;">
                            ${application.message}
                        </p>` : ''}
                        ${application.cv ? `<p><strong>CV:</strong> Attached</p>` : ''}
                    </div>
                    
                    <p style="color: #6b7280; font-size: 14px; margin-top: 20px;">
                        View this application in your admin dashboard.
                    </p>
                </div>
            `,
        });

        console.log('Application notification email sent');
    } catch (error) {
        console.error('Error sending application notification:', error);
        // Mos e throw error - nuk duhet të ndikojë në response
    }
};

// Dërgo email përgjigje për contact ose application
export const sendReplyEmail = async ({ to, subject, message, replyTo = null }) => {
    try {
        const transporter = createTransporter();
        if (!transporter) {
            throw new Error('Email service not configured');
        }

        await transporter.sendMail({
            from: `"Solvey Labs" <${process.env.EMAIL_FROM || process.env.EMAIL_USER}>`,
            to: to,
            replyTo: replyTo || process.env.EMAIL_USER,
            subject: subject,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <div style="background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); padding: 30px; border-radius: 8px 8px 0 0; text-align: center;">
                        <h1 style="color: white; margin: 0;">Solvey Labs</h1>
                    </div>
                    
                    <div style="background: white; padding: 30px; border-radius: 0 0 8px 8px; border: 1px solid #e5e7eb;">
                        <div style="white-space: pre-wrap; line-height: 1.6; color: #374151;">
                            ${message}
                        </div>
                        
                        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px;">
                            <p>Best regards,<br>Solvey Labs Team</p>
                        </div>
                    </div>
                </div>
            `,
        });

        return { success: true };
    } catch (error) {
        console.error('Error sending reply email:', error);
        throw error;
    }
};

