import UserService from '../services/user.service';
import Util from '../utils';

const util = new Util();
export const fetchAllUsers = async (req, res) => {
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
};

export const getUserById = async (req, res) => {
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
};

export const signup = async (req, res) => {
  const newUser = req.body;
  try {
    const user = await UserService.createUser(newUser);
    util.setSuccess(201, 'User Added!', user);
    return util.send(res);
  } catch (error) {
    util.setError(400, error.message);
    return util.send(res);
  }
};

export const signin = (req, res) => {
  const { username, password } = req.body;
  return res.send({ username, password });
};

export const updateUser = async (req, res) => {
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
};

export const deleteUser = async (req, res) => {
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
};
