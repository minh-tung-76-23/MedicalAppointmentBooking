import db from "../models/index";
import userService from "../services/userService";

let handleLogin = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  //check email exists
  if (!email || !password) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing or invalid email",
    });
  }
  //compare password
  //return userInfo
  let userData = await userService.handleUserLogin(email, password);
  console.log(userData);
  //access token user JWT
  return res.status(200).json({
    errCode: userData.errCode,
    message: userData.errMsg,
    user: userData.user ? userData.user : {},
    accessToken: userData.accessToken,
  });
};

let handleGetAllUsers = async (req, res) => {
  let id = req.query.id;
  if (!id) {
    return res.status(200).json({
      errCode: 1,
      message: "Missing required parameter",
      users: [],
    });
  }
  let users = await userService.getAllUsers(id);
  // console.log(users);
  return res.status(200).json({
    errCode: 0,
    message: "Ok",
    users,
  });
};

module.exports = {
  handleLogin: handleLogin,
  handleGetAllUsers: handleGetAllUsers,
};
