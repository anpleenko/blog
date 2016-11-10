import * as UserServise from '../services/UserService';

export default async function (req, res, next) {
  const { token } = req;

  try {
    var user = await UserServise.getUserByToken(token);
  } catch ({ message }) {
    return next({
      status: 500,
      message
    })
  }

  req.user = user;
  next();
}
