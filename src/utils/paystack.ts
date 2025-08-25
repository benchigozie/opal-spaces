import PaystackPop from "@paystack/inline-js";

export type PaystackPaymentOptions = {
  email: string;
  amountNaira: number;
  reference?: string;
  metadata?: Record<string, unknown>;
  onSuccess: (reference: string) => void;
  onCancel?: () => void;
};

export function startPaystackPayment({
  email,
  amountNaira,
  reference,
  metadata,
  onSuccess,
  onCancel,
}: PaystackPaymentOptions) {
  const key = import.meta.env.VITE_PAYSTACK_TEST_PUBLIC_KEY as string;
  if (!key) throw new Error("Missing VITE_PAYSTACK_PUBLIC_KEY");


  const handler = PaystackPop.setup({
    key,
    email,
    amount: Math.round(amountNaira * 100), // NGN → kobo
    ref: reference ?? `opal_${Date.now()}`,
    metadata,
    callback: (res) => onSuccess(res.reference),
    onClose: () => onCancel?.(),
  });

  handler.openIframe();
}
