export default function handler(req, res) {
  res.status(200).json({
    has_key_id: !!process.env.RAZORPAY_KEY_ID,
    has_key_secret: !!process.env.RAZORPAY_KEY_SECRET,
    key_id_preview: process.env.RAZORPAY_KEY_ID
      ? process.env.RAZORPAY_KEY_ID.substring(0, 8) + "..."
      : "NOT SET",
  });
}
