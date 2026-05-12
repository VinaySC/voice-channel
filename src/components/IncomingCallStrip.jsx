import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './IncomingCallStrip.css';
import { PhoneIncomingIcon } from "@animateicons/react/lucide";
import callAcceptIcon from '../assets/icons/call-accept.svg';
import callRejectIcon from '../assets/icons/call-reject.svg';
import genericAvatarIcon from '../assets/icons/generic-avatar.svg';
import microphoneIcon from '../assets/icons/microphone.svg';
import pauseIcon from '../assets/icons/pause.svg';
import endCallIcon from '../assets/icons/end-call.svg';
import fullViewIcon from '../assets/icons/full-view.svg';
import phoneIncomingIcon from '../assets/icons/phone-incoming.svg';

const IncomingCallStrip = ({ isAccepted, connectedSeconds, onAccept, onReject }) => {
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(1);
  const [isExiting, setIsExiting] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(!isAccepted);
  const iconRef = useRef(null);

  useEffect(() => {
    // Only animate on first mount if not already accepted
    if (isAccepted) {
      setShouldAnimate(false);
    }
  }, []);

  useEffect(() => {
    let interval;
    if (!isAccepted) {
      interval = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isAccepted]);

  useEffect(() => {
    const triggerAnimation = () => {
      if (iconRef.current && !isAccepted) {
        iconRef.current.startAnimation();
      }
    };

    triggerAnimation();
    const animationInterval = setInterval(triggerAnimation, 2000);
    
    return () => clearInterval(animationInterval);
  }, [isAccepted]);

  const handleAccept = () => {
    if (onAccept) onAccept();
  };

  const handleReject = () => {
    setIsExiting(true);
    setTimeout(() => {
      onReject();
    }, 150);
  };

  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`incoming-call-strip-container ${isExiting ? 'exiting' : ''} ${!shouldAnimate ? 'no-animation' : ''}`}>
      <div className="incoming-call-strip">
        <div className="profile-details">
          <div className="avatar-circle">
            <img src={genericAvatarIcon} alt="" width="28" height="28" />
          </div>
          <span className="profile-name">Unknown (+91 98765 43210)</span>
        </div>
        
        <div className="call-info-wrapper">
          <AnimatePresence mode="wait">
            {!isAccepted ? (
              <motion.div 
                key="incoming-badge"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="call-info-badge"
              >
                <div className="call-icon-animated">
                  <PhoneIncomingIcon 
                    ref={iconRef}
                    size={16} 
                    color="#cbd5e1" 
                  />
                </div>
                <span className="call-status">Incoming call...</span>
                <span className="call-timer">Waiting for {formatTime(seconds)}</span>
              </motion.div>
            ) : (
              <motion.div 
                key="connected-pill"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="connected-pill"
              >
                <img src={phoneIncomingIcon} alt="" width="16" height="16" />
                <span className="connected-status">Connected</span>
                <span className="connected-timer">{formatTime(connectedSeconds)}</span>
                <div className="call-action-item" onClick={() => navigate('/active-call')}>
                  <img src={fullViewIcon} alt="" width="16" height="16" style={{ cursor: 'pointer' }} />
                  <span className="tooltip">Open full view</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="call-actions">
          <AnimatePresence mode="wait">
            {!isAccepted ? (
              <motion.div 
                key="incoming-actions"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="action-group"
              >
                <button className="btn-accept" onClick={handleAccept}>
                  <img src={callAcceptIcon} alt="" width="14" height="14" />
                  <span>Accept</span>
                </button>
                <button className="btn-reject" onClick={handleReject}>
                  <img src={callRejectIcon} alt="" width="14" height="14" />
                  <span>Reject</span>
                </button>
              </motion.div>
            ) : (
              <motion.div 
                key="connected-actions"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="connected-actions"
              >
                <div className="call-action-item">
                  <button className="icon-btn-action">
                    <img src={microphoneIcon} alt="" width="16" height="16" />
                  </button>
                  <span className="tooltip">Mute</span>
                </div>
                <div className="call-action-item">
                  <button className="icon-btn-action">
                    <img src={pauseIcon} alt="" width="16" height="16" />
                  </button>
                  <span className="tooltip">Pause</span>
                </div>
                <div className="call-action-item">
                  <button className="btn-end-call" onClick={handleReject}>
                    <img src={endCallIcon} alt="" width="16" height="16" />
                  </button>
                  <span className="tooltip">End call</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default IncomingCallStrip;
