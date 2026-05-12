import React, { useState, useEffect } from 'react';
import './IncomingCallStrip.css';
import { PhoneIncomingIcon } from "@animateicons/react/lucide";
import callAcceptIcon from '../assets/icons/call-accept.svg';
import callRejectIcon from '../assets/icons/call-reject.svg';
import genericAvatarIcon from '../assets/icons/generic-avatar.svg';

const IncomingCallStrip = ({ onAccept, onReject }) => {
  const [seconds, setSeconds] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="incoming-call-strip-container">
      <div className="incoming-call-strip">
        <div className="profile-details">
          <div className="avatar-circle">
            <img src={genericAvatarIcon} alt="" width="28" height="28" />
          </div>
          <span className="profile-name">Unknown (+91 98765 43210)</span>
        </div>
        
        <div className="call-info-wrapper">
          <div className="call-info-badge">
            <div className="call-icon-animated">
              <PhoneIncomingIcon size={16} color="#cbd5e1" />
            </div>
            <span className="call-status">Incoming call...</span>
            <span className="call-timer">Waiting for {formatTime(seconds)}</span>
          </div>
        </div>

        <div className="call-actions">
          <button className="btn-accept" onClick={onAccept}>
            <img src={callAcceptIcon} alt="" width="14" height="14" />
            <span>Accept</span>
          </button>
          <button className="btn-reject" onClick={onReject}>
            <img src={callRejectIcon} alt="" width="14" height="14" />
            <span>Reject</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default IncomingCallStrip;
