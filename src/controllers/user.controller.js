export const getAllUsers = (req, res) => {
  return res.send([{ username: 'waqas', email: 'nasir@gmail.com' }]);
};

export const getUserById = (req, res) => {
  const userId = req.params.id;
  return res.send({ username: 'single user', email: 'nasir@gmail.com', id: userId });
};

export const signup = (req, res) => {
  const newUser = req.body;
  return res.send({ user: newUser });
};

export const signin = (req, res) => {
  const { username, password } = req.body;
  return res.send({ username, password });
};
