import express from 'express';
import { createContact } from '../controllers/contactController.js';

const router = express.Router();

// Vetëm create është publike
router.route('/')
  .post(createContact);  // POST /api/contacts

// Admin routes janë në routes/admin.js
export default router;