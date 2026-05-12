<project_context>
  <metadata>
    <name>Hiver Omni - Voice Channel Prototype (Boilerplate)</name>
    <type>Frontend UI Prototype</type>
    <framework>React 18 + Vite</framework>
    <styling>Vanilla CSS + Hiver Design System Tokens (CSS Variables)</styling>
    <routing>react-router-dom</routing>
    <state>Local React State (no global state management library)</state>
  </metadata>

  <architecture>
    <entry>src/main.jsx -> src/App.jsx</entry>
    <layout>
      A 4-column fluid layout:
      1. MiniSidebar (Icons only, profile, settings)
      2. MainSidebarPanel (Inbox navigation: Support, Finance. Filters: Mine, Unassigned)
      3. ConversationList (List of threads based on active filter)
      4. ConversationDetail (Expanded view of selected thread) + RightPanel (User context)
    </layout>
  </architecture>

  <core_components>
    <component path="src/App.jsx">
      Main wrapper. Holds `conversationsData` (dummy JSON array of threads). Manages `activeFilter` (e.g., {inbox: 'Support', type: 'Mine'}) and passes filtered data down.
    </component>
    <component path="src/components/MainSidebarPanel.jsx">
      Renders the nested inbox structure (Shared Inbox -> Support/Finance -> Mine/Unassigned). Controls `activeFilter`.
    </component>
    <component path="src/components/ConversationList.jsx">
      Renders the list of email threads. Each item shows sender, subject, preview, and time. Triggers `onSelect` to set the active conversation.
    </component>
    <component path="src/components/ConversationDetail.jsx">
      Renders the individual messages inside a thread. Messages can be collapsed/expanded. 
      NOTE: This is currently a read-only view. The reply functionality (ReplySection) has been explicitly removed. Reply buttons are present in the UI but have no onClick actions attached.
    </component>
    <component path="src/ProfileModal.jsx">
      A modal triggered from the MiniSidebar. Contains user availability toggles and logout. Navigation to `/settings` has been explicitly removed.
    </component>
    <component path="src/components/CreateVoiceInboxWizard.jsx">
      Multi-step wizard for creating voice inboxes. Managed through local state and props.
    </component>
    <component path="src/components/IncomingCallStrip.jsx">
      A horizontal notification bar that appears at the bottom of the screen to simulate an incoming voice call.
    </component>
    <component path="src/pages/AdminPage.jsx">
      Admin management interface for Voice Inboxes. Handles listing and deletion of inboxes.
    </component>
  </core_components>

  <project_history>
    <context>
      This project was originally a prototype for a "Multiple Signatures" feature. It included a rich-text editor (Tiptap) with a custom Signature Node, a Signature Library, and a Settings page.
    </context>
    <recent_changes>
      1. Implemented a multi-step "Create Voice Inbox" wizard with United States as the default country.
      2. Refined Voice Inbox rendering in the sidebar (removed hardcoded placeholders, added dynamic simulation triggers).
      3. Implemented the "Incoming Call" and "Connected Call" states with Timer and Action buttons.
      4. Added Admin management UI with inbox deletion and synced tooltip designs.
      5. Standardized icon usage and ensured high-fidelity CSS transitions for all overlays.
    </recent_changes>
    <current_state>
      A clean, generic email/helpdesk client UI boilerplate. Ready to be used as a foundation for new feature prototypes within the Hiver Omni ecosystem.
    </current_state>
  </project_history>

  <data_model>
    <entity name="Conversation">
      <fields>
        id: Number
        inbox: String (e.g. 'Support', 'Finance')
        type: String ('Mine' | 'Unassigned')
        sender: String
        initial: String
        avatarColor: String (CSS Var reference)
        time: String
        subject: String
        preview: String
        messages: Array<Message>
      </fields>
    </entity>
    <entity name="Message">
      <fields>
        id: String
        sender: String
        email: String
        time: String
        initial: String
        avatarColor: String
        body: String
      </fields>
    </entity>
  </data_model>
</project_context>
