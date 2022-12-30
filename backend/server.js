const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require('./config/db')
const PORT = process.env.PORT || 8000;

//connecting to DB
connectDB()

const app = express();

//adding middleware to parse request data to json
app.use(express.json());
//adding middlewar for url encoded form
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to support desk API!" });
});

//Routes
app.use("/api/users", require("./routes/userRoutes"));
//Routes
app.use("/api/tickets", require("./routes/ticketRoutes"));

//API error handling
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
