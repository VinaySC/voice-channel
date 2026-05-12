import React, { useState } from 'react';
import './CreateVoiceInboxWizard.css';

// Icons
import chevronBackIcon from '../assets/icons/chevron-back.svg';
import generalSettingsIcon from '../assets/icons/general-settings.svg';
import voiceSettingsIcon from '../assets/icons/voice-settings.svg';
import sChevronDownIcon from '../assets/icons/s-chevron-down.svg';

const CreateVoiceInboxWizard = ({ onBack, step, onStepChange, onSave }) => {
  const [inboxName, setInboxName] = useState('');
  const [selectedCountry, setSelectedCountry] = useState({ name: 'United States', flag: '🇺🇸' });
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Step 2 State
  const [welcomeGreeting, setWelcomeGreeting] = useState('Welcome to Hiver support');
  const [agentsBusyMessage, setAgentsBusyMessage] = useState('We are away at the moment. Please drop your queries to our support email.');

  const countries = [
    { name: 'Australia', flag: '🇦🇺' },
    { name: 'Canada', flag: '🇨🇦' },
    { name: 'France', flag: '🇫🇷' },
    { name: 'United Kingdom', flag: '🇬🇧' },
    { name: 'United States', flag: '🇺🇸' }
  ];

  const filteredCountries = countries.filter(country => 
    country.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleNameChange = (e) => {
    if (e.target.value.length <= 30) {
      setInboxName(e.target.value);
    }
  };

  const handleSave = () => {
    if (onSave) {
      onSave({
        name: inboxName,
        country: selectedCountry,
        welcomeGreeting,
        agentsBusyMessage
      });
    }
  };

  const renderStep1 = () => (
    <>
      <div className="wizard-header">
        <h2 className="wizard-title">General Settings</h2>
      </div>

      <div className="wizard-body">
        <div className="form-group">
          <label className="form-label">Voice Inbox name</label>
          <div className="input-container">
            <input 
              type="text" 
              className="form-input" 
              placeholder="Enter your voice inbox name here"
              value={inboxName}
              onChange={handleNameChange}
            />
            <span className="char-count">{inboxName.length}/30</span>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Local Number</label>
          <div className="number-input-group">
            <div className="country-dropdown-container">
              <div 
                className="country-selector"
                onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
              >
                <span className="country-flag">{selectedCountry.flag}</span>
                <span className="country-name">{selectedCountry.name}</span>
                <img src={sChevronDownIcon} alt="" className="dropdown-chevron" />
              </div>
              {isCountryDropdownOpen && (
                <div className="country-options">
                  <div className="country-search-container">
                    <input 
                      type="text" 
                      className="country-search-input" 
                      placeholder="Search country"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      autoFocus
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                  <div className="country-list">
                    {filteredCountries.map((country) => (
                      <div 
                        key={country.name}
                        className="country-option"
                        onClick={() => {
                          setSelectedCountry(country);
                          setIsCountryDropdownOpen(false);
                          setSearchQuery('');
                        }}
                      >
                        <span className="country-option-flag">{country.flag}</span>
                        <span className="country-option-name">{country.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="number-display">
              <span className="phone-number">+12 3122 1233</span>
            </div>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Members*</label>
          <div className="members-select">
            <div className="member-chip">
              <span>john@acme.com</span>
              <button className="chip-remove">×</button>
            </div>
            <img src={sChevronDownIcon} alt="" className="dropdown-chevron" />
          </div>
        </div>

        <button 
          className={`btn-continue ${inboxName.trim() ? 'active' : ''}`} 
          disabled={!inboxName.trim()}
          onClick={() => onStepChange(2)}
        >
          Continue
        </button>
      </div>
    </>
  );

  const renderStep2 = () => (
    <>
      <div className="wizard-header">
        <div className="back-link" onClick={() => onStepChange(1)}>
          <img src={chevronBackIcon} alt="" className="back-icon" />
          <h2 className="wizard-title">Voice Settings</h2>
        </div>
      </div>

      <div className="wizard-body">
        <div className="form-group">
          <label className="form-label">Welcome greeting message</label>
          <div className="input-container">
            <input 
              type="text" 
              className="form-input no-char-count" 
              value={welcomeGreeting}
              onChange={(e) => setWelcomeGreeting(e.target.value)}
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">All agents busy</label>
          <div className="input-container">
            <textarea 
              className="form-textarea" 
              value={agentsBusyMessage}
              onChange={(e) => setAgentsBusyMessage(e.target.value)}
            />
          </div>
        </div>

        <button className="btn-save" onClick={handleSave}>
          Save
        </button>
      </div>
    </>
  );

  return (
    <div className="wizard-container">
      <div className="wizard-content">
        {step === 1 ? renderStep1() : renderStep2()}
      </div>
    </div>
  );
};

export default CreateVoiceInboxWizard;
