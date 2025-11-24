import express from 'express';
import { protect } from '../middleware/auth.js';
import {
    getAllPosts,
    createPost,
    updatePost,
    deletePost
} from '../controllers/postController.js';
import {
    getContacts,
    getContact,
    deleteContact
} from '../controllers/contactController.js';
import {
    getApplications,
    getApplication,
    updateApplication,
    deleteApplication
} from '../controllers/applicationController.js';
import { sendReply } from '../controllers/emailController.js';

const router = express.Router();

// Të gjitha routes këtu kërkojnë authentication
router.use(protect); // Aplikon protect middleware për të gjitha routes më poshtë

// POST ROUTES (Admin)
router.route('/posts')
    .get(getAllPosts)      // GET /api/admin/posts
    .post(createPost);      // POST /api/admin/posts

router.route('/posts/:id')
    .put(updatePost)       // PUT /api/admin/posts/:id
    .delete(deletePost);   // DELETE /api/admin/posts/:id

// CONTACT ROUTES (Admin)
router.route('/contacts')
    .get(getContacts);     // GET /api/admin/contacts

router.route('/contacts/:id')
    .get(getContact)       // GET /api/admin/contacts/:id
    .delete(deleteContact); // DELETE /api/admin/contacts/:id

// APPLICATION ROUTES (Admin)
router.route('/applications')
    .get(getApplications); // GET /api/admin/applications

router.route('/applications/:id')
    .get(getApplication)           // GET /api/admin/applications/:id
    .put(updateApplication)        // PUT /api/admin/applications/:id
    .delete(deleteApplication);   // DELETE /api/admin/applications/:id

// EMAIL ROUTES (Admin)
router.post('/send-email', sendReply); // POST /api/admin/send-email

export default router;