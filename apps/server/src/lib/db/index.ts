import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const DB_URI = process.env.DB_CONN_STRING as string;

export async function connectToDb() {
  try {
    if (!DB_URI) {
      throw new Error("DB URI isn't provided");
    }

    await mongoose.connect(DB_URI);

    console.log("[DB]: Connected to DB successfully!")

  } catch (err) {
    console.error("[DB]: Error connecting to databse", err);
    process.exit(1);
  }
}

