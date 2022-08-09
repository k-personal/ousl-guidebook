const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

const subjectRoute = require("./routes/subject");

dotenv.config();

//connect DB
mongoose.connect(
  process.env.MONGO_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("connected to Database")
);

//Middleware
// app.use(express.static("public"));
app.use(express.json({ limit: "1mb" }));
app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res) => {
  res.send("api running");
});

app.use("/api/subject", subjectRoute);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`server running in port ${port}`));
