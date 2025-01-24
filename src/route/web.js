import express from "express";
import homeControllers from "../controllers/homeControllers";
import userControllers from "../controllers/userControllers";

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

  router.post("/api/login", userControllers.handleLogin);
  router.get("/api/get-all-users", userControllers.handleGetAllUsers);
  router.post("/api/create-new-user", userControllers.handelCreateNewUser);
  router.put("/api/edit-user", userControllers.handelEditUser);
  router.delete("/api/del-user", userControllers.handleDeleteUser);

  return app.use("/", router);
};

module.exports = initWebRoutes;
