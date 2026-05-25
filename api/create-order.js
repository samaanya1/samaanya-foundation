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

  const { RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET } = process.env;

  if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
    console.error("[create-order] Missing Razorpay env vars");
    res.status(500).json({ error: "Razorpay credentials are not configured on the server" });
    return;
  }

  const credentials = Buffer.from(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`).toString("base64");

  try {
    const rzpRes = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        Authorization: `Basic ${credentials}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: Number(amount),
        currency,
        receipt: `rcpt_${Date.now()}`,
      }),
    });

    const data = await rzpRes.json();

    if (!rzpRes.ok) {
      console.error("[create-order] Razorpay API error:", data);
      res.status(500).json({ error: data?.error?.description ?? "Failed to create Razorpay order" });
      return;
    }

    res.status(200).json({
      order_id: data.id,
      amount: data.amount,
      currency: data.currency,
    });
  } catch (err) {
    console.error("[create-order] Unexpected error:", err);
    res.status(500).json({ error: "Failed to create Razorpay order" });
  }
}
