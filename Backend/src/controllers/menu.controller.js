import MenuItem from '../models/MenuItem.js';

export async function listMenu(req, res) {
  const { branchId } = req.query;
  const items = await MenuItem.find({ branchId, isActive:true }).lean();
  res.json(items);
}

export async function createMenu(req, res) {
  const item = await MenuItem.create(req.body);
  res.status(201).json(item);
}

export async function updateMenu(req, res) {
  const item = await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new:true });
  res.json(item);
}
