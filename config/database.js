import mongoose from 'mongoose';
import chalk from 'chalk';

const connectDB = async () => {
    try {
        const isAtlas = process.env.MONGODB_URI?.includes('mongodb+srv://');
        
        const options = isAtlas ? {
            ssl: true,
        } : {};
        
        const conn = await mongoose.connect(process.env.MONGODB_URI, options);
        console.log(chalk.green.bold(`✓ MongoDB Connected: ${chalk.cyan(conn.connection.host)}`));
    } catch(error) {
        console.error(chalk.red.bold(`✗ MongoDB Connection Error: ${chalk.yellow(error.message)}`));
        process.exit(1);
    }
};

export default connectDB;