const express = require("express");
const colors = require("colors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDb = require("./config/db");
const path = require("path");

// dotenv config
dotenv.config();

// mongoDb connection
connectDb();

//rest object
const app = express();

// middleware
app.use(express.json());
app.use(morgan("dev"));

// require routes
const user = require("./routes/userRoutes");
const admin = require("./routes/adminRoutes");
const doctor = require("./routes/doctorRoutes");
const patient = require("./routes/patientRoutes");

// routes
app.use("/api/v1/user", user);
app.use("/api/v1/admin", admin);
app.use("/api/v1/doctor", doctor);
app.use("/api/v1/patient", patient);

// accessing static files
app.use(express.static(path.join(__dirname, "./client/build")));

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// listen port
const port = process.env.PORT || 6000;

app.listen(port, () => {
  console.log(
    `Server Running in ${process.env.NODE_MODE} Mode on Port : ${process.env.PORT} `
      .bgCyan.white
  );
});
