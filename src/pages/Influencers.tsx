import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Instagram, ChevronRight, X, MoreHorizontal, Edit2, Trash2, CheckCircle, ChevronLeft, Users, ChevronDown } from 'lucide-react';
import { clsx } from 'clsx';
import { Modal } from '../components/ui/Modal';
import { Dropdown, DropdownItem } from '../components/ui/Dropdown';
import { useToast } from '../components/ui/ToastContext';
import { EmptyState } from '../components/ui/EmptyState';

const mockData = [
  { id: 1, handle: 'delhi.foodie.priya', name: 'Priya Sharma', followers: 28500, engagement: 4.2, tier: 'micro', pipeline: 'available', points: 125, region: 'delhi_ncr' },
  { id: 2, handle: 'eat.with.rahul', name: 'Rahul Verma', followers: 52000, engagement: 3.8, tier: 'mid', pipeline: 'available', points: 310, region: 'delhi_ncr' },
  { id: 3, handle: 'noida.nom.nom', name: 'Ananya Gupta', followers: 12000, engagement: 5.1, tier: 'micro', pipeline: 'available', points: 35, region: 'delhi_ncr' },
  { id: 4, handle: 'gk.food.tales', name: 'Meera Kapoor', followers: 8500, engagement: 6.2, tier: 'nano', pipeline: 'onboarded', points: 10, region: 'delhi_ncr' },
  { id: 5, handle: 'cp.cafe.diaries', name: 'Vikram Singh', followers: 95000, engagement: 3.2, tier: 'mid', pipeline: 'available', points: 520, region: 'delhi_ncr' },
  { id: 6, handle: 'street.bites.dk', name: 'Deepak Kumar', followers: 5200, engagement: 7.5, tier: 'nano', pipeline: 'imported', points: 0, region: 'delhi_ncr' },
  { id: 7, handle: 'foodie.neha.delhi', name: 'Neha Agarwal', followers: 18000, engagement: 4.8, tier: 'micro', pipeline: 'available', points: 80, region: 'delhi_ncr' },
];

const formatNumber = (num: number) => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
};

const getTierColor = (tier: string) => {
  switch (tier) {
    case 'nano': return 'bg-slate-500/20 text-slate-300 border-slate-500/30';
    case 'micro': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
    case 'mid': return 'bg-violet-500/20 text-violet-300 border-violet-500/30';
    case 'macro': return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
    case 'mega': return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
    default: return 'bg-slate-500/20 text-slate-300 border-slate-500/30';
  }
};

const getPipelineColor = (status: string) => {
  switch (status) {
    case 'imported': return 'bg-slate-500/20 text-slate-300 border-slate-500/30';
    case 'dm_sent': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
    case 'replied': return 'bg-violet-500/20 text-violet-300 border-violet-500/30';
    case 'onboarded': return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
    case 'available': return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30';
    case 'on_campaign': return 'bg-pink-500/20 text-pink-300 border-pink-500/30';
    default: return 'bg-slate-500/20 text-slate-300 border-slate-500/30';
  }
};

export function Influencers() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const { addToast } = useToast();
  const navigate = useNavigate();
  
  const selectedInfluencer = mockData.find(i => i.id === selectedId);

  // Simple mock filtering
  const filteredData = mockData.filter(i => 
    i.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    i.handle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAddModalOpen(false);
    addToast('Influencer added successfully', 'success');
  };

  const handleDelete = (id: number) => {
    addToast('Influencer removed from pipeline', 'success');
  };

  return (
    <div className="h-[calc(100vh-2rem)] flex flex-col space-y-6 relative">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Influencers</h1>
          <p className="text-slate-400 mt-1">Manage your influencer pipeline and network.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => addToast('Importing CSV...', 'info')}
            className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-xl font-medium transition-colors border border-slate-700 self-start sm:self-auto"
          >
            📤 Import CSV
          </button>
          <button 
            onClick={() => addToast('Enriching profiles...', 'info')}
            className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-xl font-medium transition-colors border border-slate-700 self-start sm:self-auto"
          >
            🔄 Enrich All
          </button>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl font-medium transition-colors shadow-lg shadow-blue-500/20 self-start sm:self-auto"
          >
            + Add Influencer
          </button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="glass-panel rounded-xl p-4 flex flex-col lg:flex-row gap-4 items-center justify-between shrink-0">
        <div className="relative w-full lg:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search handle or name..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900/50 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
          />
        </div>
        
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          <div className="flex items-center gap-2 text-sm text-slate-400 mr-2">
            <Filter size={16} /> Filters:
          </div>
          <div className="relative group">
            <select className="bg-slate-900/50 border border-slate-700 rounded-xl pl-4 pr-10 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 appearance-none min-w-[140px] cursor-pointer hover:bg-slate-800/80 transition-all shadow-sm">
              <option>Pipeline: All</option>
              <option>Imported</option>
              <option>Available</option>
              <option>On Campaign</option>
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-slate-300 pointer-events-none transition-colors" />
          </div>
          <div className="relative group">
            <select className="bg-slate-900/50 border border-slate-700 rounded-xl pl-4 pr-10 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 appearance-none min-w-[120px] cursor-pointer hover:bg-slate-800/80 transition-all shadow-sm">
              <option>Tier: All</option>
              <option>Nano</option>
              <option>Micro</option>
              <option>Mid</option>
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-slate-300 pointer-events-none transition-colors" />
          </div>
          <div className="relative group">
            <select className="bg-slate-900/50 border border-slate-700 rounded-xl pl-4 pr-10 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 appearance-none min-w-[140px] cursor-pointer hover:bg-slate-800/80 transition-all shadow-sm">
              <option>Region: All</option>
              <option>Delhi NCR</option>
              <option>Mumbai</option>
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-slate-300 pointer-events-none transition-colors" />
          </div>
          <div className="relative group">
            <select className="bg-slate-900/50 border border-slate-700 rounded-xl pl-4 pr-10 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 appearance-none min-w-[130px] cursor-pointer hover:bg-slate-800/80 transition-all shadow-sm">
              <option>Niche: All</option>
              <option>Food</option>
              <option>Lifestyle</option>
              <option>Travel</option>
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-slate-300 pointer-events-none transition-colors" />
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="glass-panel rounded-xl overflow-hidden flex-1 flex flex-col min-h-0">
        <div className="overflow-x-auto flex-1">
          {filteredData.length === 0 ? (
            <EmptyState 
              icon={<Users size={32} />}
              title="No influencers found"
              description="Try adjusting your search or filters to find what you're looking for."
              action={
                <button 
                  onClick={() => setSearchQuery('')}
                  className="text-blue-400 hover:text-blue-300 text-sm font-medium"
                >
                  Clear search
                </button>
              }
            />
          ) : (
            <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-700/50 bg-slate-800/50 text-xs uppercase tracking-wider text-slate-400">
                <th className="px-6 py-4 font-medium">Handle</th>
                <th className="px-6 py-4 font-medium">Name</th>
                <th className="px-6 py-4 font-medium">Followers</th>
                <th className="px-6 py-4 font-medium">Eng %</th>
                <th className="px-6 py-4 font-medium">Tier</th>
                <th className="px-6 py-4 font-medium">Pipeline</th>
                <th className="px-6 py-4 font-medium">Points</th>
                <th className="px-6 py-4 font-medium">Region</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {filteredData.map((row) => (
                <tr 
                  key={row.id} 
                  onClick={() => setSelectedId(row.id)}
                  className={clsx(
                    "group cursor-pointer transition-colors duration-200",
                    selectedId === row.id ? "bg-blue-500/10" : "hover:bg-slate-800/50"
                  )}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-md bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-500 p-[1px]">
                        <div className="w-full h-full bg-slate-900 rounded-[5px] flex items-center justify-center">
                          <Instagram size={12} className="text-white" />
                        </div>
                      </div>
                      <span className="font-medium text-slate-200 group-hover:text-white transition-colors">@{row.handle}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-slate-300">{row.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-slate-200">{formatNumber(row.followers)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-emerald-400">{row.engagement}%</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2.5 py-1 rounded-md text-xs font-medium border ${getTierColor(row.tier)} capitalize`}>
                      {row.tier}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2.5 py-1 rounded-md text-xs font-medium border ${getPipelineColor(row.pipeline)} capitalize`}>
                      {row.pipeline.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-amber-400 font-medium">{row.points}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-slate-400 capitalize">{row.region.replace('_', ' ')}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <Dropdown>
                      <DropdownItem onClick={() => setSelectedId(row.id)}>
                        <Instagram size={14} /> View Profile
                      </DropdownItem>
                      <DropdownItem onClick={() => addToast('Status updated', 'success')}>
                        <CheckCircle size={14} /> Change Status
                      </DropdownItem>
                      <DropdownItem onClick={() => {}} className="text-red-400 hover:text-red-300 hover:bg-red-500/10">
                        <Trash2 size={14} /> Remove
                      </DropdownItem>
                    </Dropdown>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          )}
        </div>
        
        {/* Pagination */}
        {filteredData.length > 0 && (
          <div className="p-4 border-t border-slate-700/50 flex items-center justify-between bg-slate-800/30 shrink-0">
            <p className="text-sm text-slate-400">
              Showing <span className="font-medium text-white">1</span> to <span className="font-medium text-white">{filteredData.length}</span> of <span className="font-medium text-white">{filteredData.length}</span> results
            </p>
            <div className="flex items-center gap-2">
              <button 
                disabled={currentPage === 1}
                className="p-1.5 rounded-lg border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft size={18} />
              </button>
              <button className="p-1.5 rounded-lg border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Slide-out Detail Panel */}
      <div 
        className={clsx(
          "absolute top-0 right-0 bottom-0 w-full max-w-md glass-panel border-l border-t-0 border-b-0 border-r-0 border-slate-700 shadow-2xl transform transition-transform duration-300 ease-in-out z-20 flex flex-col",
          selectedId ? "translate-x-0" : "translate-x-full"
        )}
      >
        {selectedInfluencer && (
          <>
            <div className="p-6 border-b border-slate-700 flex items-center justify-between shrink-0">
              <h2 className="text-lg font-semibold text-white">Profile Details</h2>
              <button 
                onClick={() => setSelectedId(null)}
                className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6 overflow-y-auto flex-1">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center text-2xl font-bold text-slate-400">
                  {selectedInfluencer.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{selectedInfluencer.name}</h3>
                  <div className="flex items-center gap-1 text-slate-400 mt-1">
                    <Instagram size={14} />
                    <span>@{selectedInfluencer.handle}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                {/* Stats Row */}
                <div className="grid grid-cols-4 gap-2">
                  <div className="bg-slate-900/50 rounded-xl p-3 border border-slate-700/50 text-center">
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">Eng %</p>
                    <p className="text-lg font-bold text-emerald-400">{selectedInfluencer.engagement}%</p>
                  </div>
                  <div className="bg-slate-900/50 rounded-xl p-3 border border-slate-700/50 text-center">
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">Quality</p>
                    <p className="text-lg font-bold text-blue-400">8.5</p>
                  </div>
                  <div className="bg-slate-900/50 rounded-xl p-3 border border-slate-700/50 text-center">
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">Avg Likes</p>
                    <p className="text-lg font-bold text-white">1.2K</p>
                  </div>
                  <div className="bg-slate-900/50 rounded-xl p-3 border border-slate-700/50 text-center">
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">Avg Cmts</p>
                    <p className="text-lg font-bold text-white">84</p>
                  </div>
                </div>

                {/* Pipeline Visual */}
                <div>
                  <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Pipeline Stage</h4>
                  <div className="glass-panel rounded-xl p-4 border border-slate-700/50">
                    <div className="flex items-center justify-between relative">
                      <div className="absolute left-4 right-4 top-1/2 h-0.5 bg-slate-700 -z-10 -translate-y-1/2" />
                      {['Imported', 'DM Sent', 'Replied', 'Onboarded', 'Available'].map((stage, i) => (
                        <div key={stage} className="flex flex-col items-center gap-2 bg-slate-800 px-1">
                          <div className={clsx("w-3 h-3 rounded-full border-2", i <= 3 ? "bg-emerald-500 border-emerald-500" : i === 4 ? "bg-blue-500 border-blue-500 ring-4 ring-blue-500/20" : "bg-slate-800 border-slate-600")} />
                          <span className={clsx("text-[9px] font-medium whitespace-nowrap", i <= 4 ? "text-slate-300" : "text-slate-500")}>{stage}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Onboarding Data */}
                <div>
                  <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Onboarding Data</h4>
                  <div className="glass-panel rounded-xl p-4 space-y-3 border border-slate-700/50">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Phone</span>
                      <span className="text-white font-medium">+91 98765 43210</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Area</span>
                      <span className="text-white font-medium">{selectedInfluencer.region.replace('_', ' ').toUpperCase()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Deal Pref</span>
                      <span className="text-white font-medium">Barter + Paid</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Rate / Reel</span>
                      <span className="text-white font-medium">₹5,000</span>
                    </div>
                  </div>
                </div>

                {/* Points History */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Points History</h4>
                    <span className="text-sm font-bold text-amber-400">{selectedInfluencer.points} pts total</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-2 rounded-lg bg-slate-900/50 border border-slate-700/50">
                      <span className="text-sm text-slate-300">Standard Collab</span>
                      <span className="text-sm font-bold text-emerald-400">+25</span>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded-lg bg-slate-900/50 border border-slate-700/50">
                      <span className="text-sm text-slate-300">Quick Review</span>
                      <span className="text-sm font-bold text-emerald-400">+10</span>
                    </div>
                  </div>
                </div>

                {/* Tags & Notes */}
                <div>
                  <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 rounded bg-slate-800 text-xs text-slate-300 border border-slate-700">Foodie</span>
                    <span className="px-2 py-1 rounded bg-slate-800 text-xs text-slate-300 border border-slate-700">Aesthetic</span>
                    <button className="px-2 py-1 rounded bg-blue-500/10 text-blue-400 text-xs border border-blue-500/20 hover:bg-blue-500/20">+ Add Tag</button>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Notes</h4>
                  <textarea 
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-xl p-3 text-sm text-slate-300 focus:outline-none focus:border-blue-500 min-h-[80px] resize-none"
                    placeholder="Add notes about this influencer..."
                    defaultValue="Prefers weekend shoots. Very professional."
                  />
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-slate-700 shrink-0 flex gap-3">
              <button 
                onClick={() => setIsEditModalOpen(true)}
                className="flex-1 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2.5 rounded-xl font-medium transition-colors border border-slate-600"
              >
                Edit Profile
              </button>
              <button 
                onClick={() => navigate('/whatsapp')}
                className="flex-1 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2.5 rounded-xl font-medium transition-colors shadow-lg shadow-blue-500/20"
              >
                Message
              </button>
            </div>
          </>
        )}
      </div>

      {/* Add Influencer Modal */}
      <Modal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        title="Add New Influencer"
      >
        <form onSubmit={handleAddSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-300">Instagram Handle</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">@</span>
              <input required type="text" className="w-full bg-slate-900/50 border border-slate-700 rounded-lg pl-8 pr-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500" placeholder="username" />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-300">Full Name</label>
            <input required type="text" className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500" placeholder="John Doe" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-300">Followers</label>
              <input required type="number" className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500" placeholder="10000" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-300">Region</label>
              <select className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500 appearance-none">
                <option value="delhi_ncr">Delhi NCR</option>
                <option value="mumbai">Mumbai</option>
                <option value="bangalore">Bangalore</option>
              </select>
            </div>
          </div>
          <div className="pt-4 flex gap-3">
            <button type="button" onClick={() => setIsAddModalOpen(false)} className="flex-1 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-xl font-medium transition-colors">
              Cancel
            </button>
            <button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl font-medium transition-colors">
              Save Influencer
            </button>
          </div>
        </form>
      </Modal>

      {/* Edit Influencer Modal */}
      <Modal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
        title="Edit Influencer Profile"
      >
        <form onSubmit={(e) => { e.preventDefault(); setIsEditModalOpen(false); addToast('Profile updated', 'success'); }} className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-300">Instagram Handle</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-slate-500">@</span>
              </div>
              <input required type="text" defaultValue={selectedInfluencer?.handle} className="w-full bg-slate-900/50 border border-slate-700 rounded-lg pl-8 pr-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500" />
            </div>
          </div>
          
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-300">Full Name</label>
            <input required type="text" defaultValue={selectedInfluencer?.name} className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-300">Followers</label>
              <input required type="number" defaultValue={selectedInfluencer?.followers} className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-300">Engagement %</label>
              <input required type="number" step="0.1" defaultValue={selectedInfluencer?.engagement} className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-300">Region</label>
              <select required defaultValue={selectedInfluencer?.region} className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500 appearance-none">
                <option value="delhi_ncr">Delhi NCR</option>
                <option value="mumbai">Mumbai</option>
                <option value="bangalore">Bangalore</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-300">Pipeline Stage</label>
              <select required defaultValue={selectedInfluencer?.pipeline} className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500 appearance-none">
                <option value="imported">Imported</option>
                <option value="dm_sent">DM Sent</option>
                <option value="replied">Replied</option>
                <option value="onboarded">Onboarded</option>
                <option value="available">Available</option>
              </select>
            </div>
          </div>

          <div className="pt-4 flex gap-3">
            <button type="button" onClick={() => setIsEditModalOpen(false)} className="flex-1 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-xl font-medium transition-colors">
              Cancel
            </button>
            <button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl font-medium transition-colors">
              Save Changes
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
