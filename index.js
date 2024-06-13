const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const { initSocket } = require("./socket/index");
require("dotenv").config();

const App = express();
const PORT = process.env.PORT || 5000;
const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
};
App.use(cors(corsOptions));
App.use(express.json());
App.use(express.urlencoded({ extended: false }));
App.use(cookieParser(process.env.COOKIE_SIGNATURE));

App.use("/api/auth", authRoutes);
App.use("/api/user", userRoutes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (error) => console.error("Database connection error", error));
db.once("open", () => console.log("Database connected"));

const server = App.listen(process.env.PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
initSocket(server, corsOptions);

module.export = App;
