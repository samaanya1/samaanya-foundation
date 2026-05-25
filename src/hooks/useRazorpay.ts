import { useCallback } from "react";

interface CheckoutOptions {
  amount: number; // in paise (INR × 100)
  description?: string;
  onSuccess?: (paymentId: string) => void;
  onDismiss?: () => void;
  onError?: (message: string) => void;
}

const SCRIPT_URL = "https://checkout.razorpay.com/v1/checkout.js";

function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (document.querySelector(`script[src="${SCRIPT_URL}"]`)) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = SCRIPT_URL;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export function useRazorpay() {
  const openCheckout = useCallback(async (opts: CheckoutOptions) => {
    const loaded = await loadRazorpayScript();
    if (!loaded) throw new Error("Razorpay SDK failed to load. Check your network connection.");

    // Step 1 — create order on the server
    const orderRes = await fetch("/api/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: opts.amount, currency: "INR" }),
    });

    if (!orderRes.ok) {
      const body = await orderRes.json().catch(() => ({}));
      throw new Error((body as { error?: string }).error ?? "Failed to create payment order");
    }

    const { order_id, amount, currency } = (await orderRes.json()) as {
      order_id: string;
      amount: number;
      currency: string;
    };

    // Step 2 — open Razorpay checkout modal
    return new Promise<void>((resolve, reject) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const rzp = new (window as any).Razorpay({
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        order_id,
        amount,
        currency,
        name: "Hear Bright",
        description: opts.description ?? "Donation",
        theme: { color: "#55B9E7" },

        async handler(response: {
          razorpay_payment_id: string;
          razorpay_order_id: string;
          razorpay_signature: string;
        }) {
          // Step 3 — verify signature on the server
          try {
            const verifyRes = await fetch("/api/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            if (!verifyRes.ok) {
              const body = await verifyRes.json().catch(() => ({}));
              const msg = (body as { error?: string }).error ?? "Payment verification failed";
              opts.onError?.(msg);
              reject(new Error(msg));
              return;
            }

            opts.onSuccess?.(response.razorpay_payment_id);
            resolve();
          } catch (err) {
            const msg = err instanceof Error ? err.message : "Verification error";
            opts.onError?.(msg);
            reject(err);
          }
        },

        modal: {
          ondismiss() {
            opts.onDismiss?.();
            resolve();
          },
        },
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      rzp.on("payment.failed", (response: any) => {
        const msg = (response.error?.description as string | undefined) ?? "Payment failed";
        opts.onError?.(msg);
        reject(new Error(msg));
      });

      rzp.open();
    });
  }, []);

  return { openCheckout };
}
