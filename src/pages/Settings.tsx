import { useState } from 'react';
import { Globe, Users, Building2, GitMerge, Star, CreditCard, MessageSquare, ShieldAlert, Zap, Plus, Save, Trash2, Edit2, CheckCircle2, X } from 'lucide-react';
import { clsx } from 'clsx';
import { useToast } from '../components/ui/ToastContext';

const tabs = [
  { id: 'industries', label: 'Industries & Regions', icon: Globe },
  { id: 'influencers', label: 'Influencer Categories', icon: Users },
  { id: 'brands', label: 'Brand Categories', icon: Building2 },
  { id: 'pipeline', label: 'Pipeline Stages', icon: GitMerge },
  { id: 'points', label: 'Points & Reputation', icon: Star },
  { id: 'payments', label: 'Commission & Payments', icon: CreditCard },
  { id: 'templates', label: 'Outreach Templates', icon: MessageSquare },
  { id: 'limits', label: 'Outreach Rate Limits', icon: ShieldAlert },
  { id: 'classification', label: 'Reply Classification', icon: Zap },
];

export function Settings() {
  const [activeTab, setActiveTab] = useState('industries');
  const { addToast } = useToast();

  return (
    <div className="h-[calc(100vh-2rem)] flex flex-col space-y-6">
      <div className="flex-shrink-0 flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">System Settings</h1>
          <p className="text-slate-400 mt-1">Configure platform parameters, pipelines, and AI agent rules.</p>
        </div>
        <button 
          onClick={() => addToast('Settings saved successfully', 'success')}
          className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl font-medium transition-colors shadow-lg shadow-blue-500/20 flex items-center gap-2"
        >
          <Save size={18} /> Save Changes
        </button>
      </div>

      {/* Tabs Navigation */}
      <div className="flex-shrink-0 overflow-x-auto custom-scrollbar pb-2">
        <div className="flex gap-2">
          {tabs.map(tab => (
            <button 
              key={tab.id} 
              onClick={() => setActiveTab(tab.id)} 
              className={clsx(
                "px-4 py-2 rounded-xl whitespace-nowrap flex items-center gap-2 text-sm font-medium transition-colors", 
                activeTab === tab.id ? "bg-blue-600 text-white" : "bg-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-800"
              )}
            >
              <tab.icon size={16} /> {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar pb-6">
        {activeTab === 'industries' && <TabIndustries />}
        {activeTab === 'influencers' && <TabInfluencers />}
        {activeTab === 'brands' && <TabBrands />}
        {activeTab === 'pipeline' && <TabPipeline />}
        {activeTab === 'points' && <TabPoints />}
        {activeTab === 'payments' && <TabPayments />}
        {activeTab === 'templates' && <TabTemplates />}
        {activeTab === 'limits' && <TabLimits />}
        {activeTab === 'classification' && <TabClassification />}
      </div>
    </div>
  );
}

// --- Tab Components ---

function TabIndustries() {
  const { addToast } = useToast();
  return (
    <div className="space-y-8">
      <section>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-white">Supported Industries</h3>
          <button onClick={() => addToast('Opening add industry modal...', 'info')} className="text-sm bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 px-3 py-1.5 rounded-lg flex items-center gap-1 font-medium transition-colors">
            <Plus size={14} /> Add Industry
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {['Food & Beverage', 'Fashion & Apparel', 'Tech & Gadgets', 'Travel & Hospitality', 'Health & Fitness'].map((ind) => (
            <div key={ind} className="glass-panel p-4 rounded-xl border border-slate-700/50 flex justify-between items-center group">
              <span className="text-slate-200 font-medium">{ind}</span>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => addToast('Edit mode opened', 'info')} className="text-slate-400 hover:text-white"><Edit2 size={14} /></button>
                <button onClick={() => addToast('Industry removed', 'success')} className="text-red-400 hover:text-red-300"><Trash2 size={14} /></button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-white">Active Regions</h3>
          <button onClick={() => addToast('Opening add region modal...', 'info')} className="text-sm bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 px-3 py-1.5 rounded-lg flex items-center gap-1 font-medium transition-colors">
            <Plus size={14} /> Add Region
          </button>
        </div>
        <div className="glass-panel rounded-xl border border-slate-700/50 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-700/50 bg-slate-800/30">
                <th className="p-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Region Name</th>
                <th className="p-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Timezone</th>
                <th className="p-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</th>
                <th className="p-4 text-xs font-semibold text-slate-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {[
                { name: 'Delhi NCR', tz: 'IST (UTC+5:30)', status: 'Active' },
                { name: 'Mumbai', tz: 'IST (UTC+5:30)', status: 'Active' },
                { name: 'Bangalore', tz: 'IST (UTC+5:30)', status: 'Active' },
                { name: 'Dubai', tz: 'GST (UTC+4:00)', status: 'Inactive' },
              ].map((region) => (
                <tr key={region.name} className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 text-sm font-medium text-slate-200">{region.name}</td>
                  <td className="p-4 text-sm text-slate-400">{region.tz}</td>
                  <td className="p-4">
                    <span className={clsx("px-2.5 py-1 rounded-md text-xs font-medium border", region.status === 'Active' ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" : "bg-slate-800 text-slate-400 border-slate-700")}>
                      {region.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button onClick={() => addToast('Edit mode opened', 'info')} className="text-slate-400 hover:text-white"><Edit2 size={14} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function TabInfluencers() {
  const { addToast } = useToast();
  return (
    <div className="space-y-8">
      <section>
        <h3 className="text-lg font-bold text-white mb-4">Influencer Tiers</h3>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          {[
            { name: 'Nano', range: '1k - 10k', color: 'text-slate-400', bg: 'bg-slate-400/10', border: 'border-slate-400/20' },
            { name: 'Micro', range: '10k - 50k', color: 'text-blue-400', bg: 'bg-blue-400/10', border: 'border-blue-400/20' },
            { name: 'Mid', range: '50k - 200k', color: 'text-violet-400', bg: 'bg-violet-400/10', border: 'border-violet-400/20' },
            { name: 'Macro', range: '200k - 1M', color: 'text-emerald-400', bg: 'bg-emerald-400/10', border: 'border-emerald-400/20' },
            { name: 'Mega', range: '1M+', color: 'text-amber-400', bg: 'bg-amber-400/10', border: 'border-amber-400/20' },
          ].map((tier) => (
            <div key={tier.name} className={clsx("rounded-xl p-4 border", tier.bg, tier.border)}>
              <h4 className={clsx("font-bold mb-1", tier.color)}>{tier.name}</h4>
              <p className="text-sm text-slate-300">{tier.range} followers</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-white">Content Styles (Tags)</h3>
          <button onClick={() => addToast('Opening add tag modal...', 'info')} className="text-sm bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 px-3 py-1.5 rounded-lg flex items-center gap-1 font-medium transition-colors">
            <Plus size={14} /> Add Tag
          </button>
        </div>
        <div className="glass-panel p-6 rounded-xl border border-slate-700/50 flex flex-wrap gap-2">
          {['Aesthetic', 'Comedy', 'Informative', 'Vlog', 'ASMR', 'Review', 'Tutorial', 'Luxury', 'Street', 'Minimalist'].map(tag => (
            <span key={tag} className="px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-sm text-slate-300 flex items-center gap-2 group cursor-pointer hover:bg-slate-700">
              {tag}
              <X onClick={() => addToast('Tag removed', 'success')} size={12} className="text-slate-500 group-hover:text-red-400" />
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}

function TabBrands() {
  const { addToast } = useToast();
  return (
    <div className="space-y-8">
      <section>
        <h3 className="text-lg font-bold text-white mb-4">Brand Budget Tiers</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: 'Bootstrapped', desc: 'Barter only or < ₹5k/mo', color: 'text-slate-400' },
            { name: 'Growth', desc: '₹10k - ₹50k/mo', color: 'text-blue-400' },
            { name: 'Enterprise', desc: '₹100k+/mo', color: 'text-emerald-400' },
          ].map((tier) => (
            <div key={tier.name} className="glass-panel p-5 rounded-xl border border-slate-700/50">
              <h4 className={clsx("font-bold mb-2", tier.color)}>{tier.name}</h4>
              <p className="text-sm text-slate-400">{tier.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-white">Venue / Cuisine Types</h3>
          <button onClick={() => addToast('Opening add type modal...', 'info')} className="text-sm bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 px-3 py-1.5 rounded-lg flex items-center gap-1 font-medium transition-colors">
            <Plus size={14} /> Add Type
          </button>
        </div>
        <div className="glass-panel p-6 rounded-xl border border-slate-700/50 flex flex-wrap gap-2">
          {['Fine Dining', 'Cafe', 'Street Food', 'Cloud Kitchen', 'Pub/Bar', 'Dessert', 'Vegan', 'Pan-Asian', 'North Indian'].map(tag => (
            <span key={tag} className="px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-sm text-slate-300 flex items-center gap-2 group cursor-pointer hover:bg-slate-700">
              {tag}
              <X onClick={() => addToast('Type removed', 'success')} size={12} className="text-slate-500 group-hover:text-red-400" />
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}

function TabPipeline() {
  return (
    <div className="space-y-8">
      <section>
        <h3 className="text-lg font-bold text-white mb-4">Influencer Pipeline Flow</h3>
        <div className="glass-panel p-8 rounded-xl border border-slate-700/50 overflow-x-auto">
          <div className="flex items-center min-w-max">
            {['Imported', 'DM Sent', 'Replied', 'Onboarded', 'Available', 'On Campaign'].map((stage, i, arr) => (
              <div key={stage} className="flex items-center">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-slate-800 border-2 border-slate-600 flex items-center justify-center text-slate-300 font-bold">
                    {i + 1}
                  </div>
                  <span className="text-sm font-medium text-slate-300">{stage}</span>
                </div>
                {i < arr.length - 1 && (
                  <div className="w-16 h-0.5 bg-slate-600 mx-2 relative top-[-12px]">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 border-t-2 border-r-2 border-slate-600 rotate-45" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-lg font-bold text-white mb-4">Brand Pipeline Flow</h3>
        <div className="glass-panel p-8 rounded-xl border border-slate-700/50 overflow-x-auto">
          <div className="flex items-center min-w-max">
            {['Lead', 'Contacted', 'Interested', 'Trial', 'Active', 'Churned'].map((stage, i, arr) => (
              <div key={stage} className="flex items-center">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-slate-800 border-2 border-slate-600 flex items-center justify-center text-slate-300 font-bold">
                    {i + 1}
                  </div>
                  <span className="text-sm font-medium text-slate-300">{stage}</span>
                </div>
                {i < arr.length - 1 && (
                  <div className="w-16 h-0.5 bg-slate-600 mx-2 relative top-[-12px]">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 border-t-2 border-r-2 border-slate-600 rotate-45" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function TabPoints() {
  return (
    <div className="space-y-8">
      <section>
        <h3 className="text-lg font-bold text-white mb-4">Reputation Tiers</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { name: 'Bronze', pts: '0 - 100', color: 'text-orange-400', border: 'border-orange-400/30' },
            { name: 'Silver', pts: '101 - 300', color: 'text-slate-300', border: 'border-slate-400/30' },
            { name: 'Gold', pts: '301 - 1000', color: 'text-yellow-400', border: 'border-yellow-400/30' },
            { name: 'Platinum', pts: '1000+', color: 'text-cyan-400', border: 'border-cyan-400/30' },
          ].map(tier => (
            <div key={tier.name} className={clsx("glass-panel p-5 rounded-xl border-t-4", tier.border)}>
              <h4 className={clsx("font-bold text-lg mb-1", tier.color)}>{tier.name}</h4>
              <p className="text-sm text-slate-400">{tier.pts} pts required</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-lg font-bold text-white mb-4">Point Actions</h3>
        <div className="glass-panel rounded-xl border border-slate-700/50 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-700/50 bg-slate-800/30">
                <th className="p-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Action</th>
                <th className="p-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Points Awarded</th>
                <th className="p-4 text-xs font-semibold text-slate-400 uppercase tracking-wider text-right">Edit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {[
                { action: 'Complete Profile Onboarding', pts: '+50' },
                { action: 'Deliver Standard Reel (On Time)', pts: '+25' },
                { action: 'Deliver Standard Story (On Time)', pts: '+10' },
                { action: 'Late Delivery Penalty', pts: '-15' },
                { action: 'Ghosting / No Show Penalty', pts: '-100' },
              ].map((item) => (
                <tr key={item.action} className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 text-sm font-medium text-slate-200">{item.action}</td>
                  <td className={clsx("p-4 text-sm font-bold", item.pts.startsWith('+') ? 'text-emerald-400' : 'text-red-400')}>{item.pts}</td>
                  <td className="p-4 text-right">
                    <button onClick={() => addToast('Edit mode opened', 'info')} className="text-slate-400 hover:text-white"><Edit2 size={14} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function TabPayments() {
  return (
    <div className="space-y-8">
      <section>
        <h3 className="text-lg font-bold text-white mb-4">Agency Commission Structure</h3>
        <div className="glass-panel p-6 rounded-xl border border-slate-700/50 space-y-4">
          <div className="flex justify-between items-center pb-4 border-b border-slate-700/50">
            <div>
              <p className="text-white font-medium">Standard Paid Campaign Cut</p>
              <p className="text-sm text-slate-400">Percentage taken from brand budget before paying influencer.</p>
            </div>
            <div className="flex items-center gap-2">
              <input type="number" defaultValue={20} className="w-20 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white text-center focus:outline-none focus:border-blue-500" />
              <span className="text-slate-400">%</span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-white font-medium">Barter Campaign Management Fee</p>
              <p className="text-sm text-slate-400">Fixed fee charged to brand per barter influencer.</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-slate-400">₹</span>
              <input type="number" defaultValue={1500} className="w-24 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white text-center focus:outline-none focus:border-blue-500" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function TabTemplates() {
  const { addToast } = useToast();
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-white">Outreach Templates</h3>
        <button onClick={() => addToast('Opening new template modal...', 'info')} className="text-sm bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 px-3 py-1.5 rounded-lg flex items-center gap-1 font-medium transition-colors">
          <Plus size={14} /> New Template
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[
          { name: 'Initial Cold DM (Influencer)', type: 'Influencer', text: 'Hey {name}! 👋 Love your content on {niche}. We are an agency connecting creators with top brands in {region}. Open to collabs?' },
          { name: 'Follow Up 1 (Influencer)', type: 'Influencer', text: 'Just bumping this up {name}! Let me know if you are taking on new barter/paid deals this month. 🚀' },
          { name: 'Initial Cold DM (Brand)', type: 'Brand', text: 'Hi {brand_name}! Your food looks amazing 🔥 We help restaurants in {region} get featured by top local foodies. Interested in a quick chat?' },
        ].map(tpl => (
          <div key={tpl.name} className="glass-panel p-5 rounded-xl border border-slate-700/50 flex flex-col">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="font-bold text-white">{tpl.name}</h4>
                <span className="text-[10px] uppercase tracking-wider text-slate-500 font-medium">{tpl.type}</span>
              </div>
              <div className="flex gap-2">
                <button onClick={() => addToast('Edit mode opened', 'info')} className="text-slate-400 hover:text-white"><Edit2 size={14} /></button>
                <button onClick={() => addToast('Template removed', 'success')} className="text-red-400 hover:text-red-300"><Trash2 size={14} /></button>
              </div>
            </div>
            <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-800 text-sm text-slate-300 flex-1">
              {tpl.text}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TabLimits() {
  return (
    <div className="space-y-8">
      <section>
        <h3 className="text-lg font-bold text-white mb-4">Instagram Rate Limits (Per Account)</h3>
        <div className="glass-panel rounded-xl border border-slate-700/50 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-700/50 bg-slate-800/30">
                <th className="p-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Account Stage</th>
                <th className="p-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Max DMs / Day</th>
                <th className="p-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Delay Between DMs</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-4 text-sm font-medium text-amber-400">Warmup (Days 1-7)</td>
                <td className="p-4"><input type="number" defaultValue={15} className="w-20 bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-white text-sm focus:outline-none" /></td>
                <td className="p-4"><input type="text" defaultValue="10-15 mins" className="w-24 bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-white text-sm focus:outline-none" /></td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-4 text-sm font-medium text-blue-400">Active (Days 8-30)</td>
                <td className="p-4"><input type="number" defaultValue={35} className="w-20 bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-white text-sm focus:outline-none" /></td>
                <td className="p-4"><input type="text" defaultValue="5-8 mins" className="w-24 bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-white text-sm focus:outline-none" /></td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-4 text-sm font-medium text-emerald-400">Veteran (30+ Days)</td>
                <td className="p-4"><input type="number" defaultValue={50} className="w-20 bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-white text-sm focus:outline-none" /></td>
                <td className="p-4"><input type="text" defaultValue="3-5 mins" className="w-24 bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-white text-sm focus:outline-none" /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function TabClassification() {
  const { addToast } = useToast();
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-white">AI Reply Classification Rules</h3>
        <button onClick={() => addToast('Opening add rule modal...', 'info')} className="text-sm bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 px-3 py-1.5 rounded-lg flex items-center gap-1 font-medium transition-colors">
          <Plus size={14} /> Add Rule
        </button>
      </div>
      
      <div className="glass-panel rounded-xl border border-slate-700/50 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-700/50 bg-slate-800/30">
              <th className="p-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Classification</th>
              <th className="p-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Keywords / Intent</th>
              <th className="p-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Automated Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50">
            <tr className="hover:bg-slate-800/30 transition-colors">
              <td className="p-4 text-sm font-medium text-emerald-400">Positive / Interested</td>
              <td className="p-4 text-sm text-slate-300">"yes", "interested", "sure", "send details"</td>
              <td className="p-4 text-sm text-slate-400">Move to 'Replied' pipeline, alert agent.</td>
            </tr>
            <tr className="hover:bg-slate-800/30 transition-colors">
              <td className="p-4 text-sm font-medium text-amber-400">Question / Details</td>
              <td className="p-4 text-sm text-slate-300">"how much", "what are the terms", "?"</td>
              <td className="p-4 text-sm text-slate-400">Flag for manual review.</td>
            </tr>
            <tr className="hover:bg-slate-800/30 transition-colors">
              <td className="p-4 text-sm font-medium text-red-400">Negative / Unsubscribe</td>
              <td className="p-4 text-sm text-slate-300">"no", "stop", "not interested", "unsubscribe"</td>
              <td className="p-4 text-sm text-slate-400">Mark as 'Churned', add to Do Not Contact list.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
