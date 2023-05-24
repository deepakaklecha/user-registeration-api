const express = require("express");
const connectDB = require("./config/db");
require("dotenv").config();
const app = express();

app.use(express.json());

//mongodb connection
connectDB();

app.use("/api", require("./routes/router"));

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
