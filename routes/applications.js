import express from 'express';
import { createApplication } from '../controllers/applicationController.js';
import { uploadCV } from '../middleware/upload.js';

const router = express.Router();

// Vetëm create është publike
router.route('/')
  .post(uploadCV.single('cv'), createApplication); // POST /api/applications

// Admin routes janë në routes/admin.js
export default router;