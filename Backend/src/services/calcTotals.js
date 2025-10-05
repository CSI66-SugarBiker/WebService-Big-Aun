export function calcTotals(items) {
  const subtotal = items.reduce((s, it) => s + (it.lineTotal ?? (it.unitPrice * it.qty)), 0);
  const discount = 0, serviceCharge = 0, vat = 0;
  const total = subtotal - discount + serviceCharge + vat;
  return { subtotal, discount, serviceCharge, vat, total };
}
