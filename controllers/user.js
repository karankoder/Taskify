import { User } from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { sendCookie } from '../utils/features.js';
import ErrorHandler from '../middlewares/error.js';

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return next(new ErrorHandler('User Already Exists.', 404));
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user = await User.create({ name, email, password: hashedPassword });

    sendCookie(user, res, 201, 'User Registered Successfully');
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return next(new ErrorHandler('Invalid Credentials', 404));
    }

    console.log(user);
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return next(new ErrorHandler('Incorrect Password', 404));
    }
    sendCookie(user, res, 201, 'User Logged In Successfully');
  } catch (error) {
    next(error);
  }
};

export const myProfile = (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    next(error);
  }
};

export const logout = (req, res, next) => {
  res
    .status(200)
    .cookie('token', '', { expires: new Date(Date.now()) })
    .json({
      success: true,
      message: 'Logged Out Successfully',
      user: req.user,
    });
};
