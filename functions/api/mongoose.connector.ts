import mongoose, { Mongoose } from 'mongoose';

export class MongooseConnector {
    public static async connect() {
        const uri: string =
            `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@` +
            `${process.env.DB_HOST}/${process.env.DB_NAME}`;

        if (mongoose.connection.readyState === 1) return;

        try {
            const connectOptions = {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
                useFindAndModify: false,
                autoIndex: false, // Don't build indexes
                poolSize: 10, // Maintain up to 10 socket connections
                serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
                socketTimeoutMS: 45000 // Close sockets after 45 seconds of inactivity
            };

            await mongoose.connect(uri, connectOptions);
            console.log('Successfully connected to MongoDB Atlas');
        } catch (error) {
            console.error(error);
        }
    }

    public static async disconnect() {
        try {
            await mongoose.connection.close();
        } finally {
        }
    }
}
