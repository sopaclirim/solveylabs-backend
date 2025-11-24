import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    cv: {
        type: String, // Path to uploaded file
        required: false
    },
    message: {
        type: String,
        required: false
    },
    status: {
        type: String,
        enum: ['pending', 'reviewed', 'accepted', 'rejected'],
        default: 'pending'
    },
    read: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

export default mongoose.model('Application', applicationSchema);