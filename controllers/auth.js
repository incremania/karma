const User = require('../models/UserModel');
const { createToken } = require('../utils/token')
const createTokenUser = require("../utils/createTokenUser");

const register = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Please provide email and password' });
    }


    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const user = await User.create({ email, password, role });

  const tokenUser = createTokenUser(user);
    return res.status(200).json({
      token: createToken({user: tokenUser}),
      status: "success",
      message: "registration successful",
      user: tokenUser,
    })
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ status: "unauthorized", error: "invalid email or password" });
    }
    const validUser = await user.comparePassword(password);
 
    if (!validUser) {
      return res
        .status(401)
        .json({ status: "unauthorized", error: "invalid credentials" });
    }
    
    const tokenUser = createTokenUser(user);
    return res.status(200).json({
      token: createToken({user: tokenUser}),
      status: "success",
      message: "login successful",
      user: tokenUser,
     
    
    });
  } catch (error) {
    
    return res.status(401).json({ error: error.message });
  }
};

module.exports = {
    register,
    login
}