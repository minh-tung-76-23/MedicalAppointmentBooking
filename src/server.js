import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import connectDb from "./config/connectDb";
import cors from "cors";
require("dotenv").config();

let app = express();
app.use(
  cors({
    origin: "http://localhost:3000", // Replace with your React app's origin
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

//config app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app);
initWebRoutes(app);

connectDb();

let port = process.env.PORT || 6969;
//Port == undefined => port = 6969

app.listen(port, () => {
  console.log("BackEnd NodeJS listening on port " + port);
});
