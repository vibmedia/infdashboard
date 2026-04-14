import { useState } from 'react';
import { Send, MessageCircle, Play, Pause, CheckCircle2, AlertCircle, Clock } from 'lucide-react';
import { clsx } from 'clsx';
import { useToast } from '../components/ui/ToastContext';

const mockQueue = [
  { id: 1, handle: 'street.bites.dk', name: 'Deepak Kumar', tier: 'nano', status: 'imported', nextStep: 'Step 1: Intro', account: '@selena.vib', scheduled: 'Ready now' },
  { id: 2, handle: 'foodie.neha.delhi', name: 'Neha Agarwal', tier: 'micro', status: 'dm_sent', nextStep: 'Step 2: Follow-up', account: '@meera.recruit', scheduled: 'Tomorrow' },
  { id: 3, handle: 'gk.food.tales', name: 'Meera Kapoor', tier: 'nano', status: 'dm_sent', nextStep: 'Step 2: Follow-up', account: '@selena.vib', scheduled: 'Tomorrow' },
];

const mockLogs = [
  { id: 1, from: '@selena.vib', to: '@delhi.foodie.priya', message: 'Hey Priya! 👋...', step: 'Step 1', status: 'Sent', time: '12:30 PM' },
  { id: 2, from: '@meera.recruit', to: '@eat.with.rahul', message: 'Hi Rahul, just checking...', step: 'Step 2', status: 'Sent', time: '12:28 PM' },
  { id: 3, from: '@selena.vib', to: '@noida.nom.nom', message: 'Hey Ananya! One more...', step: 'Step 3', status: 'Sent', time: '12:25 PM' },
];

const mockReplies = [
  { id: 1, from: '@delhi.foodie.priya', reply: 'Yes interested!', classification: 'positive 🟢', confidence: '95%', action: 'Start onboarding' },
  { id: 2, from: '@cp.cafe.diaries', reply: 'How much do you pay?', classification: 'question 🟡', confidence: '88%', action: 'Auto-reply FAQ' },
  { id: 3, from: '@foodie_random', reply: 'Not interested bro', classification: 'negative 🔴', confidence: '92%', action: 'Mark cold' },
];

export function Outreach() {
  const [isPaused, setIsPaused] = useState(false);
  const { addToast } = useToast();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Outreach Operations</h1>
        <p className="text-slate-400 mt-1">Manage Instagram DM queues and reply classifications.</p>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-panel rounded-xl p-4 border-l-4 border-l-blue-500">
          <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">DMs Sent Today</p>
          <p className="text-2xl font-bold text-white mt-1">23</p>
        </div>
        <div className="glass-panel rounded-xl p-4 border-l-4 border-l-violet-500">
          <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Replies Today</p>
          <p className="text-2xl font-bold text-white mt-1">5</p>
        </div>
        <div className="glass-panel rounded-xl p-4 border-l-4 border-l-emerald-500">
          <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Positive Replies</p>
          <p className="text-2xl font-bold text-emerald-400 mt-1">3</p>
        </div>
        <div className="glass-panel rounded-xl p-4 border-l-4 border-l-amber-500">
          <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Reply Rate</p>
          <p className="text-2xl font-bold text-amber-400 mt-1">21.7%</p>
        </div>
      </div>

      {/* Outreach Queue */}
      <div className="glass-panel rounded-xl overflow-hidden border border-slate-700">
        <div className="p-5 border-b border-slate-700/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-800/30">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Clock size={18} className="text-blue-400" /> Outreach Queue
          </h2>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => {
                setIsPaused(!isPaused);
                addToast(isPaused ? 'Outreach resumed' : 'Outreach paused', 'info');
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 border border-slate-700"
            >
              {isPaused ? <Play size={16} className="text-emerald-400" /> : <Pause size={16} className="text-amber-400" />}
              {isPaused ? 'Resume Outreach' : 'Pause Outreach'}
            </button>
            <button 
              onClick={() => addToast('Sending next batch...', 'success')}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20"
            >
              <Send size={16} /> Send Next Batch
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-700/50 bg-slate-900/50 text-xs uppercase tracking-wider text-slate-400">
                <th className="px-6 py-3 font-medium">Target</th>
                <th className="px-6 py-3 font-medium">Tier</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Next Step</th>
                <th className="px-6 py-3 font-medium">Assigned Account</th>
                <th className="px-6 py-3 font-medium">Scheduled</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {mockQueue.map((row) => (
                <tr key={row.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-3 whitespace-nowrap">
                    <div className="font-medium text-white">@{row.handle}</div>
                    <div className="text-xs text-slate-400">{row.name}</div>
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap">
                    <span className="px-2 py-0.5 rounded text-[10px] font-medium border uppercase tracking-wider bg-slate-800 text-slate-300 border-slate-700">
                      {row.tier}
                    </span>
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-slate-300">{row.status}</td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-blue-400">{row.nextStep}</td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-slate-300">{row.account}</td>
                  <td className="px-6 py-3 whitespace-nowrap">
                    <span className={clsx("text-sm font-medium", row.scheduled === 'Ready now' ? "text-emerald-400" : "text-slate-400")}>
                      {row.scheduled}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent DM Log */}
        <div className="glass-panel rounded-xl overflow-hidden border border-slate-700 flex flex-col">
          <div className="p-5 border-b border-slate-700/50 bg-slate-800/30">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Send size={18} className="text-violet-400" /> Recent DM Log
            </h2>
          </div>
          <div className="p-5 flex-1 overflow-y-auto">
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-700 before:to-transparent">
              {mockLogs.map((log) => (
                <div key={log.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-slate-700 bg-slate-900 text-emerald-400 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_10px_rgba(16,185,129,0.2)] z-10">
                    <CheckCircle2 size={16} />
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass-panel p-4 rounded-xl border border-slate-700/50">
                    <div className="flex justify-between items-start mb-2">
                      <div className="text-xs font-medium text-slate-400">
                        <span className="text-blue-400">{log.from}</span> → <span className="text-white">{log.to}</span>
                      </div>
                      <span className="text-[10px] text-slate-500">{log.time}</span>
                    </div>
                    <p className="text-sm text-slate-300 mb-2">"{log.message}"</p>
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                      {log.step}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reply Classification Log */}
        <div className="glass-panel rounded-xl overflow-hidden border border-slate-700 flex flex-col">
          <div className="p-5 border-b border-slate-700/50 bg-slate-800/30">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <MessageCircle size={18} className="text-emerald-400" /> Reply Classification Log
            </h2>
          </div>
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-700/50 bg-slate-900/50 text-xs uppercase tracking-wider text-slate-400">
                  <th className="px-4 py-3 font-medium">From</th>
                  <th className="px-4 py-3 font-medium">Reply</th>
                  <th className="px-4 py-3 font-medium">Classification</th>
                  <th className="px-4 py-3 font-medium">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {mockReplies.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-white">{row.from}</td>
                    <td className="px-4 py-3 text-sm text-slate-300 italic">"{row.reply}"</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex flex-col gap-1">
                        <span className="text-xs font-medium">{row.classification}</span>
                        <span className="text-[10px] text-slate-500">Conf: {row.confidence}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-blue-400 font-medium">{row.action}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
