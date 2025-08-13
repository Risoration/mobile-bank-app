import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    await mongoose
      .connect(process.env.MONGODB_URI)
      .then(() => console.log('Database connected'))
      .catch((error) => console.log('Database not connected', error.message));
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // 1 means exit with failure
  }
};
