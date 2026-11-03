export async function sendOrder(form, items, payment, coupon) {
  const token = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
  const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;
  if (!items.length) throw new Error("orders/invalid-request");

  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const order = {
    id: `EX-${Date.now()}`,
    name: form.get("firstName"),
    phone: form.get("phone"),
    email: form.get("email"),
    address: form.get("address"),
    city: form.get("city"),
    payment,
    items: items.map((item) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      qty: item.qty,
    })),
    total: Math.round(subtotal * (coupon ? 0.9 : 1) * 100) / 100,
    date: new Date().toISOString(),
    telegramSent: false,
  };
  if (!token || !chatId) return order;
  const text = [
    "NEW ORDER",
    `Order: ${order.id}`,
    `Name: ${order.name}`,
    `Phone: ${order.phone}`,
    `Email: ${order.email}`,
    `Address: ${order.address}, ${order.city}`,
    `Payment: ${order.payment}`,
    "",
    ...order.items.map(
      (item) => `${item.name} x${item.qty} — $${item.price * item.qty}`,
    ),
    "",
    `Total: $${order.total}`,
  ].join("\n");

  const response = await fetch(
    `https://api.telegram.org/bot${token}/sendMessage`,
    {
      method: "POST",
      body: new URLSearchParams({ chat_id: chatId, text }),
      signal: AbortSignal.timeout(10000),
    },
  );
  const result = await response.json();
  if (!response.ok || !result.ok) throw new Error("orders/send-failed");
  order.telegramSent = true;
  return order;
}
