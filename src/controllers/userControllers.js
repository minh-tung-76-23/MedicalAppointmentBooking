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

let handelCreateNewUser = async (req, res) => {
  let message = await userService.createNewUser(req.body);
  console.log(message);
  return res.status(200).json({
    errCode: message.errCode,
    message: message.message,
    user: message.user ? message.user : {},
  });
};

let handelEditUser = async (req, res) => {
  let data = req.body;
  let message = await userService.updateUser(data);
  console.log(message);
  return res.status(200).json({
    errCode: message.errCode,
    message: message.message,
    user: message.user ? message.user : {},
  });
};

let handleDeleteUser = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      message: "Missing required parameter",
    });
  }
  let message = await userService.deleteUser(req.body.id);
  console.log(message);
  return res.status(200).json({
    errCode: message.errCode,
    message: message.message,
    user: message.user ? message.user : {},
  });
};

module.exports = {
  handleLogin: handleLogin,
  handleGetAllUsers: handleGetAllUsers,
  handelCreateNewUser: handelCreateNewUser,
  handelEditUser: handelEditUser,
  handleDeleteUser: handleDeleteUser,
};
