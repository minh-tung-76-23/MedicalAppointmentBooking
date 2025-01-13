import express from "express";
import homeControllers from "../controllers/homeControllers";

let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/", homeControllers.getHomePage);
  router.get("/aboutme", homeControllers.getAboutPage);
  router.get("/CRUD", homeControllers.getCRUD);

  router.post("/post-crud", homeControllers.postCRUD);
  router.get("/get-crud", homeControllers.displayCRUD);

  router.get("/edit-crud", homeControllers.editCRUD);
  router.post("/put-crud", homeControllers.putCRUD);

  router.get("/del-crud", homeControllers.delCRUD);

  return app.use("/", router);
};

module.exports = initWebRoutes;
