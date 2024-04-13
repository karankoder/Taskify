import mongoose from 'mongoose';

export const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: process.env.DB_NAME,
    })
    .then(() => {
      console.log(`connected to database : ${process.env.DB_NAME}`);
    })
    .catch((err) => {
      console.log(err);
    });
};
