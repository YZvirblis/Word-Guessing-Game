let users = [];

const userJoin = (id, room) => {
  const isExisting = getUserById(id) ? true : false;
  if (isExisting) {
    return;
  }
  const isFull = getUserByRoom(room).length >= 2 ? true : false;
  if (isFull) {
    return;
  }
  const user = { id, room };
  users.push(user);
  return user;
};

const getAllUsers = () => {
  return users;
};

const getUserById = (id) => {
  return users.find((user) => user.id === id);
};

const getUserByRoom = (room) => {
  const roomUsers = [];
  users.forEach((user) => {
    user.room === room && roomUsers.push(user);
  });
  return roomUsers;
};

module.exports = {
  userJoin,
  getUserByRoom,
  getAllUsers,
};
