import React from "react";
import QRCode from "react-qr-code";

const GCashQRModal = ({ isOpen, onClose, amount }) => {
  if (!isOpen) return null;

  // Simulated GCash payment link
  const gcashPaymentURL = `https://gcash.com/pay?amount=${amount}`;

  // Calculate total amount
  const totalAmount = amount.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-[340px] rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="rounded-t-2xl bg-gradient-to-r from-[#0072ff] to-[#0052cc] p-4 text-white">
          <h2 className="text-center text-lg font-bold tracking-wide">
            GCash Payment
          </h2>
        </div>

        {/* Content */}
        <div className="flex flex-col items-center p-6">
          {/* GCash Logo (static version) */}
          <div className="mb-3 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0072ff] font-bold text-white">
              G
            </div>
            <span className="text-lg font-semibold text-[#0052cc]">GCash</span>
          </div>

          {/* QR Code */}
          <div className="rounded-xl border border-[#dce3f3] bg-[#f7f9fc] p-3">
            <QRCode value={gcashPaymentURL} size={180} />
          </div>

          {/* Amount */}
          <p className="mt-4 text-sm text-gray-600">Scan this QR code to pay</p>
          <p className="mt-1 text-lg font-bold text-[#0052cc]">
            ₱{totalAmount.toLocaleString()}
          </p>

          {/* Instruction Divider */}
          <div className="my-4 h-[1px] w-full bg-[#e5e7eb]" />

          {/* Footer */}
          <div className="text-center text-xs text-gray-500">
            Make sure you use your GCash app to scan this QR code.
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="mt-6 w-full rounded-lg bg-[#0052cc] py-2 font-semibold text-white transition hover:bg-[#003d99]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default GCashQRModal;
