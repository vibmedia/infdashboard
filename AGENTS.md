# Custom Instructions for AI Agents

When working on this project, please adhere to the following guidelines:

1. **Read the Dashboard Guide**: Before implementing new UI features, adding CRUD operations, or modifying existing pages, you MUST read the `/DASHBOARD_GUIDE.md` file. It contains a comprehensive breakdown of all buttons, modals, slide-outs, and intended state management for the entire application.
2. **UI/UX Consistency**: Maintain the premium "glass panel" aesthetic. Use `bg-slate-900/50`, `border-slate-700/50`, and Lucide React icons.
3. **State Management**: When wiring up new buttons, prefer using the existing `<Modal>`, `<Dropdown>`, and Slide-out panel patterns rather than standard browser alerts. Use the `useToast` hook for success/error notifications.
