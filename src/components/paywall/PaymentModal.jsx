import React, { useEffect } from "react";
import { X } from "lucide-react";

const UPI_QR_PATH = "/qr/upi-qr.png";

export default function PaymentModal({ isOpen, onClose, onPaymentComplete, isSubmitting }) {
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePaid = () => {
    onPaymentComplete?.();
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <div
        className="relative w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 p-6 sm:p-8"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-black text-slate-900 pr-8">
          Complete Your Payment
        </h2>
        <p className="mt-1 text-sm text-slate-600">
          Pay ₹500 to unlock the full AI research report.
        </p>

        <div className="mt-6 flex flex-col items-center">
          <div className="w-48 h-48 rounded-xl border-2 border-slate-200 bg-slate-50 flex items-center justify-center overflow-hidden relative">
            <img
              src={UPI_QR_PATH}
              alt="UPI QR Code - Scan to pay ₹500"
              className="w-full h-full object-contain"
              onError={(e) => {
                e.target.style.display = "none";
                const fallback = e.target.nextElementSibling;
                if (fallback) fallback.classList.remove("hidden");
              }}
            />
            <div className="hidden absolute inset-0 flex flex-col items-center justify-center text-center text-slate-500 text-sm p-4 bg-slate-100">
              <p className="font-semibold">QR code</p>
              <p className="text-xs mt-1">Add image at public/qr/upi-qr.png</p>
            </div>
          </div>
          <p className="mt-3 text-sm font-semibold text-slate-700">
            Scan this UPI QR to pay ₹500
          </p>
        </div>

        <ol className="mt-5 text-xs text-slate-600 space-y-2 list-decimal list-inside">
          <li>Open any UPI app</li>
          <li>Scan the QR code</li>
          <li>Complete payment of ₹500</li>
          <li>Click <strong>I Have Paid</strong></li>
        </ol>

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={handlePaid}
            disabled={isSubmitting}
            className="flex-1 order-2 sm:order-1 rounded-xl bg-slate-900 text-white text-sm font-extrabold py-3.5 shadow-lg hover:bg-slate-800 active:scale-[0.98] transition disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Saving…" : "I Have Paid"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 order-1 sm:order-2 rounded-xl border-2 border-slate-200 text-slate-700 text-sm font-bold py-3.5 hover:bg-slate-50 active:scale-[0.98] transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
