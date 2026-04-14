import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, LineChart, Line, Legend } from 'recharts';
import { Activity, Users, Briefcase, CheckCircle2, XCircle } from 'lucide-react';
import { clsx } from 'clsx';

const weeklyData = [
  { name: 'DMs Sent', lastWeek: 150, thisWeek: 210 },
  { name: 'Replies', lastWeek: 35, thisWeek: 48 },
  { name: 'Onboarded', lastWeek: 12, thisWeek: 18 },
  { name: 'Campaigns', lastWeek: 5, thisWeek: 8 },
];

const agentData = [
  { day: 'Mon', enrichments: 45, classifications: 20, onboardings: 5 },
  { day: 'Tue', enrichments: 52, classifications: 25, onboardings: 8 },
  { day: 'Wed', enrichments: 38, classifications: 18, onboardings: 4 },
  { day: 'Thu', enrichments: 65, classifications: 30, onboardings: 10 },
  { day: 'Fri', enrichments: 48, classifications: 22, onboardings: 6 },
  { day: 'Sat', enrichments: 20, classifications: 10, onboardings: 2 },
  { day: 'Sun', enrichments: 15, classifications: 8, onboardings: 1 },
];

const mockLogs = [
  { id: 1, time: '12:30 PM', agent: 'enrichment', action: 'enrich_profile', target: '@delhi.foodie.priya', status: 'success', duration: '2.3s' },
  { id: 2, time: '12:28 PM', agent: 'classifier', action: 'classify_reply', target: '@cp.cafe.diaries', status: 'success', duration: '0.8s' },
  { id: 3, time: '12:25 PM', agent: 'outreach', action: 'send_drip_step_1', target: '@street.bites.dk', status: 'success', duration: '1.5s' },
  { id: 4, time: '12:20 PM', agent: 'onboarding', action: 'onboarding_step', target: '@noida.nom.nom', status: 'success', duration: '1.2s' },
  { id: 5, time: '12:15 PM', agent: 'enrichment', action: 'enrich_profile', target: '@random.user', status: 'error', duration: '3.1s' },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900/95 border border-slate-700 p-3 rounded-lg shadow-xl backdrop-blur-md">
        <p className="text-white font-medium mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-slate-300">{entry.name}:</span>
            <span className="text-white font-medium">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export function Reports() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">System Reports</h1>
        <p className="text-slate-400 mt-1">Analytics and AI agent activity logs.</p>
      </div>

      {/* Today's Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel rounded-xl p-5 border-t-4 border-t-blue-500">
          <div className="flex items-center gap-2 text-blue-400 mb-3">
            <Activity size={18} />
            <h3 className="font-bold">Outreach</h3>
          </div>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between"><span className="text-slate-400">DMs Sent</span><span className="text-white font-medium">45</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Replies</span><span className="text-white font-medium">8</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Positive</span><span className="text-emerald-400 font-medium">5</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Reply Rate</span><span className="text-white font-medium">17.8%</span></div>
          </div>
        </div>

        <div className="glass-panel rounded-xl p-5 border-t-4 border-t-violet-500">
          <div className="flex items-center gap-2 text-violet-400 mb-3">
            <Users size={18} />
            <h3 className="font-bold">Pipeline</h3>
          </div>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between"><span className="text-slate-400">Imported</span><span className="text-white font-medium">312</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Onboarded</span><span className="text-white font-medium">78</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Available</span><span className="text-white font-medium">89</span></div>
            <div className="flex justify-between"><span className="text-slate-400">On Campaign</span><span className="text-white font-medium">48</span></div>
          </div>
        </div>

        <div className="glass-panel rounded-xl p-5 border-t-4 border-t-emerald-500">
          <div className="flex items-center gap-2 text-emerald-400 mb-3">
            <Briefcase size={18} />
            <h3 className="font-bold">Jobs</h3>
          </div>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between"><span className="text-slate-400">Open Jobs</span><span className="text-white font-medium">5</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Apps Today</span><span className="text-white font-medium">3</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Fill Rate</span><span className="text-emerald-400 font-medium">65%</span></div>
          </div>
        </div>

        <div className="glass-panel rounded-xl p-5 border-t-4 border-t-amber-500">
          <div className="flex items-center gap-2 text-amber-400 mb-3">
            <Activity size={18} />
            <h3 className="font-bold">AI Agents</h3>
          </div>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between"><span className="text-slate-400">Enrichments</span><span className="text-white font-medium">12</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Classifications</span><span className="text-white font-medium">8</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Onboardings</span><span className="text-white font-medium">2</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Errors</span><span className="text-red-400 font-medium">1</span></div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-panel rounded-xl p-6 border border-slate-700">
          <h3 className="text-lg font-bold text-white mb-6">Weekly Comparison</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="name" stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
                <RechartsTooltip content={<CustomTooltip />} cursor={{ fill: '#1E293B', opacity: 0.4 }} />
                <Legend wrapperStyle={{ paddingTop: '20px' }} />
                <Bar dataKey="lastWeek" name="Last Week" fill="#475569" radius={[4, 4, 0, 0]} />
                <Bar dataKey="thisWeek" name="This Week" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-panel rounded-xl p-6 border border-slate-700">
          <h3 className="text-lg font-bold text-white mb-6">AI Agent Activity (7 Days)</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={agentData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="day" stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
                <RechartsTooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ paddingTop: '20px' }} />
                <Line type="monotone" dataKey="enrichments" name="Enrichments" stroke="#8B5CF6" strokeWidth={3} dot={{ r: 4, fill: '#8B5CF6', strokeWidth: 0 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="classifications" name="Classifications" stroke="#10B981" strokeWidth={3} dot={{ r: 4, fill: '#10B981', strokeWidth: 0 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="onboardings" name="Onboardings" stroke="#F59E0B" strokeWidth={3} dot={{ r: 4, fill: '#F59E0B', strokeWidth: 0 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Agent Logs Table */}
      <div className="glass-panel rounded-xl overflow-hidden border border-slate-700">
        <div className="p-5 border-b border-slate-700/50 bg-slate-800/30">
          <h2 className="text-lg font-bold text-white">Agent Logs</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-700/50 bg-slate-900/50 text-xs uppercase tracking-wider text-slate-400">
                <th className="px-6 py-3 font-medium">Time</th>
                <th className="px-6 py-3 font-medium">Agent</th>
                <th className="px-6 py-3 font-medium">Action</th>
                <th className="px-6 py-3 font-medium">Target</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Duration</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {mockLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-slate-400">{log.time}</td>
                  <td className="px-6 py-3 whitespace-nowrap">
                    <span className={clsx(
                      "px-2 py-0.5 rounded text-[10px] font-medium border uppercase tracking-wider",
                      log.agent === 'enrichment' ? 'bg-violet-500/10 text-violet-400 border-violet-500/20' :
                      log.agent === 'classifier' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                      log.agent === 'outreach' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                      'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                    )}>
                      {log.agent}
                    </span>
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm font-mono text-slate-300">{log.action}</td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-white">{log.target}</td>
                  <td className="px-6 py-3 whitespace-nowrap">
                    {log.status === 'success' ? (
                      <CheckCircle2 size={16} className="text-emerald-400" />
                    ) : (
                      <XCircle size={16} className="text-red-400" />
                    )}
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-slate-400">{log.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
