import React from 'react';
import './TranscriptToast.css';
import hiverLogoToast from '../assets/icons/hiver-logo-toast.svg';
import closeIconToast from '../assets/icons/close-icon-toast.svg';

const TranscriptToast = ({ onClose, onClick, isExiting }) => {
  return (
    <div className={`transcript-toast ${isExiting ? 'slide-out' : ''}`} onClick={onClick}>
      <div className="toast-left">
        <img src={hiverLogoToast} alt="" width="24" height="27" />
        <span className="toast-message">Call transcript and AI summary now available</span>
      </div>
      <button className="toast-close-btn" onClick={(e) => {
        e.stopPropagation();
        onClose();
      }}>
        <img src={closeIconToast} alt="Close" width="16" height="16" />
      </button>
    </div>
  );
};

export default TranscriptToast;
