import Branch from '../models/Branch.js';

export async function getTheme(req, res) {
  const { branchId } = req.query;
  const b = await Branch.findById(branchId).lean();
  res.json(b?.theme || {});
}

export async function updateTheme(req, res) {
  const { branchId, theme } = req.body;
  const b = await Branch.findByIdAndUpdate(branchId, { theme }, { new:true });
  res.json(b.theme);
}
