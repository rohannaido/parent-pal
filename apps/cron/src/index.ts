import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import { sendReminders } from "./jobs/sendReminders";

const app = express();
const PORT = process.env.PORT || 4000;

const cronJob = async () => {
    console.log("CALLING REMINDER JOB")
    await sendReminders();
};

// setInterval(cronJob, 5 * 60 * 1000);
setInterval(cronJob, 5 * 1000);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
