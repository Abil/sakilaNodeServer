import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { OAuth2Client } from "google-auth-library";

import User from "../models/user.js";
import { hashPassword, comparePassword } from "../utils/auth.js";

dotenv.config();

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = "http://127.0.0.1:8000/api/auth/google/callback";

//const JWT_SECRET = process.env.JWT_SECRET;

//const googleClient = new OAuth2Client(CLIENT_ID);
const googleClient = new OAuth2Client({
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  redirectUri: REDIRECT_URI,
});

export const register = async (req, res) => {
  try {
    // 1. destructure name, email, password from req.body
    const { email, name, password } = req.body;
    // 2. all fields require validation

    if (!email) {
      return res.json({ error: "Email is required" });
    }
    if (!name.trim()) {
      return res.json({ error: "Name is required" });
    }
    if (!password || password.length < 6) {
      return res.json({ error: "Password must be at least 6 characters long" });
    }
    // 3. check if email is taken
    const existingUser = await User.findOne({
      where: { email },
    });
    if (existingUser) {
      return res.status(404).json({ error: "Email is taken" });
    }
    // 4. hash password
    const hashedPassword = await hashPassword(password);
    // 5. register user
    // const user = await new User({
    //   name,
    //   email,
    //   password: hashedPassword,
    // }).save();

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // 6. create signed jwt
    const token = jwt.sign({ _id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    // 7. send response
    res.json({
      user: {
        name: user.name,
        email: user.email,
        admin: user.admin,
      },
      token,
    });
  } catch (err) {
    console.log(err);
  }
};

export const login = async (req, res) => {
  try {
    // 1. destructure name, email, password from req.body
    const { email, password } = req.body;
    // 2. all fields require validation
    if (!email) {
      return res.json({ error: "Email is required" });
    }
    if (!password || password.length < 6) {
      return res.json({ error: "Password must be at least 6 characters long" });
    }
    // 3. check if email is taken
    const user = await User.findOne({
      where: { email },
    });
    if (!user) {
      return res.json({ error: "User not found" });
    }
    // 4. compare password
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.json({ error: "Wrong password" });
    }
    // 5. create signed jwt
    const token = jwt.sign({ _id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    // 7. send response
    res.json({
      user: {
        name: user.name,
        email: user.email,
        admin: user.admin,
      },
      token,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findByPk(req.user._id);

    // check password length
    if (password && password.length < 6) {
      return res.json({
        error: "Password is required and should be min 6 characters long",
      });
    }

    // hash the password
    const hashedPassword = password ? await hashPassword(password) : undefined;

    user.password = hashedPassword || user.password;
    user.name = name || user.name;
    user.email = email || user.email;
    await user.save();
    delete user.dataValues.password; //Interesting
    res.json(user);
  } catch (err) {
    console.log(err);
  }
};

// Delete an existing user
export const deleteUser = async (req, res) => {
  const { userId } = req.params;
  if (req.user._id == userId) {
    return res.status(404).json({ error: "Can not delete yourself" });
  }
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    await user.destroy();
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const googleLogin = async (req, res) => {
  try {
    const url = googleClient.generateAuthUrl({
      access_type: "offline",
      scope: ["email", "profile"], // Scopes for accessing user's email and profile info
      redirect_uri: REDIRECT_URI,
    });
    //console.log("redirect url: ", url);
    res.json({ google_redirection_url: url });
  } catch (error) {
    console.log("error in google login: ", error);
  }
};

export const googleCallback = async (req, res) => {
  try {
    const { code } = req.query;
    const { tokens } = await googleClient.getToken(code);
    //console.log("Tokens: ", tokens);

    // Verify and decode the id token
    const ticket = await googleClient.verifyIdToken({
      idToken: tokens.id_token,
      audience: CLIENT_ID,
    });

    const payload = ticket.getPayload();
    //const userId = payload["sub"];
    const email = payload["email"];
    const name = payload["name"];

    // console.log("Sub: ", userId);
    // console.log("Email:", email);
    // console.log("Name:", name);

    const existingUser = await User.findOne({
      where: { email },
    });
    if (existingUser) {
      const token = jwt.sign({ _id: existingUser.id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      // res.json({
      //   user: {
      //     name: existingUser.name,
      //     email: existingUser.email,
      //     admin: existingUser.admin,
      //   },
      //   token,
      // });

      res.redirect(
        `http://127.0.0.1:3000/auth/callback?name=${existingUser.name}&email=${existingUser.email}&admin=${existingUser.admin}&token=${token}`
      );
    } else {
      const user = await User.create({
        name,
        email,
      });

      const token = jwt.sign({ _id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      res.redirect(
        `http://127.0.0.1:3000/auth/callback?name=${user.name}&email=${user.email}&admin=${user.admin}&token=${token}`
      );
    }
  } catch (error) {
    console.log("Error in google callback: ", error);
  }
};
