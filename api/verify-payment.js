import crypto from "crypto";

export default function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body ?? {};

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    res.status(400).json({ error: "Missing required payment fields" });
    return;
  }

  if (!process.env.RAZORPAY_KEY_SECRET) {
    res.status(500).json({ error: "Razorpay credentials are not configured on the server" });
    return;
  }

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  if (expectedSignature !== razorpay_signature) {
    // Signature mismatch — do NOT mark this payment as complete
    res.status(400).json({ error: "Payment signature verification failed" });
    return;
  }

  res.status(200).json({ verified: true, payment_id: razorpay_payment_id });
}
