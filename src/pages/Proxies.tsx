import React, { useState } from 'react';
import { Globe, Activity, Edit2, Trash2, CheckCircle2, XCircle, RefreshCw } from 'lucide-react';
import { Modal } from '../components/ui/Modal';
import { useToast } from '../components/ui/ToastContext';

const mockProxies = [
  { id: 1, name: 'proxy-1', ip: '103.42.156.78', port: '8080', type: 'residential', status: 'active', accounts: 2, maxAccounts: 2, linked: ['@selena.vib', '@meera.recruit'], lastCheck: '15 min ago', responseTime: '245ms' },
  { id: 2, name: 'proxy-2', ip: '185.92.44.22', port: '3128', type: 'residential', status: 'active', accounts: 2, maxAccounts: 2, linked: ['@ritika.collab', '@prerna.vib'], lastCheck: '20 min ago', responseTime: '312ms' },
  { id: 3, name: 'proxy-3', ip: '92.118.77.91', port: '8080', type: 'datacenter', status: 'down', accounts: 1, maxAccounts: 2, linked: ['@aanya.connect'], lastCheck: '5 min ago', responseTime: 'TIMEOUT' },
];

export function Proxies() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const { addToast } = useToast();

  const handleTestConnection = () => {
    setIsTesting(true);
    setTimeout(() => {
      setIsTesting(false);
      addToast('Connected — IP: 103.42.156.78, Response: 234ms', 'success');
    }, 1500);
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAddModalOpen(false);
    addToast('Proxy added successfully', 'success');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Proxies</h1>
          <p className="text-slate-400 mt-1">Manage IP addresses for Instagram outreach.</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl font-medium transition-colors shadow-lg shadow-blue-500/20 self-start sm:self-auto"
        >
          + Add Proxy
        </button>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-panel rounded-xl p-4">
          <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Total Proxies</p>
          <p className="text-2xl font-bold text-white mt-1">3</p>
        </div>
        <div className="glass-panel rounded-xl p-4">
          <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Active</p>
          <p className="text-2xl font-bold text-emerald-400 mt-1">2</p>
        </div>
        <div className="glass-panel rounded-xl p-4">
          <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Down</p>
          <p className="text-2xl font-bold text-red-400 mt-1">1</p>
        </div>
        <div className="glass-panel rounded-xl p-4">
          <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Account Slots</p>
          <p className="text-2xl font-bold text-blue-400 mt-1">4<span className="text-sm text-slate-500 font-medium">/6 used</span></p>
        </div>
      </div>

      {/* Proxies List */}
      <div className="space-y-4">
        {mockProxies.map((proxy) => (
          <div key={proxy.id} className="glass-panel rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 group">
            <div className="flex items-start gap-4">
              <div className={`mt-1 w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                proxy.status === 'active' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
              }`}>
                <Globe size={20} />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-lg font-bold text-white">{proxy.name}</h3>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-medium border uppercase tracking-wider ${
                    proxy.type === 'residential' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                    proxy.type === 'datacenter' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                    'bg-blue-500/10 text-blue-400 border-blue-500/20'
                  }`}>
                    {proxy.type}
                  </span>
                  {proxy.status === 'active' ? (
                    <span className="flex items-center gap-1 text-xs font-medium text-emerald-400"><CheckCircle2 size={14} /> Active</span>
                  ) : (
                    <span className="flex items-center gap-1 text-xs font-medium text-red-400"><XCircle size={14} /> Down</span>
                  )}
                </div>
                <p className="text-sm font-mono text-slate-400">
                  {proxy.ip.split('.').map((part, i) => i > 1 ? 'xxx' : part).join('.')}:{proxy.port}
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                  <span>Accounts: <span className="text-slate-300 font-medium">{proxy.accounts}/{proxy.maxAccounts}</span></span>
                  <span>•</span>
                  <span>{proxy.linked.join(', ')}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:items-end gap-2">
              <div className="text-xs text-slate-500 flex items-center gap-1">
                <Activity size={12} /> Last check: {proxy.lastCheck} ({proxy.responseTime})
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => addToast('Running health check...', 'info')}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors border border-slate-700 text-sm font-medium flex items-center gap-2"
                >
                  <Activity size={14} /> Check
                </button>
                <button className="p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-slate-800 transition-colors">
                  <Edit2 size={16} />
                </button>
                <button className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Proxy Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add Proxy">
        <form onSubmit={handleAddSubmit} className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 space-y-1">
              <label className="text-sm font-medium text-slate-300">Proxy IP</label>
              <input required type="text" placeholder="103.42.156.78" className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-300">Port</label>
              <input required type="text" placeholder="8080" className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-300">Username</label>
              <input type="text" className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-300">Password</label>
              <input type="password" className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-300">Type</label>
              <select className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500 appearance-none">
                <option value="residential">Residential</option>
                <option value="datacenter">Datacenter</option>
                <option value="mobile">Mobile</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-300">Max Accounts</label>
              <input type="number" defaultValue={2} className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500" />
            </div>
          </div>
          
          <div className="pt-2">
            <button 
              type="button" 
              onClick={handleTestConnection}
              disabled={isTesting}
              className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2 rounded-xl font-medium transition-colors border border-slate-700 flex items-center justify-center gap-2"
            >
              {isTesting ? (
                <><RefreshCw size={16} className="animate-spin" /> Testing Connection...</>
              ) : (
                <><Activity size={16} /> Test Connection</>
              )}
            </button>
          </div>

          <div className="pt-4 flex gap-3">
            <button type="button" onClick={() => setIsAddModalOpen(false)} className="flex-1 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-xl font-medium transition-colors">Cancel</button>
            <button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl font-medium transition-colors">Save Proxy</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
