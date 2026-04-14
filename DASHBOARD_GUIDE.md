# Dashboard Architecture & UI/UX Guide

This document serves as a comprehensive reference for AI agents and developers working on this dashboard. It details all pages, interactive elements, intended CRUD (Create, Read, Update, Delete) operations, and the current state of the UI wiring.

When implementing new features or connecting a backend, refer to this guide to understand how the UI components are intended to function.

---

## 1. Global UI Patterns

*   **Toasts (`useToast`)**: Used for transient success/error/info messages. Currently used to mock backend actions (e.g., "Settings saved", "Item deleted").
*   **Modals (`<Modal>`)**: Used for data entry (Create/Edit forms). They overlay the screen and trap focus.
*   **Slide-out Panels**: Used for viewing detailed records (Read operations for Influencers, Brands, Jobs, Campaigns). They slide in from the right side of the screen and provide deep links to other actions.
*   **Dropdowns (`<Dropdown>`)**: Used for row-level actions in tables (e.g., Edit, Delete, View Details).
*   **Glass Panel Aesthetic**: The UI relies heavily on `glass-panel` classes, `bg-slate-900/50`, and `border-slate-700/50` for a premium dark mode look.

---

## 2. Page-by-Page Breakdown

### Dashboard (`/src/pages/Dashboard.tsx`)
The central hub for high-level metrics.
*   **Metrics Cards**: Displays total influencers, active campaigns, etc. (Currently static).
*   **Recent Activity**: 
    *   *Action*: "View All" button.
    *   *Routing*: Navigates to the `/reports` page.
*   **Active Campaigns**:
    *   *Action*: "View Details" button.
    *   *Routing*: Intended to navigate to `/campaigns` or open a specific campaign modal.

### Influencers (`/src/pages/Influencers.tsx`)
Manages the creator CRM.
*   **Filters**: Search (text), Pipeline Status, Tier, Region, Niche (Custom styled dropdowns).
*   **Add Influencer (Create)**:
    *   *Action*: "+ Add Influencer" button.
    *   *UI*: Opens `isAddModalOpen` Modal.
*   **Table Rows (Read)**:
    *   *Action*: Clicking a row sets `selectedId`.
    *   *UI*: Opens the Slide-out Panel on the right.
*   **Slide-out Panel Actions**:
    *   **Edit Profile (Update)**: Opens `isEditModalOpen` Modal pre-filled with influencer data.
    *   **Message**: Navigates to `/proxies` (or intended WhatsApp outreach module).
    *   **View Instagram**: External link to the creator's profile.

### Brands (`/src/pages/Brands.tsx`)
Manages the client/brand CRM.
*   **Filters**: Search (text), Status, Tier, Industry.
*   **Add Brand (Create)**:
    *   *Action*: "+ Add Brand" button.
    *   *UI*: Opens `isAddModalOpen` Modal.
*   **Table Rows (Read)**:
    *   *Action*: Clicking a row sets `selectedId`.
    *   *UI*: Opens the Slide-out Panel on the right.
*   **Slide-out Panel Actions**:
    *   **Edit Brand (Update)**: Opens `isEditModalOpen` Modal pre-filled with brand data.
    *   **Create Job**: Navigates to `/jobs` to start a new campaign for this specific brand.

### Jobs (`/src/pages/Jobs.tsx`)
Manages open campaign briefs and requirements.
*   **Filters**: Search (text), Status, Type.
*   **Create Job (Create)**:
    *   *Action*: "+ Create Job" button.
    *   *UI*: Opens `isAddModalOpen` Modal.
*   **Job Cards (Read)**:
    *   *Action*: "View Details" button sets `selectedJobId`.
    *   *UI*: Opens the Slide-out Panel showing deliverables, budget, and applied influencers.
*   **Slide-out Panel Actions**:
    *   **Edit Job (Update)**: Triggers a toast (Future: open an edit modal).
    *   **Close Job (Update/Delete)**: Triggers a toast (Future: change status to closed/archived).

### Campaigns (`/src/pages/Campaigns.tsx`)
Manages active, ongoing collaborations.
*   **Filters**: Search (text), Status, Type.
*   **Table Rows (Read/Update/Delete)**:
    *   *Action*: "..." More options dropdown.
    *   *Dropdown Options*:
        *   **View Details**: Opens Slide-out Panel (Deliverable tracking, content links).
        *   **Edit Campaign**: Opens `isEditModalOpen` Modal to update status/deal type.
        *   **Delete**: Triggers a toast (Future: prompt confirmation and delete).

### Proxies & Outreach (`/src/pages/Proxies.tsx`)
Manages infrastructure for automated messaging.
*   **Add Proxy (Create)**:
    *   *Action*: "+ Add Proxy" button.
    *   *UI*: Opens `isAddModalOpen` Modal.
*   **Test Connection (Read/Action)**:
    *   *Action*: "Test Connection" button.
    *   *UI*: Sets `isTesting` state, simulates delay, shows success Toast.
*   **Table Rows (Update/Delete)**:
    *   *Actions*: Edit and Delete icon buttons (Currently trigger Toasts).

### Settings (`/src/pages/Settings.tsx`)
System configuration and AI agent rules.
*   **Global Save**: "Save Changes" button at the top right (Triggers success Toast).
*   **Tabs & CRUD Operations**:
    *   **Industries & Regions**: Add/Edit/Delete buttons for Industries and Regions.
    *   **Influencer Categories**: Add/Delete buttons for Content Styles (Tags).
    *   **Brand Categories**: Add/Delete buttons for Venue/Cuisine Types.
    *   **Pipeline Stages**: Visual flow (Read-only currently).
    *   **Points & Reputation**: Edit buttons for Point Actions.
    *   **Commission & Payments**: Number inputs for percentages and flat fees.
    *   **Outreach Templates**: Add/Edit/Delete buttons for message templates.
    *   **Outreach Rate Limits**: Number inputs for daily limits and delays.
    *   **Reply Classification**: Add Rule button for AI intent mapping.
    *   *Note*: All CRUD buttons in Settings currently trigger informative Toasts. Future development should replace these with actual Modals and API calls.

---

## 3. Future Development Guide (Backend Integration)

When connecting this frontend to a backend (e.g., Firebase, Supabase, Node.js API), follow these steps for each page:

1.  **Replace `mockData` arrays**: Swap out the hardcoded arrays at the top of each file with state variables (e.g., `const [data, setData] = useState([])`).
2.  **Implement `useEffect` hooks**: Fetch data on component mount and populate the state.
3.  **Update Modal Submit Handlers**: 
    *   Currently, `handleAddSubmit` and `handleEditSubmit` just close the modal and show a toast.
    *   *Future*: Add `await api.create(...)` or `await api.update(...)`, then refresh the local state, *then* close the modal and show the toast.
4.  **Implement Delete Handlers**: Replace the "Delete" toast triggers with actual confirmation dialogs and API `DELETE` requests.
5.  **Form State**: The Modals currently use basic HTML forms. For complex data entry, wire up controlled React components (`value={state} onChange={...}`) inside the modal bodies.
