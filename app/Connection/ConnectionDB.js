import mongoose from "mongoose";

const handleDBConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDB Connected Successfully...");
    } catch (error) {
        console.log("Database Connection Error:", error);
    }
};

export { handleDBConnection };




