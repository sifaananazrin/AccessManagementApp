import mongoose from 'mongoose';

export async function connect() {
    try {
        await mongoose.connect("mongodb+srv://shifananazrin15:banununu@cluster0.cwyjufj.mongodb.net/", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Database is connected!");
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
};

