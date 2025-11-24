import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

// Load env vars
dotenv.config();

const createAdmin = async () => {
    try {
        // Connect to database
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        const adminEmail = 'sopaclirim@gmail.com';
        const adminUsername = 'admin';
        const adminPassword = 'admin123';

        // Get users collection direkt
        const db = mongoose.connection.db;
        const usersCollection = db.collection('users');

        // Check if admin already exists
        const existingAdmin = await usersCollection.findOne({ email: adminEmail });
        if (existingAdmin) {
            console.log('⚠️  Admin user already exists!');
            console.log('📧 Email:', adminEmail);
            console.log('👤 Username:', existingAdmin.username);
            await mongoose.connection.close();
            process.exit(0);
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(adminPassword, 12);
        
        // Krijo user direkt në collection
        await usersCollection.insertOne({
            username: adminUsername,
            email: adminEmail,
            password: hashedPassword,
            role: 'admin',
            createdAt: new Date(),
            updatedAt: new Date()
        });

        console.log('✅ Admin user created successfully!');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('📧 Email:', adminEmail);
        console.log('👤 Username:', adminUsername);
        console.log('🔑 Password:', adminPassword);
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('⚠️  Please change the password after first login!');
        
        await mongoose.connection.close();
        process.exit(0);
    } catch (error) {
        console.error('❌ Error creating admin:', error.message);
        console.error(error.stack);
        await mongoose.connection.close();
        process.exit(1);
    }
};

createAdmin();

