import databse from '../models';

const { User } = databse;

const getAllUsers = async () => {
  return User.findAll();
};


const createUser = async (user) => {
  return User.create(user);
};

const updateUser = async (userId, alteredUser) => {
  const userToUpdate = await User.findByPk(userId);
  if (!userToUpdate) return null;
  const updatedRows = await User.update(alteredUser, { where: { id: userId } });
  if (updatedRows) {
    return User.findByPk(userId);
  }
  return updatedRows;
};

const deleteUser = async (userId) => {
  const userToUpdate = await User.findByPk(userId);
  if (!userToUpdate) return null;
  return User.destroy({ where: { id: userId } });
};

const getUserById = async (userId) => {
  return User.findByPk(userId);
};

export default {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  getUserById
};
