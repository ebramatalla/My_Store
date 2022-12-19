const users = [];

const addUser = ({ id, socketId }) => {
  // Clean the data

  // Check for existing user
  const existingUser = users.find((user) => {
    return user.id === id;
  });

  // Validate username
  if (existingUser) {
    return {
      error: "Username is in use!",
    };
  }

  // Store user
  const user = { id, socketId };
  users.push({ id, socketId });
  return { user };
};

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

const getUser = (id) => {
  return users.find((user) => user.id === id);
};
const getAllUser = () => {
  return users;
};

module.exports = {
  addUser,
  removeUser,
  getUser,
  getAllUser,
};
