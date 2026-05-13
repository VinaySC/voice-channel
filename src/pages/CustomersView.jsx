import React from 'react';
import './CustomersView.css';

// SVG Icons
import customersIcon from '../assets/icons/customers.svg';
import searchIcon from '../assets/icons/search.svg';
import sharedInboxIcon from '../assets/icons/shared-inbox.svg';
import usersIcon from '../assets/icons/users.svg';
import callHoverBlue from '../assets/icons/call-hover-blue.svg';

const customersData = [
  { name: "Amelia Stone", email: "amelia.stone@airbnb.com", phone: "+44 20 7946 0870", account: "PayPal", initial: "A", color: "#5398cf" },
  { name: "Alice Fontaine", email: "alice.fontaine@paypal.com", phone: "+61 2 9372 7100", account: "Airbnb", initial: "A", color: "#5398cf" },
  { name: "Samuel Thorne", email: "samuel.thorne@helpscout.com", phone: "+91 80 2668 2668", account: "Helpscout", initial: "S", color: "#e3692c" },
  { name: "Tessa Calder", email: "tessa.calder@hiver.com", phone: "+1 650-253-0000", account: "Google", initial: "T", color: "#ac80b7" },
  { name: "Uriah Foxworth", email: "uriah.foxworth@google.com", phone: "+86 21 6249 2258", account: "Hiver", initial: "U", color: "#5398cf" },
  { name: "Vera Lockhart", email: "vera.lockhart@intercom.com", phone: "+33 1 55 35 35 35", account: "Microsoft", initial: "V", color: "#d04b4f" },
  { name: "Violet Lockhart", email: "violet.lockhart@attio.com", phone: "+49 30 2061670", account: "Apple", initial: "V", color: "#d04b4f" },
  { name: "Walter Jennings", email: "walter.jennings@microsoft.com", phone: "+81 3 5423 8000", account: "Microsoft", initial: "W", color: "#8789c5" },
  { name: "Xena Marlowe", email: "xena.marlowe@unitedairlines.com", phone: "+55 11 3030 5100", account: "United Airlines", initial: "X", color: "#e3cb2d" },
  { name: "Yvette Kingsley", email: "yvette.kingsley@framer.com", phone: "+27 11 784 2200", account: "Framer", initial: "Y", color: "#52b39e" },
  { name: "Yara Kingsley", email: "yara.kingsley@attio.com", phone: "+39 02 77721", account: "Attio", initial: "Y", color: "#52b39e" },
  { name: "Zane Whitaker", email: "zane.whitaker@apple.com", phone: "+41 44 224 55 55", account: "Apple", initial: "Z", color: "#8789c5" },
  { name: "Zachary Whitaker", email: "zachary.whitaker@apple.com", phone: "+44 20 7946 0870", account: "Intercom", initial: "Z", color: "#e3692c" },
];

const CustomersView = ({ onCallClick }) => {
  return (
    <div className="customers-view-container">
      {/* Header Bar */}
      <div className="customers-header">
        <div className="header-left">
          <img src={customersIcon} alt="" width="16" height="16" />
          <h1>Customers</h1>
        </div>
        <div className="header-search">
          <img src={searchIcon} alt="" width="16" height="16" className="search-icon" />
          <input type="text" placeholder="Search" />
        </div>
      </div>

      {/* Content Area */}
      <div className="customers-content">
        {/* Tabs */}
        <div className="customers-tabs">
          <div className="tab-item">
            <img src={sharedInboxIcon} alt="" width="16" height="16" />
            <span>Accounts</span>
          </div>
          <div className="tab-item active">
            <img src={usersIcon} alt="" width="16" height="16" />
            <span>Contact</span>
          </div>
        </div>

        {/* Table Container */}
        <div className="customers-table-wrapper">
          <table className="customers-table">
            <thead>
              <tr>
                <th className="name-col">Name</th>
                <th className="email-col">Email</th>
                <th className="phone-col">Phone Number</th>
                <th className="account-col">Account</th>
              </tr>
            </thead>
            <tbody>
              {customersData.map((customer, index) => (
                <tr key={index}>
                  <td className="name-cell">
                    <div className="customer-name-group">
                      <div className="customer-avatar" style={{ backgroundColor: customer.color }}>
                        {customer.initial}
                      </div>
                      <span>{customer.name}</span>
                    </div>
                  </td>
                  <td className="email-cell">
                    <a href={`mailto:${customer.email}`}>{customer.email}</a>
                  </td>
                  <td className="phone-cell">
                    <div className="phone-number-group">
                      <span className="phone-text">{customer.phone}</span>
                      <button 
                        className="table-call-btn"
                        onClick={() => onCallClick(customer.name, customer.phone)}
                      >
                        <img src={callHoverBlue} alt="Call" width="24" height="24" />
                      </button>
                    </div>
                  </td>
                  <td className="account-cell">{customer.account}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CustomersView;
