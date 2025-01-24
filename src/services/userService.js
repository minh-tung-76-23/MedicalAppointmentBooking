import bcrypt from "bcrypt";
import db from "../models/index";
const salt = bcrypt.genSaltSync(10);

let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (e) {
      return reject(e);
    }
  });
};

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

let createNewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let check = await checkUserEmail(data.email);
      if (check == true) {
        resolve({
          errCode: 1,
          message: `Email already exists in the system`,
        });
      } else {
        let hashPasswordFromBcrypt = await hashUserPassword(data.password);
        //   console.log(data);
        //   console.log(hashPasswordFromBcrypt);
        await db.User.create({
          email: data.email,
          password: hashPasswordFromBcrypt,
          firstName: data.firstName,
          lastName: data.lastName,
          address: data.address,
          phoneNumber: data.phoneNumber,
          gender: data.gender === "1" ? true : false,
          // image: data.image,
          roleId: data.roleId,
          // positionId: data.positionId,
        });
        resolve({
          errCode: 0,
          message: `User created successfully`,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

let updateUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 2,
          message: "User ID is required to update",
        });
      }
      // Tìm user trong cơ sở dữ liệu
      let user = await db.User.findOne({ where: { id: data.id }, raw: false });

      if (!user) {
        resolve("User not found!");
      } else {
        // Cập nhật các trường dữ liệu
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.address = data.address;
        user.phoneNumber = data.phoneNumber;
        user.gender = data.gender == "1"; // Chuyển đổi trực tiếp thành boolean
        user.roleId = data.roleId;

        console.log("Updated User Data:", user);

        // Lưu lại trong cơ sở dữ liệu
        await user.save();
        resolve({
          errCode: 0,
          message: `User with ID ${data.id} updated successfully`,
        });
      }
    } catch (error) {
      resolve({
        errCode: 1,
        message: `Error updating user with ID ${data.id}: ${error.message}`,
      });
    }
  });
};

let deleteUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const rowsDeleted = await db.User.destroy({
        where: {
          id: userId,
        },
      });

      if (rowsDeleted === 0) {
        resolve({
          errCode: 2,
          message: `User with ID ${userId} not found`,
        });
      }

      resolve({
        errCode: 0,
        message: `User with ID ${userId} deleted successfully`,
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  handleUserLogin: handleUserLogin,
  getAllUsers: getAllUsers,
  createNewUser: createNewUser,
  updateUser: updateUser,
  deleteUser: deleteUser,
};
