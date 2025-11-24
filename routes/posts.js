import express from 'express';
import {
    getPosts,
    getPost
} from '../controllers/postController.js';

const router = express.Router();

router.route('/')
    .get(getPosts);

router.route('/:slug')
    .get(getPost);

export default router;