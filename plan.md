# Hiver Omni - Voice Channel Prototype Plan

This document tracks the progress and roadmap for the Voice Channel prototype within the Hiver Omni ecosystem.

## 🏁 Phase 1: Voice Channel Setup (Admin Panel)
- [x] **1.1 Admin Settings Entry**: Update the "Admin Panel" navigation to include a "Voice Inboxes" section.
- [x] **1.2 Creation Flow**: Implement "Create Voice Inbox" multi-step flow (Wizard)
    - [x] Step 1: General Settings (Left-aligned, country search, char-count)
    - [x] Step 2: Voice Settings (Welcome greeting, busy message)
    - [x] Step 3: Creation Completion & List View
- [x] **1.3 Integration**: Ensure the newly created voice inbox appears in the Sidebar navigation.

## 📞 Phase 2: Core Experience (Simulated Call)
- [x] **2.1 Incoming Call Simulation**: Implement a UI trigger (e.g., a "Simulate Call" button) that triggers a call overlay/modal.
- [ ] **2.2 Active Call UI**: Create the UI for an ongoing call (Timer, Mute, End Call buttons, Caller Info).
- [x] **2.3 Call Pick-up Logic**: Allow the user to "Answer" the call and transition to the active state.

## 🤖 Phase 3: Post-Call Intelligence
- [ ] **3.1 Transition State**: Show a skeletal loader immediately after a call ends to simulate AI processing.
- [ ] **3.2 Call Summary Card**: Display a concise AI-generated summary of the call in the conversation thread.
- [ ] **3.3 Expandable Transcript**:
    - Implement a hidden transcript section.
    - Add a toggle/expandable card to view the full text of the call.

## ⚙️ Phase 4: Voice Inbox Management
- [ ] **4.1 Management UI**: Navigate to Admin Panel -> Voice Inboxes and select a specific inbox.
- [ ] **4.2 Settings Tabs**:
    - [ ] **Members**: Add/remove members from the voice inbox.
    - [ ] **General Settings**: Basic configurations (placeholder).
    - [ ] **Voice Settings**: Voice-specific configurations (placeholder).

---

## 🛠 Tech Notes
- **Base**: Using `Omni-Boilerplate` (React + Vite).
- **Styling**: Standard CSS with Hiver Design Tokens.
- **State**: React local state for simulation flags.
