import { useNavigate } from 'react-router-dom';
import { Users, Building2, Briefcase, Clapperboard, TrendingUp, TrendingDown, Clock, CheckCircle2, Star, MessageSquare } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const pipelineData = [
  { name: 'Imported', value: 312, color: '#94A3B8' },
  { name: 'DM Sent', value: 180, color: '#3B82F6' },
  { name: 'Replied', value: 95, color: '#8B5CF6' },
  { name: 'Onboarding', value: 45, color: '#F59E0B' },
  { name: 'Onboarded', value: 78, color: '#10B981' },
  { name: 'Available', value: 89, color: '#06B6D4' },
  { name: 'On Campaign', value: 48, color: '#EC4899' },
];

const tierData = [
  { name: 'Nano', value: 340 },
  { name: 'Micro', value: 298 },
  { name: 'Mid', value: 145 },
  { name: 'Macro', value: 52 },
  { name: 'Mega', value: 12 },
];

const outreachData = [
  { day: 'Mon', sent: 45, replies: 8 },
  { day: 'Tue', sent: 52, replies: 12 },
  { day: 'Wed', sent: 38, replies: 6 },
  { day: 'Thu', sent: 61, replies: 15 },
  { day: 'Fri', sent: 55, replies: 11 },
  { day: 'Sat', sent: 20, replies: 4 },
  { day: 'Sun', sent: 15, replies: 3 },
];

const activities = [
  { id: 1, text: 'Priya Sharma replied to DM — positive', time: '5 min ago', icon: MessageSquare, color: 'text-blue-400', bg: 'bg-blue-400/10' },
  { id: 2, text: 'Brew & Bean posted new job: Weekend Cafe Reel', time: '23 min ago', icon: Briefcase, color: 'text-violet-400', bg: 'bg-violet-400/10' },
  { id: 3, text: 'Rahul Verma completed campaign #45', time: '1 hour ago', icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
  { id: 4, text: 'New brand lead: Pizza Paradise (GK)', time: '2 hours ago', icon: Building2, color: 'text-amber-400', bg: 'bg-amber-400/10' },
  { id: 5, text: 'Vikram Singh upgraded to Platinum tier 💎', time: '3 hours ago', icon: Star, color: 'text-cyan-400', bg: 'bg-cyan-400/10' },
];

const igHealthData = [
  { name: 'Active', value: 12, color: '#10B981' },
  { name: 'Warmup', value: 5, color: '#F59E0B' },
  { name: 'Cooldown', value: 2, color: '#3B82F6' },
  { name: 'Challenge', value: 1, color: '#EF4444' },
];

export function Dashboard() {
  const navigate = useNavigate();
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Dashboard Overview</h1>
        <p className="text-slate-400 mt-1">Welcome back. Here's what's happening today.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel rounded-2xl p-5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -mr-10 -mt-10 transition-transform group-hover:scale-150 duration-500" />
          <div className="flex justify-between items-start relative z-10">
            <div>
              <p className="text-sm font-medium text-slate-400">Total Influencers</p>
              <h3 className="text-3xl font-bold text-white mt-1">847</h3>
            </div>
            <div className="p-3 bg-blue-500/20 rounded-xl text-blue-400">
              <Users size={24} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm relative z-10">
            <span className="flex items-center text-emerald-400 font-medium">
              <TrendingUp size={16} className="mr-1" /> 12%
            </span>
            <span className="text-slate-500 ml-2">from last month</span>
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/10 rounded-full blur-3xl -mr-10 -mt-10 transition-transform group-hover:scale-150 duration-500" />
          <div className="flex justify-between items-start relative z-10">
            <div>
              <p className="text-sm font-medium text-slate-400">Active Brands</p>
              <h3 className="text-3xl font-bold text-white mt-1">156</h3>
            </div>
            <div className="p-3 bg-violet-500/20 rounded-xl text-violet-400">
              <Building2 size={24} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm relative z-10">
            <span className="flex items-center text-emerald-400 font-medium">
              <TrendingUp size={16} className="mr-1" /> 8%
            </span>
            <span className="text-slate-500 ml-2">from last month</span>
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl -mr-10 -mt-10 transition-transform group-hover:scale-150 duration-500" />
          <div className="flex justify-between items-start relative z-10">
            <div>
              <p className="text-sm font-medium text-slate-400">Open Jobs</p>
              <h3 className="text-3xl font-bold text-white mt-1">23</h3>
            </div>
            <div className="p-3 bg-amber-500/20 rounded-xl text-amber-400">
              <Briefcase size={24} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm relative z-10">
            <span className="flex items-center text-slate-400 font-medium">
              <TrendingUp size={16} className="mr-1 opacity-0" /> --
            </span>
            <span className="text-slate-500 ml-2">needs attention</span>
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -mr-10 -mt-10 transition-transform group-hover:scale-150 duration-500" />
          <div className="flex justify-between items-start relative z-10">
            <div>
              <p className="text-sm font-medium text-slate-400">Active Campaigns</p>
              <h3 className="text-3xl font-bold text-white mt-1">18</h3>
            </div>
            <div className="p-3 bg-emerald-500/20 rounded-xl text-emerald-400">
              <Clapperboard size={24} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm relative z-10">
            <span className="flex items-center text-emerald-400 font-medium">
              <TrendingUp size={16} className="mr-1" /> 3
            </span>
            <span className="text-slate-500 ml-2">new this week</span>
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl -mr-10 -mt-10 transition-transform group-hover:scale-150 duration-500" />
          <div className="flex justify-between items-start relative z-10">
            <div>
              <p className="text-sm font-medium text-slate-400">DMs Sent Today</p>
              <h3 className="text-3xl font-bold text-white mt-1">45</h3>
            </div>
            <div className="p-3 bg-cyan-500/20 rounded-xl text-cyan-400">
              <MessageSquare size={24} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm relative z-10">
            <span className="flex items-center text-emerald-400 font-medium">
              <TrendingUp size={16} className="mr-1" /> 15%
            </span>
            <span className="text-slate-500 ml-2">vs yesterday</span>
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 rounded-full blur-3xl -mr-10 -mt-10 transition-transform group-hover:scale-150 duration-500" />
          <div className="flex justify-between items-start relative z-10">
            <div>
              <p className="text-sm font-medium text-slate-400">Reply Rate</p>
              <h3 className="text-3xl font-bold text-white mt-1">17.8%</h3>
            </div>
            <div className="p-3 bg-pink-500/20 rounded-xl text-pink-400">
              <TrendingUp size={24} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm relative z-10">
            <span className="flex items-center text-emerald-400 font-medium">
              <TrendingUp size={16} className="mr-1" /> 2.1%
            </span>
            <span className="text-slate-500 ml-2">from last week</span>
          </div>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pie Chart */}
        <div className="glass-panel rounded-2xl p-6 lg:col-span-1 flex flex-col">
          <h3 className="text-lg font-semibold text-white mb-6">Influencer Pipeline</h3>
          <div className="flex-1 min-h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pipelineData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {pipelineData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: '#1E293B', borderColor: '#334155', borderRadius: '0.5rem', color: '#F8FAFC' }}
                  itemStyle={{ color: '#F8FAFC' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {pipelineData.map((item) => (
              <div key={item.name} className="flex items-center text-xs">
                <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: item.color }} />
                <span className="text-slate-300 truncate">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Line Chart */}
        <div className="glass-panel rounded-2xl p-6 lg:col-span-2 flex flex-col">
          <h3 className="text-lg font-semibold text-white mb-6">Outreach Activity (Last 7 Days)</h3>
          <div className="flex-1 min-h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={outreachData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="day" stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: '#1E293B', borderColor: '#334155', borderRadius: '0.5rem', color: '#F8FAFC' }}
                />
                <Line type="monotone" dataKey="sent" name="DMs Sent" stroke="#3B82F6" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="replies" name="Replies" stroke="#10B981" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bar Chart */}
        <div className="glass-panel rounded-2xl p-6 lg:col-span-2 flex flex-col">
          <h3 className="text-lg font-semibold text-white mb-6">Influencers by Tier</h3>
          <div className="flex-1 min-h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={tierData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="name" stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: '#1E293B', borderColor: '#334155', borderRadius: '0.5rem', color: '#F8FAFC' }}
                  cursor={{ fill: '#334155', opacity: 0.4 }}
                />
                <Bar dataKey="value" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* IG Health Donut Chart */}
        <div className="glass-panel rounded-2xl p-6 lg:col-span-1 flex flex-col">
          <h3 className="text-lg font-semibold text-white mb-6">IG Account Health</h3>
          <div className="flex-1 min-h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={igHealthData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {igHealthData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: '#1E293B', borderColor: '#334155', borderRadius: '0.5rem', color: '#F8FAFC' }}
                  itemStyle={{ color: '#F8FAFC' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {igHealthData.map((item) => (
              <div key={item.name} className="flex items-center text-xs">
                <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: item.color }} />
                <span className="text-slate-300 truncate">{item.name}</span>
                <span className="ml-auto font-medium text-white">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="glass-panel rounded-2xl p-6 lg:col-span-3 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
            <button onClick={() => navigate('/reports')} className="text-xs text-blue-400 hover:text-blue-300 font-medium">View All</button>
          </div>
          <div className="flex-1 overflow-y-auto pr-2 space-y-4">
            {activities.map((activity) => (
              <div key={activity.id} className="flex gap-3">
                <div className={`mt-0.5 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${activity.bg} ${activity.color}`}>
                  <activity.icon size={14} />
                </div>
                <div>
                  <p className="text-sm text-slate-200 leading-snug">{activity.text}</p>
                  <p className="text-xs text-slate-500 mt-1 flex items-center">
                    <Clock size={12} className="mr-1" /> {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
