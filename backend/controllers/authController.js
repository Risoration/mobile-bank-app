import UserModel from '../models/user.js';
import { hashPassword, comparePasswords } from '../helpers/auth.js';
import jwt from 'jsonwebtoken';

export const test = async (req, res) => {
  res.json('test is working');
};

//register endpoint
export const registerUser = async (req, res) => {
  try {
    const { email, firstname, lastname, password } = req.body;
    const exist = await UserModel.findOne({ email: email });
    if (exist) {
      return res.json({
        error: 'Email is taken',
      });
    }
    if (!email) {
      return res.json({
        error: 'Email is required',
      });
    }
    if (!password || password.length < 6) {
      return res.json({
        error: 'Password is required and must be at least 6 characters long',
      });
    }
    if (!firstname || !lastname) {
      return res.json({
        error: 'Name is required',
      });
    }

    const hashedPassword = await hashPassword(password);

    const user = await UserModel.create({
      email,
      firstname,
      lastname,
      password: hashedPassword,
    });

    return res.json(user);
  } catch (error) {
    console.log(error.message);
  }
};

//login endpoint
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    //check user exists
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      return res.json({
        error: 'User not found',
      });
    }

    //check passwords match
    const match = await comparePasswords(password, user.password);
    if (match) {
      jwt.sign(
        { email: user.email, id: user._id, firstname: user.firstname },
        process.env.JWT_SECRET,
        {},
        (error, token) => {
          if (error) {
            throw error;
          }
          res.cookie('token', token).json(user);
        }
      );
    }
    if (!match) {
      return res.json({
        error: 'Passwords do not match',
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const getProfile = async (req, res) => {
  const { token } = req.cookies;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, (error, user) => {
      if (error) throw error;
      res.json(user);
    });
  } else {
    res.json(null);
    console.log('Invalid token');
  }
};
