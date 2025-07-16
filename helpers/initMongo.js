const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const uri = `${process.env.MONGODB_URI}/${process.env.DB_NAME}`;
        console.log("🔗 Connecting to:", uri); // Add this to confirm URI is correct

        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("✅ MongoDB connected");
    } catch (error) {
        console.error("❌ mongoDB failed:", error.message);
        process.exit(1); // Stop app if DB fails
    }
};

module.exports = connectDB;
