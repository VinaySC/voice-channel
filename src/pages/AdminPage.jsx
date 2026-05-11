import React, { useState } from 'react';
import './AdminPage.css';
import CreateVoiceInboxWizard from '../components/CreateVoiceInboxWizard';

// Sidebar 1 Icons
import sharedInboxIcon from '../assets/icons/shared-inbox.svg';
import knowledgeBaseIcon from '../assets/icons/knowledge-base.svg';
import usersIcon from '../assets/icons/users.svg';
import hiverAiIcon from '../assets/icons/hiver-ai.svg';
import subscriptionsIcon from '../assets/icons/subscriptions.svg';
import businessHoursIcon from '../assets/icons/business-hours.svg';
import deliverabilityIcon from '../assets/icons/deliverability.svg';
import customConnectorsIcon from '../assets/icons/custom-connectors.svg';

// Sidebar 2 Icons
import emailInboxIcon from '../assets/icons/email-inbox.svg';
import chatInboxIcon from '../assets/icons/chat-inbox.svg';
import slackInboxIcon from '../assets/icons/slack-inbox.svg';
import voiceInboxIcon from '../assets/icons/voice-inbox.svg';
import chevronBackIcon from '../assets/icons/chevron-back.svg';
import generalSettingsIcon from '../assets/icons/general-settings.svg';
import generalSettingsActiveIcon from '../assets/icons/general-settings-active.svg';
import generalSettingsInactiveIcon from '../assets/icons/general-settings-inactive.svg';
import voiceSettingsActiveIcon from '../assets/icons/voice-settings-active.svg';
import voiceSettingsInactiveIcon from '../assets/icons/voice-settings-inactive.svg';

// Empty State Image
import voiceEmptyStateImg from '../assets/empty-states/boice-inbox-empty-state.png';

import deleteIcon from '../assets/icons/delete.svg';
import settingsIcon from '../assets/icons/settings.svg';

const AdminPage = ({ voiceInboxes, setVoiceInboxes }) => {
  const [activeAdminTab, setActiveAdminTab] = React.useState('Shared Inbox');
  const [activeInboxType, setActiveInboxType] = React.useState('Voice Inboxes');
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const adminTabs = [
    { name: 'Shared Inbox', icon: sharedInboxIcon },
    { name: 'Knowledge Base', icon: knowledgeBaseIcon },
    { name: 'Users', icon: usersIcon },
    { name: 'Hiver AI', icon: hiverAiIcon },
    { name: 'Subscriptions', icon: subscriptionsIcon },
    { name: 'Business Hours', icon: businessHoursIcon },
    { name: 'Deliverability', icon: deliverabilityIcon },
    { name: 'Custom Connectors', icon: customConnectorsIcon }
  ];

  const inboxTypes = [
    { name: 'Email Inboxes', icon: emailInboxIcon },
    { name: 'Chat Inboxes', icon: chatInboxIcon },
    { name: 'Slack Inboxes', icon: slackInboxIcon },
    { name: 'Voice Inboxes', icon: voiceInboxIcon }
  ];

  const handleOpenWizard = () => {
    setIsWizardOpen(true);
    setCurrentStep(1);
  };

  const handleSaveInbox = (inboxData) => {
    setVoiceInboxes([...voiceInboxes, inboxData]);
    setIsWizardOpen(false);
  };

  const handleWizardBack = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
    } else {
      setIsWizardOpen(false);
    }
  };

  return (
    <div className="admin-page-container">
      {/* Left Sidebar: Admin Panel Sections */}
      <div className="admin-left-sidebar">
        <div className="admin-sidebar-header">
          <span className="admin-sidebar-title">Admin Panel</span>
        </div>
        <div className="admin-nav-list">
          {adminTabs.map((tab) => (
            <div 
              key={tab.name}
              className={`admin-nav-item ${activeAdminTab === tab.name ? 'active' : ''}`}
              onClick={tab.name === 'Shared Inbox' ? () => setActiveAdminTab(tab.name) : undefined}
            >
              <div className="admin-nav-icon">
                <img src={tab.icon} alt="" width="14" height="14" />
              </div>
              <span>{tab.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Middle Sidebar: Specific Inbox Types or Wizard Navigation */}
      <div className="admin-middle-sidebar">
        {isWizardOpen ? (
          <>
            <div className="admin-sidebar-header">
              <div className="back-link" onClick={handleWizardBack}>
                <img src={chevronBackIcon} alt="" className="back-icon" />
                <span className="admin-sidebar-title">Voice Inbox</span>
              </div>
            </div>
            <div className="admin-nav-list">
              <div 
                className={`admin-nav-item ${currentStep === 1 ? 'active' : 'inactive'}`}
              >
                <div className="admin-nav-icon">
                  <img 
                    src={currentStep === 1 ? generalSettingsActiveIcon : generalSettingsInactiveIcon} 
                    alt="" 
                    width="14" 
                    height="14" 
                  />
                </div>
                <span>General Settings</span>
              </div>
              <div 
                className={`admin-nav-item ${currentStep === 2 ? 'active' : 'inactive'}`}
              >
                <div className="admin-nav-icon">
                  <img 
                    src={currentStep === 2 ? voiceSettingsActiveIcon : voiceSettingsInactiveIcon} 
                    alt="" 
                    width="14" 
                    height="14" 
                  />
                </div>
                <span>Voice Settings</span>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="admin-sidebar-header">
              <span className="admin-sidebar-title">{activeAdminTab}</span>
            </div>
            <div className="admin-nav-list">
              {inboxTypes.map((type) => (
                <div 
                  key={type.name}
                  className={`admin-nav-item ${activeInboxType === type.name ? 'active' : ''}`}
                  onClick={type.name === 'Voice Inboxes' ? () => setActiveInboxType(type.name) : undefined}
                >
                  <div className="admin-nav-icon">
                    <img src={type.icon} alt="" width="14" height="14" />
                  </div>
                  <span>{type.name}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Main Content Area */}
      <div className="admin-main-content">
        {isWizardOpen ? (
          <CreateVoiceInboxWizard 
            onBack={() => setIsWizardOpen(false)} 
            step={currentStep}
            onStepChange={setCurrentStep}
            onSave={handleSaveInbox}
          />
        ) : (
          <>
            <div className="admin-content-header">
              <h2 className="admin-header-title">{activeInboxType}</h2>
              <button className="btn-primary" onClick={handleOpenWizard}>Create Voice Inbox</button>
            </div>

            {voiceInboxes.length === 0 ? (
              <div className="admin-empty-state">
                <img src={voiceEmptyStateImg} alt="Empty State" className="empty-state-visual" />
                <div className="empty-state-info">
                  <h3 className="empty-state-title">There are no Voice Inbox created</h3>
                  <p className="empty-state-desc">Set up an inbox to begin collaborating with your team</p>
                </div>
                <button className="btn-primary" onClick={handleOpenWizard}>Create Voice Inbox</button>
              </div>
            ) : (
              <div className="admin-table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th className="actions-header"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {voiceInboxes.map((inbox, index) => (
                      <tr key={index}>
                        <td>
                          <div className="inbox-name-cell">
                            <img src={voiceInboxIcon} alt="" className="inbox-type-icon" />
                            <span className="inbox-name-text">{inbox.name}</span>
                          </div>
                        </td>
                        <td className="actions-cell">
                          <button 
                            className="icon-btn-secondary delete-btn"
                            onClick={() => {
                              const newList = voiceInboxes.filter((_, i) => i !== index);
                              setVoiceInboxes(newList);
                            }}
                          >
                            <img src={deleteIcon} alt="Delete" width="14" height="14" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
