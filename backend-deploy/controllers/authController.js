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

    console.log('Registering user with password length:', password.length);
    const hashedPassword = await hashPassword(password);
    console.log(
      'Password hashed successfully, hash length:',
      hashedPassword.length
    );

    const user = await UserModel.create({
      email,
      firstname,
      lastname,
      password: hashedPassword,
    });

    return res.json(user);
  } catch (error) {
    console.log('Registration error:', error.message);
    res.json({ error: 'An error occurred during registration' });
  }
};

//login endpoint
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.json({
        error: 'Email and password are required',
      });
    }

    //check user exists
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      return res.json({
        error: 'User not found',
      });
    }

    //check passwords match
    const match = await comparePasswords(password, user.password);
    console.log('Password comparison result:', match);

    if (!match) {
      return res.json({
        error: 'Passwords do not match',
      });
    }

    // If passwords match, generate JWT token
    jwt.sign(
      {
        email: user.email,
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
      },
      process.env.JWT_SECRET,
      {},
      (error, token) => {
        if (error) {
          throw error;
        }
        res.cookie('token', token).json(user);
      }
    );
  } catch (error) {
    console.log('Login error:', error.message);
    res.json({ error: 'An error occurred during login' });
  }
};

export const getProfile = async (req, res) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.json(null);
    }

    jwt.verify(token, process.env.JWT_SECRET, {}, (error, user) => {
      if (error) {
        console.log('JWT verification error:', error.message);
        return res.json(null);
      }
      console.log('Profile user:', user);
      res.json(user);
    });
  } catch (error) {
    console.log('Profile error:', error.message);
    res.json(null);
  }
};

//logout endpoint
export const logoutUser = async (req, res) => {
  try {
    // Clear the JWT token cookie
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    console.log('Logout error:', error.message);
    res.json({ error: 'An error occurred during logout' });
  }
};
