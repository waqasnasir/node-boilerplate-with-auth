import jwt from 'jsonwebtoken';
import JWT_SECRET from '../constants';


const getToken = (req) => {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    return req.headers.authorization.split(' ')[1];
  }
  if (req.headers.authorization) return req.headers.authorization;
  return (req.query && req.query.token) || req.headers['x-access-token'];
};
const verifyToken = async (req, res, next) => {
  const token = getToken(req);
  if (!token) return res.status(403).send({ success: false, message: 'No token provided.' });
  try {
    const decoded = await jwt.verify(token, JWT_SECRET);
    if (!decoded) return res.status(403).send({ success: false, message: 'token could not be authenticated' });
    // if everything good, save to request for use in other routes
    req.userId = decoded.id;
    return next();
  } catch (error) {
    return res.status(500).send({ success: false, error, message: 'Not a valid token' });
  }
};


export default verifyToken;
