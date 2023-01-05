const path = require('path')
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
app.use(express.urlencoded({ extended: false }));


//Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/tickets", require("./routes/ticketRoutes"));

//Serve front end
if (process.env.NODE_ENV === "production") {
  //set build forlder as static
  app.use(express.static(path.join(__dirname, "../frontend/build")));
 
  app.get("*", (_, res) => {
    res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
  });

} else {
  
  app.get("/", (_, res) => {
    res.status(200).json({ message: "Welcome to the Support Desk API" })
  })

}

//API error handling
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
