import express from "express";
import homeControllers from "../controllers/homeControllers";

let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/", homeControllers.getHomePage);
  router.get("/aboutme", homeControllers.getAboutPage);

  router.get("/minhtung", (req, res) => {
    return res.send("Hello, Minh Tung!");
  });

  return app.use("/", router);
};

module.exports = initWebRoutes;
