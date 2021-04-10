var User = require("../models/user");
const { comparePassword, createJWTToken } = require("../helpers/user");
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (email == "" || email == undefined) {
      //
    }
    if (password == "" || password == undefined) {
      //
    }
    const exists = await User.findOne({ email });
    if (exists) {
      const isMatch = await comparePassword(password, exists.password);
      if (isMatch) {
        const token = await createJWTToken(exists);
        return res.status(200).json({
          token: "Bearer " + token,
          user: {
            email: user.email,
            role: user.role,
          },
        });
      } else {
        return res.status(400).send("Wrong password");
      }
    } else {
      return res.status(400).send("User doesn't exists");
    }
  } catch (error) {
    return res.status(500).send("Server error!", error);
  }
};

const signup = async (req, res) => {
  const { email, password, role } = req.body;
  try {
    if (email == "" || email == undefined) {
      return res.status(404).send("Email is required");

    }
    if (password == "" || password == undefined) {
      return res.status(404).send("password is required");

    }
    if (role == "" || role == undefined) {
      return res.status(404).send("Role is required");

    }
    const exists = await User.findOne({ email: email });
    if (exists) {
      return res.status(400).send("Email Already Exis");
    }

    const newUser = new User({
      email,
      password,
      role,
    });
    const user = await newUser.save();
    return res.status(200).json({
      user: {
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(500).send("Server error!", error);

  }
};

var allUsers = async (req, res) => {
  try {
    const users = await User.find();
  } catch (err) {}
};

module.exports = {
  login,
  allUsers,
  signup,
};
