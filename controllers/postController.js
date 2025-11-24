import Post from '../models/Post.js';

// @desc    Get all published posts
// @route   GET /api/posts
// @access  Public
export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find({ published: true })
            .select('-content') // Exclude full content
            .sort({ createdAt: -1 })
            .populate('author', 'username');

        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get single post by slug
// @route   GET /api/posts/:slug
// @access  Public
export const getPost = async (req, res) => {
    try {
        const post = await Post.findOne({ slug: req.params.slug, published: true })
            .populate('author', 'username');

        if (!post) {
            return res.status(404).json({
                success: false,
                message: 'Post not found'
            });
        }

        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get all posts (admin - includes unpublished)
// @route   GET /api/admin/posts
// @access  Private/Admin
export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find()
            .sort({ createdAt: -1 })
            .populate('author', 'username');

        res.status(200).json({
            success: true,
            count: posts.length,
            data: posts
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Create new post
// @route   POST /api/admin/posts
// @access  Private/Admin
export const createPost = async (req, res) => {
    try {
        req.body.author = req.user._id;
        const post = await Post.create(req.body);

        res.status(201).json({
            success: true,
            data: post
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Update post
// @route   PUT /api/admin/posts/:id
// @access  Private/Admin
export const updatePost = async (req, res) => {
    try {
        let post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: 'Post not found'
            });
        }

        post = await Post.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            success: true,
            data: post
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Delete post
// @route   DELETE /api/admin/posts/:id
// @access  Private/Admin
export const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: 'Post not found'
            });
        }

        await post.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Post deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};