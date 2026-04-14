import { useState } from 'react';
import { Instagram, Key, Activity, FastForward, RefreshCw, Settings, ShieldAlert } from 'lucide-react';
import { Modal } from '../components/ui/Modal';
import { useToast } from '../components/ui/ToastContext';

const mockAccounts = [
  { id: 1, username: 'selena.vib', persona: 'Selena', role: 'VibMedia Recruiter', status: 'active', stage: 'active', dmsSent: 12, dmsLimit: 15, proxy: 'proxy-1 (103.42.xx.xx)', sessionValid: true, lastLogin: '2 hours ago', healthChecked: '30 min ago' },
  { id: 2, username: 'meera.recruit', persona: 'Meera', role: 'VibMedia Recruiter', status: 'active', stage: 'active', dmsSent: 8, dmsLimit: 15, proxy: 'proxy-1 (103.42.xx.xx)', sessionValid: true, lastLogin: '5 hours ago', healthChecked: '1 hour ago' },
  { id: 3, username: 'ritika.collab', persona: 'Ritika', role: 'VibMedia Recruiter', status: 'warmup', stage: 'week2', dmsSent: 0, dmsLimit: 0, proxy: 'proxy-2 (185.92.xx.xx)', sessionValid: true, lastLogin: '1 day ago', healthChecked: '2 hours ago' },
  { id: 4, username: 'prerna.vib', persona: 'Prerna', role: 'VibMedia Recruiter', status: 'cooldown', stage: 'active', dmsSent: 0, dmsLimit: 15, proxy: 'proxy-2 (185.92.xx.xx)', sessionValid: false, lastLogin: '3 days ago', healthChecked: '12 hours ago' },
  { id: 5, username: 'aanya.connect', persona: 'Aanya', role: 'VibMedia Recruiter', status: 'challenged', stage: 'week3', dmsSent: 3, dmsLimit: 5, proxy: 'proxy-3 (92.118.xx.xx)', sessionValid: false, lastLogin: '1 hour ago', healthChecked: '10 min ago' },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
    case 'warmup': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
    case 'cooldown': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    case 'challenged': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
    case 'banned': return 'bg-red-500/20 text-red-400 border-red-500/30';
    default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
  }
};

export function IGAccounts() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isChallengeModalOpen, setIsChallengeModalOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<any>(null);
  const { addToast } = useToast();

  const handleLoginClick = (account: any) => {
    setSelectedAccount(account);
    if (account.status === 'challenged') {
      setIsChallengeModalOpen(true);
    } else {
      setIsLoginModalOpen(true);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">IG Accounts</h1>
          <p className="text-slate-400 mt-1">Manage Instagram outreach accounts and warmup schedules.</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl font-medium transition-colors shadow-lg shadow-blue-500/20 self-start sm:self-auto"
        >
          + Add Account
        </button>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="glass-panel rounded-xl p-4">
          <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Total Accounts</p>
          <p className="text-2xl font-bold text-white mt-1">5</p>
        </div>
        <div className="glass-panel rounded-xl p-4">
          <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Active</p>
          <p className="text-2xl font-bold text-emerald-400 mt-1">2</p>
        </div>
        <div className="glass-panel rounded-xl p-4">
          <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Warmup</p>
          <p className="text-2xl font-bold text-amber-400 mt-1">1</p>
        </div>
        <div className="glass-panel rounded-xl p-4">
          <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Challenged</p>
          <p className="text-2xl font-bold text-orange-400 mt-1">1</p>
        </div>
        <div className="glass-panel rounded-xl p-4">
          <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">DMs Today</p>
          <p className="text-2xl font-bold text-blue-400 mt-1">23<span className="text-sm text-slate-500 font-medium">/50</span></p>
        </div>
        <div className="glass-panel rounded-xl p-4">
          <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Capacity</p>
          <p className="text-2xl font-bold text-violet-400 mt-1">27</p>
        </div>
      </div>

      {/* Accounts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {mockAccounts.map((account) => (
          <div key={account.id} className="glass-panel rounded-2xl p-6 flex flex-col group relative overflow-hidden">
            {/* Glow effect based on status */}
            <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl -mr-10 -mt-10 transition-transform group-hover:scale-150 duration-500 opacity-20 ${
              account.status === 'active' ? 'bg-emerald-500' :
              account.status === 'warmup' ? 'bg-amber-500' :
              account.status === 'challenged' ? 'bg-orange-500' : 'bg-blue-500'
            }`} />

            <div className="flex justify-between items-start mb-4 relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center text-lg font-bold text-slate-300">
                  {account.persona.charAt(0)}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-1">
                    @{account.username}
                  </h3>
                  <p className="text-sm text-slate-400">{account.persona} — {account.role}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4 mb-6 flex-1 relative z-10">
              <div className="flex items-center justify-between">
                <span className={`px-2.5 py-1 rounded-md text-xs font-medium border capitalize ${getStatusColor(account.status)}`}>
                  {account.status}
                </span>
                <span className="text-xs font-medium text-slate-400 bg-slate-800/50 px-2 py-1 rounded-md border border-slate-700">
                  Stage: {account.stage}
                </span>
              </div>

              <div className="bg-slate-900/50 rounded-xl p-3 border border-slate-800">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-400">DMs Today</span>
                  <span className="text-white font-medium">{account.dmsSent} / {account.dmsLimit}</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 rounded-full" 
                    style={{ width: `${account.dmsLimit > 0 ? (account.dmsSent / account.dmsLimit) * 100 : 0}%` }}
                  />
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">Proxy</span>
                  <span className="text-slate-300">{account.proxy}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Session</span>
                  <span className={account.sessionValid ? "text-emerald-400" : "text-red-400"}>
                    {account.sessionValid ? `Valid ✅ (${account.lastLogin})` : `Expired ❌ (${account.lastLogin})`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Health</span>
                  <span className="text-slate-400 text-xs">Checked {account.healthChecked}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-700/50 flex items-center justify-between relative z-10">
              <div className="flex gap-2">
                <button 
                  onClick={() => handleLoginClick(account)}
                  className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors border border-slate-700"
                  title="Login / Resolve Challenge"
                >
                  {account.status === 'challenged' ? <ShieldAlert size={16} className="text-orange-400" /> : <Key size={16} />}
                </button>
                <button 
                  onClick={() => addToast('Health check initiated...', 'info')}
                  className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors border border-slate-700"
                  title="Health Check"
                >
                  <Activity size={16} />
                </button>
                <button 
                  onClick={() => addToast('Warmup advanced to next stage', 'success')}
                  className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors border border-slate-700"
                  title="Advance Warmup"
                >
                  <FastForward size={16} />
                </button>
                <button 
                  onClick={() => addToast('Daily counts reset', 'success')}
                  className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors border border-slate-700"
                  title="Reset Daily Count"
                >
                  <RefreshCw size={16} />
                </button>
              </div>
              <button className="p-2 rounded-lg text-slate-500 hover:text-white transition-colors">
                <Settings size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Account Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add IG Account">
        <form onSubmit={(e) => { e.preventDefault(); setIsAddModalOpen(false); addToast('Account added', 'success'); }} className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-300">Username</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">@</span>
              <input required type="text" className="w-full bg-slate-900/50 border border-slate-700 rounded-lg pl-8 pr-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500" />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-300">Persona Name</label>
            <input required type="text" className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-300">Password</label>
            <input required type="password" className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-300">Proxy Group</label>
            <select className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500 appearance-none">
              <option>proxy-1 (Residential)</option>
              <option>proxy-2 (Residential)</option>
            </select>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <input type="checkbox" id="warmup" defaultChecked className="rounded border-slate-700 bg-slate-900/50 text-blue-500 focus:ring-blue-500" />
            <label htmlFor="warmup" className="text-sm text-slate-300">Start in Warmup Mode</label>
          </div>
          <div className="pt-4 flex gap-3">
            <button type="button" onClick={() => setIsAddModalOpen(false)} className="flex-1 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-xl font-medium transition-colors">Cancel</button>
            <button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl font-medium transition-colors">Save Account</button>
          </div>
        </form>
      </Modal>

      {/* Login Modal */}
      <Modal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} title="Login to Instagram">
        <form onSubmit={(e) => { e.preventDefault(); setIsLoginModalOpen(false); addToast('Session established ✅', 'success'); }} className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-300">Username</label>
            <input type="text" readOnly value={selectedAccount?.username || ''} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-400 cursor-not-allowed" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-300">Password</label>
            <input required type="password" placeholder="Enter password to authenticate" className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500" />
          </div>
          <div className="pt-4">
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl font-medium transition-colors flex items-center justify-center gap-2">
              <Instagram size={18} /> Login to Instagram
            </button>
          </div>
        </form>
      </Modal>

      {/* Challenge Modal */}
      <Modal isOpen={isChallengeModalOpen} onClose={() => setIsChallengeModalOpen(false)} title="Resolve Challenge">
        <form onSubmit={(e) => { e.preventDefault(); setIsChallengeModalOpen(false); addToast('Challenge resolved ✅', 'success'); }} className="space-y-4">
          <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-4 flex gap-3">
            <ShieldAlert className="text-orange-400 shrink-0" size={20} />
            <p className="text-sm text-orange-200">Instagram requires verification. Please enter the 6-digit code sent to the email or phone associated with @{selectedAccount?.username}.</p>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-300">Security Code</label>
            <input required type="text" maxLength={6} placeholder="123456" className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-center text-2xl tracking-widest text-white focus:outline-none focus:border-blue-500" />
          </div>
          <div className="pt-4">
            <button type="submit" className="w-full bg-orange-600 hover:bg-orange-500 text-white px-4 py-2 rounded-xl font-medium transition-colors">
              Submit Code
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
