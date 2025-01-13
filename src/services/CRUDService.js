import bcrypt from "bcrypt";
import db from "../models/index";

const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
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
      resolve("successfull!");
    } catch (error) {
      return reject(error);
    }
  });
};

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

let getAllUsers = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = db.User.findAll({
        raw: true,
      });
      resolve(users);
    } catch (error) {
      reject(error);
    }
  });
};

let getInfoUSerById = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({ where: { id: userId }, raw: true });
      if (user) {
        resolve(user);
      } else {
        resolve("User not found!");
      }
    } catch (error) {
      return reject(error);
    }
  });
};

let updateUserData = async (data) => {
  try {
    // Tìm user trong cơ sở dữ liệu
    let user = await db.User.findOne({ where: { id: data.id } });

    if (!user) {
      return "User not found!";
    }

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

    return "User updated successfully!";
  } catch (error) {
    console.error("Error updating user:", error);
    throw error; // Quăng lỗi để xử lý bên ngoài
  }
};

module.exports = {
  createNewUser: createNewUser,
  getAllUsers: getAllUsers,
  getInfoUSerById: getInfoUSerById,
  updateUserData: updateUserData,
};
