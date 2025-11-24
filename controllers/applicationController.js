import Application from '../models/Application.js';
import path from 'path';
import { sendApplicationNotification } from '../utils/emailService.js';

// @desc    Create new application
// @route   POST /api/applications
// @access  Public
export const createApplication = async (req, res) => {
    try {
        const { fullName, email, message } = req.body;
        const cvPath = req.file ? `/uploads/cv/${req.file.filename}` : null;

        const application = await Application.create({
            fullName,
            email,
            message,
            cv: cvPath
        });

        // Dërgo email notification për admin (në background, mos e prit)
        sendApplicationNotification(application).catch(err => 
            console.error('Failed to send application notification:', err)
        );

        res.status(201).json({
            success: true,
            message: 'Application submitted successfully',
            data: application
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get all applications
// @route   GET /api/applications
// @access  Private/Admin
export const getApplications = async (req, res) => {
    try {
        const applications = await Application.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: applications.length,
            data: applications
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get single application
// @route   GET /api/applications/:id
// @access  Private/Admin
export const getApplication = async (req, res) => {
    try {
        const application = await Application.findById(req.params.id);

        if (!application) {
            return res.status(404).json({
                success: false,
                message: 'Application not found'
            });
        }

        // Mark as read
        application.read = true;
        await application.save();

        res.status(200).json({
            success: true,
            data: application
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Update application status
// @route   PUT /api/applications/:id
// @access  Private/Admin
export const updateApplication = async (req, res) => {
    try {
        const { status } = req.body;

        const application = await Application.findById(req.params.id);

        if (!application) {
            return res.status(404).json({
                success: false,
                message: 'Application not found'
            });
        }

        application.status = status || application.status;
        await application.save();

        res.status(200).json({
            success: true,
            data: application
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Delete application
// @route   DELETE /api/applications/:id
// @access  Private/Admin
export const deleteApplication = async (req, res) => {
    try {
        const application = await Application.findById(req.params.id);

        if (!application) {
            return res.status(404).json({
                success: false,
                message: 'Application not found'
            });
        }

        await application.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Application deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};