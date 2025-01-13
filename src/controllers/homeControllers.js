import db from "../models/index";
import CRUDService from "../services/CRUDService";

let homePage = async (req, res) => {
  try {
    let data = await db.User.findAll();
    if (data.length > 0) {
      console.log("--------------------------------");
      console.log(data);
      console.log("--------------------------------");
    } else {
      console.log("No data found in the database");
      return res.render("homePage.ejs", {
        data: "No data found in the database",
      });
    }

    // Convert the data to JSON and send it to the client
    return res.render("homePage.ejs", {
      data: JSON.stringify(data),
    });
  } catch (e) {
    console.log(e);
  }
};

let aboutPage = (req, res) => {
  return res.render("aboutPage.ejs");
};

let CRUD = (req, res) => {
  return res.render("crud.ejs");
};

let postCRUD = async (req, res) => {
  let mesage = await CRUDService.createNewUser(req.body);
  console.log(mesage);
  return res.send("postCRUD");
};

let displayCRUD = async (req, res) => {
  let data = await CRUDService.getAllUsers();
  console.log("--------------------------------");
  console.log(data);
  console.log("--------------------------------");
  return res.render("displayCRUD.ejs", {
    dataTable: data,
  });
};

let editCRUD = async (req, res) => {
  let userId = req.query.id;
  if (userId) {
    let userData = await CRUDService.getInfoUSerById(userId);
    if (userData) {
      console.log("-----------");
      console.log(userData);
      return res.render("editCRUD.ejs", {
        dataUser: userData,
      });
    } else {
      return res.send("User not");
    }
  } else {
    return res.send("User not found");
  }
};

let putCRUD = async (req, res) => {
  let data = req.body;
  await CRUDService.updateUserData(data);
  let allUser = await CRUDService.getAllUsers();
  return res.render("displayCRUD.ejs", {
    dataTable: allUser,
  });
};

let delCRUD = async (req, res) => {
  let userId = req.query.id;
  if (userId) {
    let userData = await CRUDService.delUSerById(userId);
    if (userData) {
      let allUser = await CRUDService.getAllUsers();
      return res.render("displayCRUD.ejs", {
        dataTable: allUser,
      });
    } else {
      return res.send("User not");
    }
  } else {
    return res.send("User not found");
  }
};

module.exports = {
  getHomePage: homePage,
  getAboutPage: aboutPage,
  getCRUD: CRUD,
  postCRUD: postCRUD,
  displayCRUD: displayCRUD,
  editCRUD: editCRUD,
  putCRUD: putCRUD,
  delCRUD: delCRUD,
};
