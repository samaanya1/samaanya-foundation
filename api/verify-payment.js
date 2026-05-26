import crypto from "crypto";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    fundraiser_id,
    donor_name,
    donor_email,
    amount,
  } = req.body ?? {};

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    res.status(400).json({ error: "Missing required payment fields" });
    return;
  }

  const KEY_SECRET = process.env.RAZORPAY_KEY_SECRET?.trim();
  if (!KEY_SECRET) {
    res.status(500).json({ error: "Razorpay credentials are not configured on the server" });
    return;
  }

  const expectedSignature = crypto
    .createHmac("sha256", KEY_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  if (expectedSignature !== razorpay_signature) {
    res.status(400).json({ error: "Payment signature verification failed" });
    return;
  }

  // Record donation in Supabase atomically via RPC
  if (fundraiser_id && amount) {
    const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
    const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (SUPABASE_URL && SERVICE_KEY) {
      try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/record_donation`, {
          method: "POST",
          headers: {
            apikey: SERVICE_KEY,
            Authorization: `Bearer ${SERVICE_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            p_fundraiser_id: fundraiser_id,
            p_amount: Number(amount),
            p_donor_name: donor_name || null,
            p_donor_email: donor_email || null,
            p_payment_id: razorpay_payment_id,
            p_order_id: razorpay_order_id,
          }),
        });

        if (!response.ok) {
          const err = await response.text();
          console.error("[verify-payment] Supabase RPC error:", err);
        }
      } catch (err) {
        // Payment is verified — don't fail the response if recording fails
        console.error("[verify-payment] Supabase recording error:", err);
      }
    } else {
      console.warn("[verify-payment] SUPABASE_SERVICE_ROLE_KEY not set — donation not recorded");
    }
  }

  res.status(200).json({ verified: true, payment_id: razorpay_payment_id });
}
