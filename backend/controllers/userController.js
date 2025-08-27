import UserModel from '../models/user.js';
import mongoose from 'mongoose';

export const createUser = async (req, res) => {
  const { email, firstname, lastname, password } = req.body;

  if (!email || !firstname || !lastname || !password) {
    return res
      .status(400)
      .json({ success: false, message: 'Please enter all fields' });
  }

  const newUser = new UserModel({ email, firstname, lastname, password });

  try {
    await newUser.save();
    res.status(201).json({ success: true, data: newUser });
  } catch (error) {
    console.error(`Error while creating user: ${error.message}`);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const user = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(id, user, {
      new: true,
    });
    res.status(200).json({ success: true, data: updatedUser });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.error(`Error while fetching users: ${error.message}`);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email: email }).then((user) => {
    if (user) {
      if (user.password === password) {
        res.status(200).json({ success: true });
      } else {
        res.status(400).json({
          success: false,
          message: 'Incorrect Password',
        });
      }
    } else {
      res.status(404).json({ success: false, message: 'User not found' });
    }
  });
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ success: false, message: 'User not found' });
  }

  try {
    await User.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
