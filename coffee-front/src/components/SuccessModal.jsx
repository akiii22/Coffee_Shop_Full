import React from "react";
import ReactModal from "react-modal";

ReactModal.setAppElement("#root");

function SuccessModal({ isOpen, onRequestClose, message }) {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Success Modal"
      className="fixed left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 transform rounded-lg bg-white p-6 shadow-lg outline-none"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div className="text-center">
        <h2 className="mb-4 text-xl font-bold">Success!</h2>
        <p className="mb-6 text-gray-700">{message}</p>
        <button
          onClick={onRequestClose}
          className="rounded bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-600"
        >
          Close
        </button>
      </div>
    </ReactModal>
  );
}

export default SuccessModal;
