let homePage = (req, res) => {
  return res.render("homePage.ejs");
};

let aboutPage = (req, res) => {
  return res.render("aboutPage.ejs");
};

module.exports = {
  getHomePage: homePage,
  getAboutPage: aboutPage,
};
