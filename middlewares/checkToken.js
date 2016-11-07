import jwt from 'jsonwebtoken';
import config from '../config';

export default async (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res
      .status(403)
      .json({ message: 'Forbidden. No token !' });
  }

  try {
    var tokenObj = jwt.verify(token, config.secret);
  } catch ({ message }) {
    return res
      .status(400)
      .json({ message });
  }

  console.log(tokenObj);
  next();
}
