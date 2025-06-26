import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB ansluten');
  } catch (error) {
    console.error('❌ Fel vid anslutning till MongoDB:', error);
    process.exit(1);
  }
};
export const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    console.log('✅ MongoDB frånkopplad');
  } catch (error) {
    console.error('❌ Fel vid frånkoppling av MongoDB:', error);
  }
};