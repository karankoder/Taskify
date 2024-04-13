import { User } from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { sendCookie } from '../utils/features.js';

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(404)
        .json({ success: false, message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user = await User.create({ name, email, password: hashedPassword });

    sendCookie(user, res, 201, 'User Registered Successfully');
  } catch {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: 'Invalid Credentials' });
    }

    console.log(user);
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(404)
        .json({ success: false, message: 'Incorrect Password' });
    }
    sendCookie(user, res, 201, 'User Logged In Successfully');
  } catch {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

export const myProfile = (req, res) => {
  try {
    res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

export const logout = (req, res) => {
  res
    .status(200)
    .cookie('token', '', { expires: new Date(Date.now()) })
    .json({
      success: true,
      message: 'Logged Out Successfully',
      user: req.user,
    });
};
