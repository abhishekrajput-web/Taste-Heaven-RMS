import React, { useState, useEffect } from 'react';

const Modal = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {}, []);

  return (
    <div className="App">
      {isModalOpen && (
        <div
          className="modal d-flex align-items-center justify-content-center fade show"
          style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.75)' }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Welcome to Taste Heaven</h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={closeModal}
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  This application is deployed on Render, which may cause slower
                  performance. If you experience delays, please visit my{' '}
                  <a
                    href="https://github.com/abhishekrajput-web/Taste-Heaven-RMS"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary text-decoration-underline"
                  >
                    GitHub Repository
                  </a>
                  .
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
