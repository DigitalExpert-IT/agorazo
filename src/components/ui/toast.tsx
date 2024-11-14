import React, { useEffect } from 'react';

interface ToastProps {
  message: string;
  status: string;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, status, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-10 left-0 right-0 z-auto flex items-center justify-center w-full animate-fadeIn">
      <div className={`bg-gray-600 text-white rounded shadow-lg`}>
        <div className='flex flex-row justify-center gap-10 p-4'>
        <div className={`w-10 h-10 flex items-center justify-center rounded-full ${status === "error" ? "bg-red-500" : "bg-green-500"}`}>
          <img src={status === "error" ? "/error.svg" : "/success.svg"} alt={status} className='max-w-8'/>
        </div>
          <p className='font-600 text-md font-bold whitespace-nowrap overflow-hidden mt-1'>{message}</p>
          <img src='/close.svg' alt='close' onClick={onClose} className='max-w-3'/>
        </div>
      </div>
    </div>
  );
};
