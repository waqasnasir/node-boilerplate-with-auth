import bCrypt from 'bcrypt-nodejs';
import jwt from 'jsonwebtoken';
import UserService from '../services/user.service';
import Util from '../utils';
import JWT_SECRET from '../constants';

const util = new Util();
export default {
  fetchAllUsers: async (req, res) => {
    try {
      const users = await UserService.getAllUsers();
      if (users.length > 0) {
        util.setSuccess(200, 'Users retrieved', users);
      } else {
        util.setSuccess(200, 'No user found');
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  },
  getUserById: async (req, res) => {
    const userId = req.params.id;
    try {
      const user = await UserService.getUserById(userId);
      if (!user) {
        util.setError(200, 'Could not find user with the given id');
        return util.send(res);
      }
      util.setSuccess(200, 'User Retrieved', user);
      return util.send(res);
    } catch (error) {
      util.setError(500, 'Something went wrong', error);
      return util.send(res);
    }
  },
  signup: async (req, res) => {
    const newUser = req.body;
    try {
      const existingUser = await UserService.getUserByEmail(newUser.email);
      // if user already exist.
      if (existingUser) {
        util.setError(400, 'User with this email already exist');
        return util.send(res);
      }
      const hashedPass = bCrypt.hashSync(newUser.password, bCrypt.genSaltSync(8), null);
      const user = await UserService.createUser({ ...newUser, password: hashedPass });
      util.setSuccess(201, 'User Added!', user);
      return util.send(res);
    } catch (error) {
      util.setError(400, error.message);
      return util.send(res);
    }
  },
  signin: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await UserService.getUserByEmail(email);
      if (!user) {
        util.setError(404, 'User does not exist');
        return util.send(res);
      }
      const validPassword = await bCrypt.compareSync(password, user.password);
      if (!validPassword) {
        util.setError(400, 'Password is incorrect');
        return util.send(res);
      }
      // expires in 24 hours
      const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: 86400 });
      const {
        username, first, last, phone, id
      } = user;
      util.setSuccess(200, 'Successfully logged In', {
        id, email, first, last, phone, username, token
      });
      return util.send(res);
    } catch (error) {
      util.setError(400, 'Something went wrong');
      return util.send(res);
    }
  },
  updateUser: async (req, res) => {
    const userId = req.params.id;
    const alteredUser = req.body;
    try {
      const updatedUser = await UserService.updateUser(userId, alteredUser);
      if (!updatedUser) {
        util.setError(200, 'Could not find user with the given id');
        return util.send(res);
      }
      util.setSuccess(200, 'User has been successfully updated', updatedUser);
      return util.send(res);
    } catch (error) {
      util.setError(500, 'Something went wrong', error);
      return util.send(res);
    }
  },
  deleteUser: async (req, res) => {
    const userId = req.params.id;
    try {
      const deletedUser = await UserService.deleteUser(userId);
      if (!deletedUser) {
        util.setError(200, 'Could not find user with the given id');
        return util.send(res);
      }
      util.setSuccess(200, 'User has been successfully deleted', deletedUser);
      return util.send(res);
    } catch (error) {
      util.setError(500, 'Something went wrong', error);
      return util.send(res);
    }
  }
};
