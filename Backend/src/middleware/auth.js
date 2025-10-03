import { verify } from '../utils/jwt.js';

export function auth(required = true) {
  return (req, res, next) => {
    const auth = req.headers.authorization || '';
    const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
    if (!token) return required ? res.status(401).json({ message:'Unauthorized' }) : next();
    try {
      req.user = verify(token);
      return next();
    } catch {
      return res.status(401).json({ message:'Invalid token' });
    }
  };
}
