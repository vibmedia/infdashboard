import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Building2, Phone, ChevronRight, X, MoreHorizontal, ChevronLeft, Edit2, Trash2, CheckCircle } from 'lucide-react';
import { clsx } from 'clsx';
import { Modal } from '../components/ui/Modal';
import { Dropdown, DropdownItem } from '../components/ui/Dropdown';
import { useToast } from '../components/ui/ToastContext';
import { EmptyState } from '../components/ui/EmptyState';

const mockData = [
  { id: 1, name: 'The Spice Route', contact: 'Amit Malhotra', phone: '+919812345001', area: 'Hauz Khas', pipeline: 'active', budget: 'growth', score: 75 },
  { id: 2, name: 'Brew & Bean', contact: 'Sneha Iyer', phone: '+919812345002', area: 'Cyber Hub', pipeline: 'active', budget: 'premium', score: 82 },
  { id: 3, name: 'Wok This Way', contact: 'Rajesh Nair', phone: '+919812345003', area: 'CP', pipeline: 'onboarded', budget: 'starter', score: 60 },
  { id: 4, name: 'Pizza Paradise', contact: 'Marco D\'Souza', phone: '+919812345004', area: 'GK', pipeline: 'interested', budget: 'growth', score: 70 },
  { id: 5, name: 'Dilli Darbar', contact: 'Farooque Ahmed', phone: '+919812345005', area: 'Rajouri Garden', pipeline: 'raw_lead', budget: 'starter', score: 45 },
];

const getBudgetColor = (budget: string) => {
  switch (budget) {
    case 'starter': return 'bg-slate-500/20 text-slate-300 border-slate-500/30';
    case 'growth': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
    case 'premium': return 'bg-violet-500/20 text-violet-300 border-violet-500/30';
    default: return 'bg-slate-500/20 text-slate-300 border-slate-500/30';
  }
};

const getPipelineColor = (status: string) => {
  switch (status) {
    case 'raw_lead': return 'bg-slate-500/20 text-slate-300 border-slate-500/30';
    case 'interested': return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
    case 'onboarded': return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
    case 'active': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
    default: return 'bg-slate-500/20 text-slate-300 border-slate-500/30';
  }
};

const getScoreColor = (score: number) => {
  if (score >= 80) return 'bg-emerald-500';
  if (score >= 60) return 'bg-blue-500';
  if (score >= 40) return 'bg-amber-500';
  return 'bg-slate-500';
};

export function Brands() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const { addToast } = useToast();
  const navigate = useNavigate();

  const selectedBrand = mockData.find(b => b.id === selectedId);

  const filteredData = mockData.filter(b => 
    b.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    b.contact.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAddModalOpen(false);
    addToast('Brand added successfully', 'success');
  };

  return (
    <div className="h-[calc(100vh-2rem)] flex flex-col space-y-6 relative">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Brands</h1>
          <p className="text-slate-400 mt-1">Manage brand partners and leads.</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl font-medium transition-colors shadow-lg shadow-blue-500/20 self-start sm:self-auto"
        >
          + Add Brand
        </button>
      </div>

      {/* Filters Bar */}
      <div className="glass-panel rounded-xl p-4 flex flex-col lg:flex-row gap-4 items-center justify-between shrink-0">
        <div className="relative w-full lg:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search brand name..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900/50 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
          />
        </div>
        
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          <div className="flex items-center gap-2 text-sm text-slate-400 mr-2">
            <Filter size={16} /> Filters:
          </div>
          <select className="bg-slate-900/50 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 appearance-none min-w-[120px]">
            <option>Pipeline: All</option>
            <option>Raw Lead</option>
            <option>Interested</option>
            <option>Active</option>
          </select>
          <select className="bg-slate-900/50 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 appearance-none min-w-[120px]">
            <option>Budget: All</option>
            <option>Starter</option>
            <option>Growth</option>
            <option>Premium</option>
          </select>
        </div>
      </div>

      {/* Data Table */}
      <div className="glass-panel rounded-xl overflow-hidden flex-1 flex flex-col min-h-0">
        <div className="overflow-x-auto flex-1">
          {filteredData.length === 0 ? (
            <EmptyState 
              icon={<Building2 size={32} />}
              title="No brands found"
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
                <th className="px-6 py-4 font-medium">Business Name</th>
                <th className="px-6 py-4 font-medium">Contact</th>
                <th className="px-6 py-4 font-medium">Phone</th>
                <th className="px-6 py-4 font-medium">Area</th>
                <th className="px-6 py-4 font-medium">Pipeline</th>
                <th className="px-6 py-4 font-medium">Budget</th>
                <th className="px-6 py-4 font-medium">Lead Score</th>
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
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 group-hover:text-blue-400 group-hover:border-blue-500/50 transition-colors">
                        <Building2 size={16} />
                      </div>
                      <span className="font-medium text-slate-200 group-hover:text-white transition-colors">{row.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-slate-300">{row.contact}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-slate-400 font-mono text-sm">{row.phone}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-slate-300">{row.area}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2.5 py-1 rounded-md text-xs font-medium border ${getPipelineColor(row.pipeline)} capitalize`}>
                      {row.pipeline.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2.5 py-1 rounded-md text-xs font-medium border ${getBudgetColor(row.budget)} capitalize`}>
                      {row.budget}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${getScoreColor(row.score)}`} 
                          style={{ width: `${row.score}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium text-slate-300 w-6">{row.score}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <Dropdown>
                      <DropdownItem onClick={() => setSelectedId(row.id)}>
                        <Building2 size={14} /> View Details
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
        {selectedBrand && (
          <>
            <div className="p-6 border-b border-slate-700 flex items-center justify-between shrink-0">
              <h2 className="text-lg font-semibold text-white">Brand Details</h2>
              <button 
                onClick={() => setSelectedId(null)}
                className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6 overflow-y-auto flex-1">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-2xl bg-slate-800 border-2 border-slate-700 flex items-center justify-center text-2xl font-bold text-slate-400">
                  <Building2 size={32} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{selectedBrand.name}</h3>
                  <div className="flex items-center gap-1 text-slate-400 mt-1">
                    <span>{selectedBrand.area}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                {/* Pipeline Visual */}
                <div>
                  <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Pipeline Stage</h4>
                  <div className="glass-panel rounded-xl p-4 border border-slate-700/50">
                    <div className="flex items-center justify-between relative">
                      <div className="absolute left-4 right-4 top-1/2 h-0.5 bg-slate-700 -z-10 -translate-y-1/2" />
                      {['Lead', 'Contacted', 'Interested', 'Trial', 'Active'].map((stage, i) => (
                        <div key={stage} className="flex flex-col items-center gap-2 bg-slate-800 px-1">
                          <div className={clsx("w-3 h-3 rounded-full border-2", i <= 3 ? "bg-emerald-500 border-emerald-500" : i === 4 ? "bg-blue-500 border-blue-500 ring-4 ring-blue-500/20" : "bg-slate-800 border-slate-600")} />
                          <span className={clsx("text-[9px] font-medium whitespace-nowrap", i <= 4 ? "text-slate-300" : "text-slate-500")}>{stage}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Status</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className={`px-3 py-1.5 rounded-lg text-sm font-medium border ${getBudgetColor(selectedBrand.budget)} capitalize`}>
                      Budget: {selectedBrand.budget}
                    </span>
                    <span className={`px-3 py-1.5 rounded-lg text-sm font-medium border ${getPipelineColor(selectedBrand.pipeline)} capitalize`}>
                      Pipeline: {selectedBrand.pipeline.replace('_', ' ')}
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Contact Info</h4>
                  <div className="space-y-3 bg-slate-900/50 rounded-xl p-4 border border-slate-800">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 text-sm">Name</span>
                      <span className="text-slate-200 text-sm font-medium">{selectedBrand.contact}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 text-sm">Phone</span>
                      <a href={`tel:${selectedBrand.phone}`} className="text-blue-400 hover:text-blue-300 text-sm font-medium flex items-center gap-1">
                        <Phone size={14} /> {selectedBrand.phone}
                      </a>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Lead Score</h4>
                  <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-800">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-slate-400 text-sm">Current Score</span>
                      <span className="text-white font-bold">{selectedBrand.score}/100</span>
                    </div>
                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${getScoreColor(selectedBrand.score)}`} 
                        style={{ width: `${selectedBrand.score}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* WhatsApp History */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">WhatsApp Outreach</h4>
                    <button className="text-xs text-blue-400 hover:text-blue-300 font-medium">Open Chat ↗</button>
                  </div>
                  <div className="glass-panel rounded-xl p-4 space-y-4 border border-slate-700/50 bg-slate-900/30">
                    <div className="flex flex-col items-end">
                      <div className="bg-blue-600 text-white p-3 rounded-2xl rounded-tr-sm text-sm max-w-[90%]">
                        Hi {selectedBrand.name}! 👋 We noticed your food looks amazing 🔥 Interested in getting featured by creators?
                      </div>
                      <span className="text-[10px] text-slate-500 mt-1">Yesterday 10:30 AM</span>
                    </div>
                    <div className="flex flex-col items-start">
                      <div className="bg-slate-800 text-slate-200 border border-slate-700 p-3 rounded-2xl rounded-tl-sm text-sm max-w-[90%]">
                        Interested! What are the costs?
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] text-slate-500">Today 10:20 AM</span>
                        <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-emerald-400">positive 🟢</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Notes</h4>
                  <textarea 
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-xl p-3 text-sm text-slate-300 focus:outline-none focus:border-blue-500 min-h-[80px] resize-none"
                    placeholder="Add notes about this brand..."
                    defaultValue="Looking for 3 reels per month. Budget is flexible."
                  />
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-slate-700 shrink-0 flex gap-3">
              <button 
                onClick={() => setIsEditModalOpen(true)}
                className="flex-1 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2.5 rounded-xl font-medium transition-colors border border-slate-600"
              >
                Edit Brand
              </button>
              <button 
                onClick={() => navigate('/jobs')}
                className="flex-1 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2.5 rounded-xl font-medium transition-colors shadow-lg shadow-blue-500/20"
              >
                Create Job
              </button>
            </div>
          </>
        )}
      </div>

      {/* Add Brand Modal */}
      <Modal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        title="Add New Brand"
      >
        <form onSubmit={handleAddSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-300">Business Name</label>
            <input required type="text" className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500" placeholder="Acme Corp" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-300">Contact Person</label>
              <input required type="text" className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500" placeholder="Jane Doe" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-300">Phone</label>
              <input required type="tel" className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500" placeholder="+91..." />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-300">Area/Location</label>
              <input required type="text" className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500" placeholder="e.g. Cyber Hub" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-300">Budget Tier</label>
              <select className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500 appearance-none">
                <option value="starter">Starter</option>
                <option value="growth">Growth</option>
                <option value="premium">Premium</option>
              </select>
            </div>
          </div>
          <div className="pt-4 flex gap-3">
            <button type="button" onClick={() => setIsAddModalOpen(false)} className="flex-1 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-xl font-medium transition-colors">
              Cancel
            </button>
            <button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl font-medium transition-colors">
              Save Brand
            </button>
          </div>
        </form>
      </Modal>

      {/* Edit Brand Modal */}
      <Modal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
        title="Edit Brand Profile"
      >
        <form onSubmit={(e) => { e.preventDefault(); setIsEditModalOpen(false); addToast('Brand updated', 'success'); }} className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-300">Brand Name</label>
            <input required type="text" defaultValue={selectedBrand?.name} className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500" />
          </div>
          
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-300">Contact Person</label>
            <input required type="text" defaultValue={selectedBrand?.contact} className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500" />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-300">Phone Number</label>
            <input required type="tel" defaultValue={selectedBrand?.phone} className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-300">Area / Location</label>
              <input required type="text" defaultValue={selectedBrand?.area} className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-300">Budget Tier</label>
              <select required defaultValue={selectedBrand?.budget} className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500 appearance-none">
                <option value="starter">Starter</option>
                <option value="growth">Growth</option>
                <option value="premium">Premium</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-300">Pipeline Stage</label>
            <select required defaultValue={selectedBrand?.pipeline} className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500 appearance-none">
              <option value="raw_lead">Raw Lead</option>
              <option value="interested">Interested</option>
              <option value="onboarded">Onboarded</option>
              <option value="active">Active</option>
            </select>
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
