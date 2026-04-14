import React, { useState } from 'react';
import { Search, Filter, Briefcase, MapPin, Star, Users, CheckCircle2, XCircle, X } from 'lucide-react';
import { clsx } from 'clsx';
import { Modal } from '../components/ui/Modal';
import { useToast } from '../components/ui/ToastContext';

const mockData = [
  { 
    id: 1, 
    title: 'Weekend Cafe Reel Campaign', 
    brand: 'Brew & Bean', 
    area: 'Cyber Hub', 
    dealType: 'paid', 
    budget: '₹8,000', 
    points: 25, 
    deliverables: ['1 Reel', '3 Stories'], 
    applications: 3, 
    status: 'open' 
  },
  { 
    id: 2, 
    title: 'Barter Dinner Review', 
    brand: 'The Spice Route', 
    area: 'Hauz Khas', 
    dealType: 'barter', 
    budget: '₹0', 
    points: 10, 
    deliverables: ['1 Reel'], 
    applications: 1, 
    status: 'open' 
  },
];

const getDealTypeColor = (type: string) => {
  switch (type) {
    case 'barter': return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
    case 'paid': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
    case 'both': return 'bg-violet-500/20 text-violet-300 border-violet-500/30';
    default: return 'bg-slate-500/20 text-slate-300 border-slate-500/30';
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'open': return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
    case 'closed': return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    default: return 'bg-slate-500/20 text-slate-300 border-slate-500/30';
  }
};

export function Jobs() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState<number | null>(null);
  const { addToast } = useToast();

  const selectedJob = mockData.find(j => j.id === selectedJobId);

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAddModalOpen(false);
    addToast('Job posted successfully', 'success');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Job Board</h1>
          <p className="text-slate-400 mt-1">Manage active campaigns and applications.</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl font-medium transition-colors shadow-lg shadow-blue-500/20 self-start sm:self-auto flex items-center gap-2"
        >
          <Briefcase size={18} />
          <span>Create Job</span>
        </button>
      </div>

      {/* Filters Bar */}
      <div className="glass-panel rounded-xl p-4 flex flex-col lg:flex-row gap-4 items-center justify-between">
        <div className="relative w-full lg:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search jobs..." 
            className="w-full bg-slate-900/50 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
          />
        </div>
        
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          <div className="flex items-center gap-2 text-sm text-slate-400 mr-2">
            <Filter size={16} /> Filters:
          </div>
          <select className="bg-slate-900/50 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 appearance-none min-w-[120px]">
            <option>Status: All</option>
            <option>Open</option>
            <option>Closed</option>
          </select>
          <select className="bg-slate-900/50 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 appearance-none min-w-[120px]">
            <option>Deal Type: All</option>
            <option>Paid</option>
            <option>Barter</option>
            <option>Both</option>
          </select>
        </div>
      </div>

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {mockData.map((job) => (
          <div key={job.id} className="glass-panel rounded-2xl p-6 flex flex-col glass-panel-hover group cursor-pointer relative overflow-hidden">
            {/* Glow effect */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl -mr-10 -mt-10 transition-transform group-hover:scale-150 duration-500" />
            
            <div className="flex justify-between items-start mb-4 relative z-10">
              <span className={`px-2.5 py-1 rounded-md text-xs font-medium border ${getStatusColor(job.status)} capitalize flex items-center gap-1`}>
                {job.status === 'open' ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                {job.status}
              </span>
              <span className={`px-2.5 py-1 rounded-md text-xs font-medium border ${getDealTypeColor(job.dealType)} capitalize`}>
                {job.dealType}
              </span>
            </div>

            <h3 className="text-xl font-bold text-white mb-2 leading-tight group-hover:text-blue-400 transition-colors relative z-10">{job.title}</h3>
            
            <div className="flex items-center gap-2 text-sm text-slate-400 mb-6 relative z-10">
              <span className="font-medium text-slate-300">{job.brand}</span>
              <span>•</span>
              <span className="flex items-center gap-1"><MapPin size={14} /> {job.area}</span>
            </div>

            <div className="space-y-3 mb-6 flex-1 relative z-10">
              <div className="flex justify-between items-center bg-slate-900/50 rounded-lg p-3 border border-slate-800">
                <span className="text-slate-400 text-sm">Budget</span>
                <span className="text-white font-medium">{job.budget}</span>
              </div>
              <div className="flex justify-between items-center bg-slate-900/50 rounded-lg p-3 border border-slate-800">
                <span className="text-slate-400 text-sm">Reward</span>
                <span className="text-amber-400 font-medium flex items-center gap-1">
                  <Star size={14} className="fill-amber-400" /> {job.points} pts
                </span>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-800">
                <span className="text-slate-400 text-sm block mb-2">Deliverables</span>
                <div className="flex flex-wrap gap-2">
                  {job.deliverables.map((item, idx) => (
                    <span key={idx} className="bg-slate-800 text-slate-300 text-xs px-2 py-1 rounded border border-slate-700">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-700/50 flex items-center justify-between relative z-10">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center">
                  <Users size={16} />
                </div>
                <span className="text-slate-300 font-medium">{job.applications} Applications</span>
              </div>
              <button 
                onClick={() => setSelectedJobId(job.id)}
                className="text-blue-400 hover:text-blue-300 text-sm font-medium"
              >
                View Details →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create Job Modal */}
      <Modal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        title="Create New Job"
        maxWidth="max-w-2xl"
      >
        <form onSubmit={handleAddSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-300">Job Title</label>
            <input required type="text" className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500" placeholder="e.g. Weekend Cafe Reel Campaign" />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-300">Brand</label>
              <select required className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500 appearance-none">
                <option value="">Select a brand...</option>
                <option value="1">Brew & Bean</option>
                <option value="2">The Spice Route</option>
                <option value="3">Wok This Way</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-300">Deal Type</label>
              <select required className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500 appearance-none">
                <option value="barter">Barter</option>
                <option value="paid">Paid</option>
                <option value="both">Both</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-300">Budget (if paid)</label>
              <input type="text" className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500" placeholder="₹8,000" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-300">Points Reward</label>
              <input required type="number" className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500" placeholder="25" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-300">Required Tier</label>
              <select required className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500 appearance-none">
                <option value="any">Any Tier</option>
                <option value="nano">Nano (1k-10k)</option>
                <option value="micro">Micro (10k-50k)</option>
                <option value="mid">Mid (50k-200k)</option>
                <option value="macro">Macro (200k+)</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-300">Required Niche</label>
              <select required className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500 appearance-none">
                <option value="any">Any Niche</option>
                <option value="food">Food & Beverage</option>
                <option value="lifestyle">Lifestyle</option>
                <option value="fashion">Fashion</option>
                <option value="tech">Tech</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-300">Required Region</label>
              <select required className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500 appearance-none">
                <option value="any">Any Region</option>
                <option value="delhi_ncr">Delhi NCR</option>
                <option value="mumbai">Mumbai</option>
                <option value="bangalore">Bangalore</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-300">Expires On</label>
              <input required type="date" className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-300">Deliverables (comma separated)</label>
            <input required type="text" className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500" placeholder="1 Reel, 3 Stories" />
          </div>

          <div className="pt-4 flex gap-3">
            <button type="button" onClick={() => setIsAddModalOpen(false)} className="flex-1 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-xl font-medium transition-colors">
              Cancel
            </button>
            <button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl font-medium transition-colors">
              Post Job
            </button>
          </div>
        </form>
      </Modal>

      {/* Job Details Slide-out */}
      <div 
        className={clsx(
          "absolute top-0 right-0 bottom-0 w-full max-w-md glass-panel border-l border-t-0 border-b-0 border-r-0 border-slate-700 shadow-2xl transform transition-transform duration-300 ease-in-out z-20 flex flex-col",
          selectedJobId ? "translate-x-0" : "translate-x-full"
        )}
      >
        {selectedJob && (
          <>
            <div className="p-6 border-b border-slate-700 flex items-center justify-between shrink-0">
              <h2 className="text-lg font-semibold text-white">Job Details</h2>
              <button 
                onClick={() => setSelectedJobId(null)}
                className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6 overflow-y-auto flex-1">
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-3">
                  <span className={clsx("px-2.5 py-1 rounded-md text-xs font-medium border uppercase tracking-wider", getStatusColor(selectedJob.status))}>
                    {selectedJob.status}
                  </span>
                  <span className={clsx("px-2.5 py-1 rounded-md text-xs font-medium border uppercase tracking-wider", getDealTypeColor(selectedJob.dealType))}>
                    {selectedJob.dealType}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{selectedJob.title}</h3>
                <div className="flex items-center gap-2 text-slate-400 text-sm">
                  <span className="font-medium text-slate-300">{selectedJob.brand}</span>
                  <span>•</span>
                  <MapPin size={14} />
                  <span>{selectedJob.area}</span>
                </div>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-800">
                    <p className="text-xs text-slate-500 uppercase tracking-wider font-medium mb-1">Budget</p>
                    <p className="text-lg font-bold text-white">{selectedJob.budget}</p>
                  </div>
                  <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-800">
                    <p className="text-xs text-slate-500 uppercase tracking-wider font-medium mb-1">Reward</p>
                    <p className="text-lg font-bold text-amber-400">⭐ {selectedJob.points}</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-slate-300 mb-3 uppercase tracking-wider">Deliverables</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedJob.deliverables.map((item, idx) => (
                      <span key={idx} className="bg-slate-800 text-slate-300 text-sm px-3 py-1.5 rounded-lg border border-slate-700">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-slate-300 mb-3 uppercase tracking-wider">Requirements</h4>
                  <div className="space-y-3 bg-slate-900/50 rounded-xl p-4 border border-slate-800">
                    <div className="flex justify-between">
                      <span className="text-slate-400 text-sm">Min. Tier</span>
                      <span className="text-slate-200 text-sm font-medium">Micro (10k+)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400 text-sm">Niche</span>
                      <span className="text-slate-200 text-sm font-medium">Food & Lifestyle</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400 text-sm">Region</span>
                      <span className="text-slate-200 text-sm font-medium">{selectedJob.area}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-sm font-medium text-slate-300 uppercase tracking-wider">Applications</h4>
                    <span className="text-xs font-bold text-blue-400 bg-blue-400/10 px-2 py-1 rounded">{selectedJob.applications} Total</span>
                  </div>
                  <div className="space-y-2">
                    {[1, 2, 3].map((app) => (
                      <div key={app} className="flex items-center justify-between p-3 rounded-xl bg-slate-900/50 border border-slate-700/50">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-400">
                            U{app}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-white">User {app}</p>
                            <p className="text-xs text-slate-400">Applied 2h ago</p>
                          </div>
                        </div>
                        <button className="text-xs bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded-lg transition-colors">
                          Review
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-slate-700 shrink-0 flex gap-3">
              <button 
                onClick={() => addToast('Job edit mode opened', 'info')}
                className="flex-1 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2.5 rounded-xl font-medium transition-colors border border-slate-600"
              >
                Edit Job
              </button>
              <button 
                onClick={() => addToast('Job closed successfully', 'success')}
                className="flex-1 bg-red-500/20 hover:bg-red-500/30 text-red-400 px-4 py-2.5 rounded-xl font-medium transition-colors border border-red-500/30"
              >
                Close Job
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
