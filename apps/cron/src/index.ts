import express from "express";

const app = express();

const cronJob = async () => {
    console.log("CALLING REMINDER JOB")
    try {

        const response = await fetch('http://localhost:3000/api/reminders/job', {
            method: 'POST',
        });

    } catch (error) {
        console.error('Error hitting endpoint:', error);
    }
};

setInterval(cronJob, 5 * 60 * 1000);

app.listen(4000, () => {
    console.log("Server is running on port 4000");
});
