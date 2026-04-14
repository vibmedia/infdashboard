/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Influencers } from './pages/Influencers';
import { Brands } from './pages/Brands';
import { IGAccounts } from './pages/IGAccounts';
import { Proxies } from './pages/Proxies';
import { WhatsApp } from './pages/WhatsApp';
import { Outreach } from './pages/Outreach';
import { Jobs } from './pages/Jobs';
import { Campaigns } from './pages/Campaigns';
import { Settings } from './pages/Settings';
import { Reports } from './pages/Reports';
import { ToastProvider } from './components/ui/ToastContext';

export default function App() {
  return (
    <ToastProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/influencers" element={<Influencers />} />
            <Route path="/brands" element={<Brands />} />
            <Route path="/ig-accounts" element={<IGAccounts />} />
            <Route path="/proxies" element={<Proxies />} />
            <Route path="/whatsapp" element={<WhatsApp />} />
            <Route path="/outreach" element={<Outreach />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/campaigns" element={<Campaigns />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/reports" element={<Reports />} />
          </Routes>
        </Layout>
      </Router>
    </ToastProvider>
  );
}
