const express = require("express");
const app = express();
const connectDB = require("./config/database");

const cookieParser = require("cookie-parser");




app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));


// app.use("/", authRouter);
// app.use("/", studentAuthRouter);
// app.use("/", examRouter);
// app.use("/", adminRouter);

connectDB()
  .then(() => {
    console.log("Database is connected");
    app.listen(5555, () => {
      console.log("Server is successfully listening to port 5555");
    });
  })
  .catch((err) => {
    console.log("Database is not connected", err);
  });
