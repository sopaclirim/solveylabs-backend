import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/database.js';
import chalk from 'chalk';
import fs from 'fs';

// Routes
import contactRoutes from './routes/contacts.js';
import applicationRoutes from './routes/applications.js';
import postRoutes from './routes/posts.js';
import authRoutes from './routes/auth.js';
import adminRoutes from './routes/admin.js'; // ← I ri

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());

// app.use(cors({
//     origin: 'http://localhost:5173', // Vite default port
//     credentials: true
// }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files - CV files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'uploads'), {
    setHeaders: (res, filePath) => {
        // Nëse është PDF file, vendos header për download
        if (filePath.endsWith('.pdf')) {
            const filename = path.basename(filePath);
            res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
            res.setHeader('Content-Type', 'application/pdf');
        }
    }
}));

// Root route - Welcome page
app.get('/', (req, res) => {
    const htmlPath = path.join(__dirname, 'server-homepage.html');
    const html = fs.readFileSync(htmlPath, 'utf8');
    res.send(html);
});

// Public Routes
app.use('/api/contacts', contactRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/auth', authRoutes);

// Admin Routes (të gjitha kërkojnë authentication)
app.use('/api/admin', adminRoutes); // ← I ri, zevendeson admin routes individuale

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'SolveyLabs API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Server Error'
    });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(chalk.cyanBright(`Server running on port ${PORT}`));
});