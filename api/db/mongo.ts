import mongoose from "mongoose";

const initDatabase = async () => {
  const url = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.b5323ua.mongodb.net/?retryWrites=true&w=majority`;

  try {
    await mongoose.connect(url);
    console.log("Connected to MongoDB!");
    // start with a fresh database
    await mongoose.connection.db.dropDatabase();
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
  }
};

export default initDatabase;
