import db from "../models/index";
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

module.exports = {
  getHomePage: homePage,
  getAboutPage: aboutPage,
};
