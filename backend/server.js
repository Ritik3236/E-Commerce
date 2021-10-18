const app = require('./app');

const dotenv = require("dotenv");
const connectDB = require('./config/database');

// Uncaught error
process.on('uncaughtException', (err) => {
    console.log(`Error : ${err.message}`);
    console.log("Shuting Down server... due to Uncaught Exception")

    server.close(() => {
        process.exit(1)
    });
})

//config
dotenv.config({ path: "backend/config/config.env" });

// Connecting to Database
connectDB()

// Server PORT
server = app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});


// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
    console.log(`Error : ${err.message}`);
    console.log("Shuting Down server... due to Unhandled Promise Rejection")

    server.close(() => {
        process.exit(1)
    });
});