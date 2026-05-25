import Razorpay from "razorpay";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { amount, currency = "INR" } = req.body ?? {};

  if (!amount || Number(amount) < 100) {
    res.status(400).json({ error: "Amount must be at least 100 paise (₹1)" });
    return;
  }

  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    res.status(500).json({ error: "Razorpay credentials are not configured on the server" });
    return;
  }

  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  try {
    const order = await razorpay.orders.create({
      amount: Number(amount),
      currency,
      receipt: `rcpt_${Date.now()}`,
    });

    res.status(200).json({
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (err) {
    console.error("[create-order] Razorpay error:", err);
    res.status(500).json({ error: "Failed to create Razorpay order" });
  }
}
