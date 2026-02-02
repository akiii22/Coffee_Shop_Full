import React from "react";
import ReactModal from "react-modal";

ReactModal.setAppElement("#root");

function ConfirmationModal({ isOpen, onRequestClose, onConfirm, message }) {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Confirmation Modal"
      className="fixed left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 transform rounded-lg bg-[#fefcf9] p-6 shadow-lg outline-none"
      overlayClassName="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center"
    >
      <h2 className="mb-4 text-xl font-bold text-[#3e2f1c]">Confirm Action</h2>
      <p className="mb-6 text-[#6b5f52]">{message}</p>
      <div className="flex justify-end gap-4">
        <button
          onClick={onRequestClose}
          className="rounded border border-[#6b5f52] px-4 py-2 text-[#6b5f52] transition-all hover:bg-[#e8e3dd]"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="rounded bg-[#b3472a] px-4 py-2 text-white transition-all hover:bg-[#7a2b16]"
        >
          Confirm
        </button>
      </div>
    </ReactModal>
  );
}

export default ConfirmationModal;
