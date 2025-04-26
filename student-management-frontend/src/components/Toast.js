import React, { useEffect } from 'react';

function Toast({ message, type, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`toast show bg-${type === 'error' ? 'danger' : 'success'} text-white`} role="alert">
      <div className="toast-body d-flex justify-content-between align-items-center">
        {message}
        <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
      </div>
    </div>
  );
}

export default Toast;