import Contact from '../models/Contact.js';
import { sendContactNotification } from '../utils/emailService.js';

// @desc    Create new contact
// @route   POST /api/contacts
// @access  Public
export const createContact = async (req, res) => {
    try {
        const { fullName, email, subject, message } = req.body;

        const contact = await Contact.create({
            fullName,
            email,
            subject,
            message
        });

        // Dërgo email notification për admin (në background, mos e prit)
        sendContactNotification(contact).catch(err => 
            console.error('Failed to send contact notification:', err)
        );

        res.status(201).json({
            success: true,
            message: 'Contact message sent successfully',
            data: contact
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get all contacts
// @route   GET /api/contacts
// @access  Private/Admin
export const getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: contacts.length,
            data: contacts
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get single contact
// @route   GET /api/contacts/:id
// @access  Private/Admin
export const getContact = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);

        if (!contact) {
            return res.status(404).json({
                success: false,
                message: 'Contact not found'
            });
        }

        // Mark as read
        contact.read = true;
        await contact.save();

        res.status(200).json({
            success: true,
            data: contact
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Delete contact
// @route   DELETE /api/contacts/:id
// @access  Private/Admin
export const deleteContact = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);

        if (!contact) {
            return res.status(404).json({
                success: false,
                message: 'Contact not found'
            });
        }

        await contact.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Contact deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};