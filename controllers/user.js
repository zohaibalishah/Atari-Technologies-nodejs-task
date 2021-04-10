var User = require("../models/user");
const { comparePassword, createJWTToken } = require("../helpers/user");
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (email == "" || email == undefined) {
      return res.status(404).send("Email is required");
    }
    if (password == "" || password == undefined) {
      return res.status(404).send("password is required");
    }
    const user = await User.findOne({ email });
    if (user) {
      const isMatch = await comparePassword(password, user.password);
      if (isMatch) {
        const token = await createJWTToken(user);
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
  } catch (err) {
    return res.status(500).json({ err: err.message });

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
  } catch (err) {
    return res.status(500).json({ err: err.message });

  }
};

var allUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(200).json({users});
  } catch (err) {
   return res.status(500).json({ err: err.message });

  }
};

module.exports = {
  login,
  allUsers,
  signup,
};
