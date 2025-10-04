import User from '../models/User.js';
import { compare } from '../utils/hash.js';
import { sign } from '../utils/jwt.js';

export async function login(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).populate('branchId');
  if (!user) return res.status(401).json({ message:'Invalid credentials' });
  const ok = await compare(password, user.passwordHash || '');
  if (!ok) return res.status(401).json({ message:'Invalid credentials' });
  const token = sign({ uid: user._id, role: user.role, branchId: user.branchId._id });
  res.json({ token, user: { id:user._id, name:user.name, role:user.role, branchId:user.branchId._id }});
}
