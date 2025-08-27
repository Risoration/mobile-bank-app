import mongoose from 'mongoose';
import dotenv from 'dotenv';

export const connectDB = async () => {
  try {
    await mongoose
      .connect(process.env.MONGO_URI)
      .then(() => console.log('✅ Database connected'))
      .catch((error) =>
        console.log('❌ Database not connected', error.message)
      );
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // 1 means exit with failure
  }
};
