import bcrypt from "bcrypt";
import db from "../models/index";

let handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let isExits = await checkUserEmail(email);
      if (isExits) {
        //User is already logged in
        let user = await db.User.findOne({
          where: { email: email },
          attributes: ["email", "roleId", "password"],
          raw: true,
        });
        if (user) {
          //compare password
          let check = await bcrypt.compareSync(password, user.password);
          if (check) {
            userData.errCode = 0;
            userData.errMsg = `User logged in successfully`;
            delete user.password;
            userData.user = user;
            resolve(userData);
          } else {
            userData.errCode = 3;
            userData.errMsg = `Incorrect password`;
          }
        } else {
          userData.errCode = 2;
          userData.errMsg = `User's not found`;
        }
        resolve(userData);
      } else {
        // return error
        userData.errCode = 1;
        userData.errMsg = `Your's email isn't exits int your system. Plz try other email!`;
        resolve(userData);
      }
    } catch (error) {
      reject(error);
    }
  });
};

let checkUserEmail = (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({ where: { email: email } });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (error) {
      reject(error);
    }
  });
};

let getAllUsers = (usersId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = "";
      if (usersId == "All") {
        users = await db.User.findAll({
          attributes: {
            exclude: ["password"],
          },
        });
      }
      if (usersId && usersId != "All") {
        users = await db.User.findOne({
          attributes: {
            exclude: ["password"],
          },
          where: { id: usersId },
        });
      }
      resolve(users);
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  handleUserLogin: handleUserLogin,
  getAllUsers: getAllUsers,
};
