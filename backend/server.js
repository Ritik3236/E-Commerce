const app = require('./app');

const dotenv = require("dotenv");
const connectDB = require('./config/database');

//config

dotenv.config({ path: "backend/config/config.env" });

// Connecting to Database

connectDB()

// Server PORT

app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
})
