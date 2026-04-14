import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, Users, Building2, Briefcase, Clapperboard, Settings, X,
  Instagram, Globe, MessageCircle, Send, BarChart3
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const navGroups = [
  {
    title: 'OVERVIEW',
    items: [{ path: '/', icon: LayoutDashboard, label: 'Dashboard' }]
  },
  {
    title: 'PIPELINE',
    items: [
      { path: '/influencers', icon: Users, label: 'Influencers' },
      { path: '/brands', icon: Building2, label: 'Brands' }
    ]
  },
  {
    title: 'OPERATIONS',
    items: [
      { path: '/ig-accounts', icon: Instagram, label: 'IG Accounts' },
      { path: '/proxies', icon: Globe, label: 'Proxies' },
      { path: '/whatsapp', icon: MessageCircle, label: 'WhatsApp' },
      { path: '/outreach', icon: Send, label: 'Outreach' }
    ]
  },
  {
    title: 'BUSINESS',
    items: [
      { path: '/jobs', icon: Briefcase, label: 'Jobs' },
      { path: '/campaigns', icon: Clapperboard, label: 'Campaigns' }
    ]
  },
  {
    title: 'SYSTEM',
    items: [
      { path: '/settings', icon: Settings, label: 'Settings' },
      { path: '/reports', icon: BarChart3, label: 'Reports' }
    ]
  }
];

export function Sidebar({ onClose }: { onClose: () => void }) {
  return (
    <div className="h-full glass-panel border-r border-slate-700 flex flex-col bg-slate-900/95">
      <div className="p-6 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/20">
            K
          </div>
          <div>
            <h1 className="font-bold text-xl tracking-tight text-white">Kobi</h1>
            <p className="text-xs text-slate-400 font-medium tracking-wide uppercase">by VibMedia</p>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="lg:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      <div className="px-4 pb-4 shrink-0">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-700 to-transparent opacity-50" />
      </div>

      <nav className="flex-1 px-4 space-y-6 overflow-y-auto custom-scrollbar pb-6">
        {navGroups.map((group) => (
          <div key={group.title}>
            <h3 className="px-4 text-xs font-semibold text-slate-500 tracking-wider mb-2">{group.title}</h3>
            <div className="space-y-1">
              {group.items.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => {
                    if (window.innerWidth < 1024) onClose();
                  }}
                  className={({ isActive }) => twMerge(
                    clsx(
                      "flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 group relative overflow-hidden",
                      isActive 
                        ? "text-white bg-blue-500/10 font-medium" 
                        : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/50"
                    )
                  )}
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 rounded-r-full shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
                      )}
                      <item.icon 
                        size={18} 
                        className={clsx(
                          "transition-colors duration-200",
                          isActive ? "text-blue-400" : "text-slate-500 group-hover:text-slate-300"
                        )} 
                      />
                      <span className="text-sm">{item.label}</span>
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>

      <div className="p-4 mt-auto shrink-0">
        <div className="glass-panel rounded-xl p-4 border border-slate-700/50 bg-slate-800/30">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-sm font-medium">
              A
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">Admin User</p>
              <p className="text-xs text-slate-400 truncate">ops@vibmedia.co</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
