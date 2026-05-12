import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ActiveCallView.css';
import RightPanel from '../components/RightPanel';
import SkeletonText from '../components/SkeletonText';
import VoicePlayer from '../components/VoicePlayer';

// Icons
import sideBarIcon from '../assets/icons/side-bar-icon.svg';
import selectIcon from '../assets/icons/select-icon.svg';
import filterIcon from '../assets/icons/filter-icon.svg';
import incomingCallDg14 from '../assets/icons/incoming-call-dg-14.svg';
import incomingCall14 from '../assets/icons/incoming-call-14.svg';
import incomingCallDg10 from '../assets/icons/incoming-call-dg-10.svg';
import genericAvatar from '../assets/icons/generic-avatar.svg';
import incomingCall16 from '../assets/icons/incoming-call-16.svg';
import microphoneIcon from '../assets/icons/microphone.svg';
import pauseIcon from '../assets/icons/pause.svg';
import endCallIcon from '../assets/icons/end-call.svg';
import playCircle from '../assets/icons/play-circle.svg';
import volumeIcon from '../assets/icons/volume.svg';
import phoneIconWhite from '../assets/icons/phone-icon-white.svg';
import aiSummaryIcon from '../assets/icons/ai-summary.svg';
import transcriptIcon from '../assets/icons/transcript.svg';
import sChevronDown from '../assets/icons/s-chevron-down.svg';
import sampleAudio from '../assets/audio/sample-audio.mp3';

const transcriptData = [
  { time: "00:00", name: "Chris Nash", text: "Hey everybody, my name is Chris Nash.", isAgent: true },
  { time: "00:02", name: "Chris Nash", text: "It's a new year, which means it's time for a new podcast.", isAgent: true },
  { time: "00:05", name: "Chris Nash", text: "Now unlike all of your other favorite podcasts, this one will only take one minute of your time, every time, all the time.", isAgent: true },
  { time: "00:13", name: "Chris Nash", text: "Sometimes it'll be just me.", isAgent: true },
  { time: "00:15", name: "Chris Nash", text: "Other times it'll be just you, seriously, submit stuff, your opinions, videos, I want to know what you have to say, I want to share what you have to say.", isAgent: true },
  { time: "00:25", name: "Chris Nash", text: "Other times I'll be joined by excellent guests, like Cameron Hart of the Turnamental podcast.", isAgent: true },
  { time: "00:30", name: "Cameron Hart", text: "\"Hey Nash, that one minute podcast idea, don't do it. It's a terrible idea.\"", isAgent: false },
  { time: "00:34", name: "Chris Nash", text: "Swell.", isAgent: true },
  { time: "00:35", name: "Chris Nash", text: "Some episodes will be really funny. Other episodes will be really serious.", isAgent: true },
  { time: "00:40", name: "Chris Nash", text: "But I guarantee that every episode will be the best minute of your day.", isAgent: true },
  { time: "00:45", name: "Chris Nash", text: "Warning, depending on your preferences, one minute podcast may be the worst minute of your day.", isAgent: true },
];

const ActiveCallView = ({ connectedSeconds, inboxName, onEndCall, isCallEndedGlobally, isTranscriptReadyGlobally }) => {
  const navigate = useNavigate();
  const [isTranscriptOpen, setIsTranscriptOpen] = React.useState(false);
  const [isSummaryLoading, setIsSummaryLoading] = React.useState(false);
  const [showFullContent, setShowFullContent] = React.useState(isTranscriptReadyGlobally);
  const [isExiting, setIsExiting] = React.useState(false);
  const [isGeneratingExiting, setIsGeneratingExiting] = React.useState(false);

  React.useEffect(() => {
    if (isTranscriptReadyGlobally && !showFullContent) {
      setIsGeneratingExiting(true);
      setTimeout(() => {
        setShowFullContent(true);
        setIsGeneratingExiting(false);
      }, 150);
    }
  }, [isTranscriptReadyGlobally]);

  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="active-call-page">
      {/* 1. Left Panel (Call List) */}
      <div className="call-list-panel">
        <div className="subject-bar">
          <div className="subject-left">
            <button className="icon-btn">
              <img src={sideBarIcon} alt="Sidebar" width="16" height="16" />
            </button>
            <div className="subject-title-wrapper">
              <div className="vertical-divider"></div>
              <h2 className="subject-title">Mine</h2>
            </div>
          </div>
        </div>
        <div className="call-cards-container">
          <div className="voice-call-card active">
            <div className="card-top">
              <div className="caller-basic">
                <img src={incomingCallDg14} alt="" width="14" height="14" />
                <span className="caller-name">Unknown</span>
              </div>
              <span className="card-date">Mar 12</span>
            </div>
          </div>
          <div className="voice-call-card">
            <div className="card-top">
              <div className="caller-basic">
                <img src={incomingCall14} alt="" width="14" height="14" />
                <span className="caller-name">Dakota Wilder</span>
              </div>
              <span className="card-date">Mar 12</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Middle Panel (Call Detail) */}
      <div className="call-detail-panel">
        <div className="detail-status-bar">
          <div className="status-left">
            <span className="status-title">Voice call with an unknown caller</span>
          </div>
          <div className="status-pill-green">
            <img src={incomingCallDg10} alt="" width="10" height="10" />
            <span>Ongoing</span>
          </div>
        </div>
        
        <div className="detail-content-area">
          <div className={`call-card-large ${isTranscriptOpen ? 'transcript-open' : ''}`}>
            <div className="card-header-info">
              <div className="header-contact">
                <div className="avatar-med">
                  <img src={genericAvatar} alt="Avatar" />
                </div>
                <div className="header-text">
                  <span className="contact-name">Unknown</span>
                  <span className="contact-number">+91 98765 43210</span>
                </div>
              </div>
              <div className="header-time">Mar 12, 11:22 AM</div>
            </div>

            {!isCallEndedGlobally ? (
              <div className={`call-player-bar ${isExiting ? 'fade-out' : ''}`}>
                <div className="player-left">
                  <img src={incomingCall16} alt="" width="16" height="16" />
                  <span>Connected</span>
                </div>
                <span className="player-timer">{formatTime(connectedSeconds)}</span>
                <div className="player-actions">
                  <div className="call-action-item">
                    <button className="player-action-btn">
                      <img src={microphoneIcon} alt="Mute" width="16" height="16" />
                    </button>
                    <span className="tooltip">Mute</span>
                  </div>
                  <div className="call-action-item">
                    <button className="player-action-btn">
                      <img src={pauseIcon} alt="Pause" width="16" height="16" />
                    </button>
                    <span className="tooltip">Pause</span>
                  </div>
                  <div className="call-action-item">
                    <button className="player-action-btn end-call-btn" onClick={() => {
                      setIsExiting(true);
                      setTimeout(() => {
                        setIsExiting(false);
                        if (onEndCall) onEndCall();
                      }, 150);
                    }}>
                      <img src={endCallIcon} alt="End Call" width="16" height="16" />
                    </button>
                    <span className="tooltip">End Call</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="ended-content-wrapper fade-in">
                <VoicePlayer src={sampleAudio} />

                <div className="ended-bottom-section">
                  {!showFullContent ? (
                    /* Generating Transcript View (Temp) */
                    <div className={`ended-call-section ${isGeneratingExiting ? 'fade-out' : ''}`}>
                      <div className="ended-section-header align-start">
                        <div className="icon-generating-wrapper">
                          <img src={transcriptIcon} alt="" width="14" height="14" />
                        </div>
                        <div className="generating-text-wrapper">
                          <p className="generating-title">Generating transcript…</p>
                          <p className="generating-subtitle">AI summary will be available once it’s ready</p>
                        </div>
                      </div>
                      <div className="ended-section-content">
                        <SkeletonText lines={3} />
                      </div>
                    </div>
                  ) : (
                    /* AI Summary & Transcript View (Revealed after 6s) */
                    <div className="fade-in final-reveal-wrapper">
                      <div className="ended-call-section">
                        <div className="ended-section-header">
                          <img src={aiSummaryIcon} alt="" width="14" height="14" />
                          <span className="ended-section-title">Summary</span>
                        </div>
                        <div className="ended-section-content">
                          <p className="summary-dummy-text">
                            The customer called to inquire about the delay in their order #12345. 
                            I explained that the shipment was held up due to weather conditions at the hub. 
                            They were understanding and requested an email update once the status changes to 'Out for delivery'. 
                            I have set a follow-up task for tomorrow morning.
                          </p>
                        </div>
                      </div>

                      <div className="ended-divider"></div>

                      <div className="ended-call-section transcript-section">
                        <div className="ended-section-header clickable" onClick={() => setIsTranscriptOpen(!isTranscriptOpen)}>
                          <div className="header-left">
                            <img src={transcriptIcon} alt="" width="14" height="14" />
                            <span className="ended-section-title">Transcript</span>
                          </div>
                          <img 
                            src={sChevronDown} 
                            alt="" 
                            className={`chevron-icon ${isTranscriptOpen ? 'up' : ''}`} 
                            width="16" 
                            height="16" 
                          />
                        </div>
                        {isTranscriptOpen && (
                          <div className="ended-section-content transcript-cards-list">
                            {transcriptData.map((item, index) => (
                              <div key={index} className={`transcript-card ${item.isAgent ? 'agent-card' : 'customer-card'}`}>
                                <div className="card-header">
                                  <div className="card-header-left">
                                    <div className={`card-avatar ${item.isAgent ? 'agent-avatar' : 'customer-avatar'}`}>
                                      {item.isAgent ? 'C' : (
                                        <img src={genericAvatar} alt="" width="14" height="14" />
                                      )}
                                    </div>
                                    <span className="card-name">{item.name}</span>
                                  </div>
                                  <span className="card-time">{item.time}</span>
                                </div>
                                <div className="card-body">
                                  <p>{item.text}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3. Right Panel */}
      <RightPanel isFullView={true} inboxName={inboxName} />
    </div>
  );
};

export default ActiveCallView;
