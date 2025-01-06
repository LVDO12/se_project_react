import { useEffect } from "react";

function useModalClose(isOpen, onClose) {
  useEffect(() => {
    if (!isOpen) return;

    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    const handleOverlayClose = (e) => {
      if (e.target.classList.contains("modal")) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscClose);
    document.addEventListener("mousedown", handleOverlayClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
      document.removeEventListener("mousedown", handleOverlayClose);
    };
  }, [isOpen, onClose]);
}

export default useModalClose;
