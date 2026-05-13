import React, { useState, useEffect, useRef } from 'react';
import './RightPanel.css';


// Icons
import sAssigned from '../assets/icons/s-assigned.svg';
import sStatus from '../assets/icons/s-status.svg';
import sTags from '../assets/icons/s-tags.svg';
import sChevronDown from '../assets/icons/s-chevron-down.svg';
import customerNameIcon from '../assets/icons/customer-name.svg';
import emailIcon from '../assets/icons/email-icon.svg';
import phoneIcon from '../assets/icons/phone-icon.svg';
import addIcon from '../assets/icons/add-icon.svg';
import addContactIcon from '../assets/icons/add-contact.svg';
import incomingCall14 from '../assets/icons/incoming-call-14.svg';
import tabsMail from '../assets/icons/tabs-mail.svg';
import tabsApps from '../assets/icons/tabs-apps.svg';
import tabsClose from '../assets/icons/tabs-close.svg';

const RightPanel = ({ isFullView = false, inboxName = 'Call Support', contactName = 'Unknown' }) => {
  const [isCustomerDetailsOpen, setIsCustomerDetailsOpen] = useState(true);
  const [isPrevConvosOpen, setIsPrevConvosOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('All Activities');
  const [isContactDropdownOpen, setIsContactDropdownOpen] = useState(false);
  const [contactSearchTerm, setContactSearchTerm] = useState('');
  
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsContactDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="right-panel">
      {/* Connector Tabs - Only for home view */}
      {!isFullView && (
        <div className="panel-tabs">
          <div className="tabs-left">
            <div className="panel-tab active">
              <img src={tabsMail} alt="Mail" width="16" height="16" />
            </div>
            <div className="panel-tab">
              <img src={tabsApps} alt="Apps" width="16" height="16" />
            </div>
          </div>
          <button className="icon-btn-close">
            <img src={tabsClose} alt="Close" width="16" height="16" />
          </button>
        </div>
      )}

      <div className="panel-scroll-content">
        {/* Call Support Section */}
        <div className="section-box no-border-top">
          <h2 className="section-title-panel">{inboxName}</h2>
          <div className="property-list">
            <div className="property-item">
              <div className="property-label">
                <img src={sAssigned} alt="" width="14" height="14" />
                <span>Assignee</span>
              </div>
              <div className="property-value-wrapper">
                <div className="avatar-small j-avatar">J</div>
                <span className="property-value">Jakob Bergson</span>
              </div>
            </div>
            
            <div className="property-item">
              <div className="property-label">
                <img src={sStatus} alt="" width="14" height="14" />
                <span>Status</span>
              </div>
              <div className="property-value-wrapper">
                <div className="status-indicator-open"></div>
                <span className="property-value">Open</span>
              </div>
            </div>

            <div className="property-item">
              <div className="property-label">
                <img src={sTags} alt="" width="14" height="14" />
                <span>Tags</span>
              </div>
              <div className="property-value-wrapper link-style">
                <img src={addIcon} alt="" width="16" height="16" />
                <span className="property-value subtle">Add tags</span>
              </div>
            </div>
          </div>
        </div>

        <div className="divider-h"></div>

        {/* Customer Details Section */}
        <div className="section-box">
          <div className="section-header-toggle" onClick={() => setIsCustomerDetailsOpen(!isCustomerDetailsOpen)}>
            <h2 className="section-title-panel">Customer details</h2>
            <img 
              src={sChevronDown} 
              alt="" 
              className={`chevron-toggle ${isCustomerDetailsOpen ? 'up' : ''}`} 
              width="16" 
              height="16" 
            />
          </div>
          
          {isCustomerDetailsOpen && (
            <div className="property-list">
              <div className="property-item">
                <div className="property-label">
                  <img src={customerNameIcon} alt="" width="14" height="14" />
                  <span>Name</span>
                </div>
                {contactName === 'Unknown' ? (
                  <div className="property-value-wrapper link-style relative-container" ref={dropdownRef}>
                    <div className={`add-contact-trigger ${isContactDropdownOpen ? 'active' : ''}`} onClick={() => setIsContactDropdownOpen(!isContactDropdownOpen)}>
                      <img src={addIcon} alt="" width="16" height="16" />
                      <span className="property-value subtle">Add to contacts</span>
                    </div>
                    {isContactDropdownOpen && (
                      <div className="contact-dropdown">
                        <div className="contact-search-box">
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M9.625 5.83333C9.625 7.92741 7.92741 9.625 5.83333 9.625C3.73925 9.625 2.04167 7.92741 2.04167 5.83333C2.04167 3.73925 3.73925 2.04167 5.83333 2.04167C7.92741 2.04167 9.625 3.73925 9.625 5.83333ZM8.84715 10.0846C7.9944 10.8252 6.95408 11.2583 5.83333 11.2583C2.83379 11.2583 0.408333 8.83288 0.408333 5.83333C0.408333 2.83379 2.83379 0.408333 5.83333 0.408333C8.83288 0.408333 11.2583 2.83379 11.2583 5.83333C11.2583 6.95408 10.8252 7.9944 10.0846 8.84715L13.1118 11.8744C13.4308 12.1933 13.4308 12.7104 13.1118 13.0293C12.7929 13.3483 12.2758 13.3483 11.9568 13.0293L8.84715 10.0846Z" fill="#94A3B8"/>
                          </svg>
                          <input 
                            type="text" 
                            placeholder="Search" 
                            value={contactSearchTerm}
                            onChange={(e) => setContactSearchTerm(e.target.value)}
                          />
                        </div>
                        <div className="contact-list-container">
                          <div className="contact-list-item">
                            <div className="contact-avatar create-new">
                              <img src={addContactIcon} alt="" width="14" height="14" />
                            </div>
                            <span>Create a new contact</span>
                          </div>
                          <div className="contact-list-item">
                            <div className="contact-avatar a-avatar">A</div>
                            <span>Albert Flores</span>
                          </div>
                          <div className="contact-list-item">
                            <div className="contact-avatar d-avatar">D</div>
                            <span>Devon Lane</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="property-value">{contactName}</div>
                )}
              </div>
              
              <div className="property-item">
                <div className="property-label">
                  <img src={emailIcon} alt="" width="14" height="14" />
                  <span>Email</span>
                </div>
                <div className="property-value">-</div>
              </div>

              <div className="property-item">
                <div className="property-label">
                  <img src={phoneIcon} alt="" width="14" height="14" />
                  <span>Phone</span>
                </div>
                <div className="property-value">+91 98765 43210</div>
              </div>
            </div>
          )}
        </div>

        <div className="divider-h"></div>

        {/* Previous Conversations Section */}
        <div className="section-box">
          <div className="section-header-toggle" onClick={() => setIsPrevConvosOpen(!isPrevConvosOpen)}>
            <h2 className="section-title-panel">Previous Conversations</h2>
            <img 
              src={sChevronDown} 
              alt="" 
              className={`chevron-toggle ${isPrevConvosOpen ? 'up' : ''}`} 
              width="16" 
              height="16" 
            />
          </div>
        </div>

        <div className="divider-h"></div>

        {/* Activities Section */}
        <div className="section-box activities-section">
          <div className="activity-tabs-row">
            <div 
              className={`activity-tab-item ${activeTab === 'All Activities' ? 'active' : ''}`}
              onClick={() => setActiveTab('All Activities')}
            >
              All Activities
            </div>
            <div 
              className={`activity-tab-item ${activeTab === 'Notes' ? 'active' : ''}`}
              onClick={() => setActiveTab('Notes')}
            >
              Notes
            </div>
          </div>

          <div className="note-input-container">
             <div className="note-input-box">
                <img src={addIcon} alt="" width="16" height="16" />
                <span>Add a note</span>
             </div>
          </div>

          <div className="timeline-container">
            <div className="timeline-date-divider">
              <div className="divider-line"></div>
              <div className="date-badge">Today</div>
              <div className="divider-line"></div>
            </div>

            <div className="timeline-event">
              <div className="event-icon-circle">
                <img src={incomingCall14} alt="" width="14" height="14" />
              </div>
              <div className="event-content">
                <p className="event-msg">Incoming call received in {inboxName}</p>
                <span className="event-time">01:02 PM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightPanel;
