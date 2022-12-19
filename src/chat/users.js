const users = [];
const admins = [];

// add user
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
// add user
const addAdmin = ({ id, socketId }) => {
  // Check for existing user
  const existingAdmin = admins.find((admin) => {
    return admin.id === id;
  });

  if (existingAdmin) {
    return {
      error: "Username is in use!",
    };
  }

  const admin = { id, socketId };
  admins.push({ id, socketId });
  return { admin };
};

const removeAdmin = (id) => {
  const index = admins.findIndex((admin) => admin.id === id);

  if (index !== -1) {
    return admins.splice(index, 1)[0];
  }
};

const getAllAdmin = () => {
  console.log(admins);
  return admins;
};

module.exports = {
  addUser,
  removeUser,
  getUser,
  getAllUser,
  addAdmin,
  removeAdmin,
  getAllAdmin,
};
