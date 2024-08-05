import React, { useState } from 'react';

const Modal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className='container mx-auto py-10'>
        <button onClick={toggleModal} className='bg-slate-600 text-white px-3 py-2'>
          OPEN MODAL
        </button>
      </div>

      {/* Modal Overlay */}
      
      <div className={`fixed inset-0  ${isOpen ? 'flex' : 'hidden'} items-center justify-center bg-black bg-opacity-50 z-50`}>
        <div className={` bg-white rounded-lg shadow-lg p-6 relative  transition-all duration-500 ${isOpen ? 'scale-100 opacity-100 w-2/4' : ' scale-125 opacity-0 w-0'}`}>
          <button
            onClick={toggleModal}
            className="absolute top-2 right-2 text-2xl text-gray-600 hover:text-gray-800"
          >
            ×
          </button>
          <h2 className="text-2xl mb-4">Modal Title</h2>
          <p className="mb-4">This is the content of the modal.</p>
          <button onClick={toggleModal} className="bg-slate-600 text-white px-3 py-2">
            CLOSE MODAL
          </button>
        </div>
      </div>
    </>
  );
};

export default Modal;
