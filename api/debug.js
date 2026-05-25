export default function handler(req, res) {
  res.status(200).json({
    key_id: process.env.RAZORPAY_KEY_ID ?? "NOT SET",
    has_key_secret: !!process.env.RAZORPAY_KEY_SECRET,
    key_secret_length: process.env.RAZORPAY_KEY_SECRET?.length ?? 0,
  });
}
