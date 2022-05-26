const sendResponse = (res, status, data, message = "No message included.") => {
  return res.status(status).json({ status, data, message });
};

const findUser = (users, userId) => {
  const user = users.find((user) => user.id === userId) || null;
  return user.deleted ? null : user;
};

const findUsername = (users, username) => {
  if (
    users.filter((user) => user.name.toLowerCase() === username.toLowerCase())
      .length > 0
  ) {
    return true;
  } else return false;
};

const findUserIndex = (users, userId) => {
  const idx = users.findIndex((user) => user.id === userId);
  return idx !== -1 ? idx : null;
};

module.exports = { findUser, findUserIndex, sendResponse, findUsername };
