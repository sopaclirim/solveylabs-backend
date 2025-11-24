import { sendReplyEmail } from '../utils/emailService.js';

// @desc    Send reply email
// @route   POST /api/admin/send-email
// @access  Private/Admin
export const sendReply = async (req, res) => {
    try {
        const { to, subject, message } = req.body;

        // Validation
        if (!to || !subject || !message) {
            return res.status(400).json({
                success: false,
                message: 'Please provide to, subject, and message'
            });
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(to.trim())) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email address'
            });
        }

        // Trim values
        const trimmedTo = to.trim();
        const trimmedSubject = subject.trim();
        const trimmedMessage = message.trim();

        if (trimmedSubject.length === 0 || trimmedMessage.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Subject and message cannot be empty'
            });
        }

        await sendReplyEmail({
            to: trimmedTo,
            subject: trimmedSubject,
            message: trimmedMessage,
            replyTo: process.env.EMAIL_USER
        });

        res.status(200).json({
            success: true,
            message: 'Email sent successfully'
        });
    } catch (error) {
        console.error('Error in sendReply controller:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to send email. Please check email configuration.'
        });
    }
};

