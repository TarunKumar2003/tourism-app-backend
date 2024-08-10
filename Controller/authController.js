import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

//create User

const jwt_secretkey =
  "48b9f6c1a8d6b7b7115b650648271dee315ca3000f75e657572eb04e5ae836b388be83b7122ada41a63da65f0d76ef67c64c52728cd44935d72c9889a9a1832f";
export const register = async (req, res) => {
  try {
    // hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      username: req.body.userName,
      email: req.body.email,
      password: hashedPassword,
      photo: req.body.photo,
    });
    const savedUser = await newUser.save();
    res.status(200).json({
      success: true,
      message: "User created successfully",
      data: savedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create User try again ",
    });
  }
};

//login

export const login = async (req, res) => {
  const email = req.body.email;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Wrong Password",
      });
    }

    const { password, role, ...rest } = user._doc;
    //create jwt token
    const token = jwt.sign({ id: user._id, role: user.role }, jwt_secretkey, {
      expiresIn: "15d",
    });

    //set accessToken in browswer cookie
    res
      .cookie("accessToken", token, {
        httpOnly: true,
        maxAge: 15 * 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({
        success: true,
        message: "Login successfully",
        data: { ...rest },
        token,
        role,
      });
    // res.status(200).json({
    //     success: true,
    //     message: "Login successfully",
    //     data: rest,
    //     token
    // });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to login vghtry again ",
    });
  }
};
