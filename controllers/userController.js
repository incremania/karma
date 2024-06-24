const User = require("../models/UserModel");
const createTokenUser = require("../utils/createTokenUser");

const getSingleUser = async (req, res) => {
  try {
    const user = await User.findById({ _id: req.user.userId}).select('-password');
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "no user found",
      });
    }

    // delete user.password

    res.status(200).json({
      status: "success",
      user,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllUser = async (req, res) => {
  try {
    const users = await User.find({}).select('-password')
    res.status(200).json({
      status: "success",
      nbHits: users.length,
      users,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// const updateUser = async (req, res) => {
//   try {
//     const { firstname, lastname, email, username, phone, address } = req.body;
//     const userId = req.user.userId;
//     const updatedUser = await User.findOne({ _id: userId });

    
//     // // Update user fields based on the provided data
//     // switch (true) {
//     //   case firstname !== undefined:
//     //     updatedUser.firstname = firstname;
//     //     break;
//     //   case lastname !== undefined:
//     //     updatedUser.lastname = lastname;
//     //     break;
//     //   case email !== undefined:
//     //     updatedUser.email = email;
//     //     break;
//     //   case username !== undefined:
//     //     updatedUser.username = username;
//     //     break;
//     //   case phone !== undefined:
//     //     updatedUser.phone = phone;
//     //     break;
//     //   case address !== undefined:
//     //     updatedUser.address = address;
//     //     break;
//     //   default:
//     //     // No valid field provided for update
//     //     return res.status(400).json({ error: 'No valid fields provided for update' });
//     // }

//     await updatedUser.save();
//     const tokenUser = createTokenUser(updatedUser);
//     res.status(200).json({
//       status: "success",
//       message: "updated successfully",
//       user: tokenUser,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: error.message });
//   }
// };

const updatePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const userId = req.user.userId;
    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        status: "error",
        message: "provide old password and new password",
      });
    }

    const user = await User.findOne({ _id: userId });

    const isPasswordMatch = await user.comparePassword(oldPassword);

  
    if (!isPasswordMatch) {
      return res.status(400).json({
        status: "error",
        message: "old password is incorrect",
      });
    }

    user.password = newPassword;
    await user.save();
    res.status(200).json({
      status: "success",
      message: "password updated successfully",
    });

  } catch (error) {
 
    res.status(500).json({ error: error.message });
  }
};

const showCurrentUser = async (req, res) => {
  
  res.status(200).json({ status: "success", user: req.user });
};

module.exports = {
//   updateUser,
  updatePassword,
  getSingleUser,
  getAllUser,
  showCurrentUser,
};
