import { generateToken } from "../lib/utils.js";
import User from "../models/user_model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    //Password should min 6 characters
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Passwprd must be atleast 6 characters" });
    }

    //Email
    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "Email already exists" });

    //Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password,
    });

    //
    if (newuser) {
      //generate jwt token
      generateToken(newUser._id, res);
      await newUser.save();

      // 201 -> success
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = (req, res) => {
  res.send("login route");
};

export const logout = (req, res) => {
  res.send("logout route");
};
