import express from 'express';
import cors from 'cors';
import connection from './config/connection.js';
import urlRoute from './routes/url.js';
import config from './config/config.js';


const { connectToDatabase, closeDatabase } = connection;
const app = express();
const PORT = config.port;

try{
        connectToDatabase();
        console.log("Connected to MongoDB");

        app.use(express.json());
        app.use(cors());
        app.use("/url", urlRoute);

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });

        // Handle server shutdown gracefully
        process.on('SIGINT', async () => {
            closeDatabase();
            process.exit(0);
        });
    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }