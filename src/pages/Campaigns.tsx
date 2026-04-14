import React, { useState } from 'react';
import { MoreHorizontal, Calendar, MessageSquare, CheckCircle2, Edit2, Trash2, ExternalLink, X, Link, Image as ImageIcon } from 'lucide-react';
import { clsx } from 'clsx';
import { Dropdown, DropdownItem } from '../components/ui/Dropdown';
import { Modal } from '../components/ui/Modal';
import { useToast } from '../components/ui/ToastContext';

const columns = [
  { id: 'job_posted', title: 'Job Posted', count: 1 },
  { id: 'visit_scheduled', title: 'Visit Scheduled', count: 1 },
  { id: 'content_draft', title: 'Content Draft', count: 1 },
  { id: 'content_qc', title: 'Content QC', count: 0 },
  { id: 'posted', title: 'Posted', count: 1 },
  { id: 'complete', title: 'Complete', count: 2 },
];

const mockCards = [
  { id: 1, columnId: 'job_posted', title: 'Weekend Cafe Reel', brand: 'Brew & Bean', influencer: 'Pending', dealType: 'paid', status: 'active' },
  { id: 2, columnId: 'visit_scheduled', title: 'Dinner Review', brand: 'The Spice Route', influencer: 'Priya Sharma', dealType: 'barter', status: 'active' },
  { id: 3, columnId: 'content_draft', title: 'New Menu Launch', brand: 'Wok This Way', influencer: 'Rahul Verma', dealType: 'paid', status: 'review' },
  { id: 4, columnId: 'posted', title: 'Pizza Tasting', brand: 'Pizza Paradise', influencer: 'Ananya Gupta', dealType: 'barter', status: 'active' },
  { id: 5, columnId: 'complete', title: 'Cafe Vibes', brand: 'Brew & Bean', influencer: 'Vikram Singh', dealType: 'paid', status: 'completed' },
  { id: 6, columnId: 'complete', title: 'Street Food Tour', brand: 'Dilli Darbar', influencer: 'Deepak Kumar', dealType: 'both', status: 'completed' },
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
    case 'active': return 'bg-blue-500';
    case 'review': return 'bg-amber-500';
    case 'completed': return 'bg-emerald-500';
    default: return 'bg-slate-500';
  }
};

export function Campaigns() {
  const [cards, setCards] = useState(mockCards);
  const [draggedCard, setDraggedCard] = useState<number | null>(null);
  const [selectedCampaignId, setSelectedCampaignId] = useState<number | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { addToast } = useToast();

  const selectedCampaign = cards.find(c => c.id === selectedCampaignId);

  const handleDragStart = (e: React.DragEvent, id: number) => {
    setDraggedCard(id);
    e.dataTransfer.effectAllowed = 'move';
    // Make it slightly transparent while dragging
    setTimeout(() => {
      const el = document.getElementById(`card-${id}`);
      if (el) el.style.opacity = '0.5';
    }, 0);
  };

  const handleDragEnd = (e: React.DragEvent, id: number) => {
    setDraggedCard(null);
    const el = document.getElementById(`card-${id}`);
    if (el) el.style.opacity = '1';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, columnId: string) => {
    e.preventDefault();
    if (draggedCard === null) return;

    setCards(cards.map(card => 
      card.id === draggedCard ? { ...card, columnId } : card
    ));
  };

  return (
    <div className="h-[calc(100vh-2rem)] flex flex-col space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Campaigns</h1>
          <p className="text-slate-400 mt-1">Track campaign progress across the pipeline.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-sm text-slate-400 bg-slate-800/50 px-3 py-1.5 rounded-lg border border-slate-700">
            <div className="w-2 h-2 rounded-full bg-blue-500" /> Active
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-400 bg-slate-800/50 px-3 py-1.5 rounded-lg border border-slate-700">
            <div className="w-2 h-2 rounded-full bg-amber-500" /> Review
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-400 bg-slate-800/50 px-3 py-1.5 rounded-lg border border-slate-700">
            <div className="w-2 h-2 rounded-full bg-emerald-500" /> Completed
          </div>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="flex-1 overflow-x-auto pb-4">
        <div className="flex gap-6 h-full min-w-max">
          {columns.map(column => {
            const columnCards = cards.filter(c => c.columnId === column.id);
            
            return (
              <div 
                key={column.id} 
                className="w-80 flex flex-col bg-slate-900/50 rounded-2xl border border-slate-800 overflow-hidden"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, column.id)}
              >
                <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-800/20 shrink-0">
                  <h3 className="font-semibold text-slate-200">{column.title}</h3>
                  <span className="bg-slate-800 text-slate-400 text-xs font-medium px-2 py-1 rounded-md border border-slate-700">
                    {columnCards.length}
                  </span>
                </div>
                
                <div className="p-3 flex-1 overflow-y-auto space-y-3">
                  {columnCards.map(card => (
                    <div 
                      key={card.id}
                      id={`card-${card.id}`}
                      draggable
                      onDragStart={(e) => handleDragStart(e, card.id)}
                      onDragEnd={(e) => handleDragEnd(e, card.id)}
                      className="glass-panel rounded-xl p-4 cursor-grab active:cursor-grabbing hover:border-slate-500 transition-colors relative overflow-hidden group"
                    >
                      {/* Status indicator line */}
                      <div className={`absolute left-0 top-0 bottom-0 w-1 ${getStatusColor(card.status)}`} />
                      
                      <div className="flex justify-between items-start mb-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-medium border uppercase tracking-wider ${getDealTypeColor(card.dealType)}`}>
                          {card.dealType}
                        </span>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <Dropdown>
                            <DropdownItem onClick={() => setSelectedCampaignId(card.id)}>
                              <ExternalLink size={14} /> View Details
                            </DropdownItem>
                            <DropdownItem onClick={() => { setSelectedCampaignId(card.id); setIsEditModalOpen(true); }}>
                              <Edit2 size={14} /> Edit Campaign
                            </DropdownItem>
                            <DropdownItem onClick={() => {}} className="text-red-400 hover:text-red-300 hover:bg-red-500/10">
                              <Trash2 size={14} /> Delete
                            </DropdownItem>
                          </Dropdown>
                        </div>
                      </div>
                      
                      <h4 className="font-medium text-white mb-1 leading-tight">{card.title}</h4>
                      <p className="text-sm text-slate-400 mb-4">{card.brand}</p>
                      
                      <div className="flex items-center justify-between pt-3 border-t border-slate-700/50">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-[10px] font-bold text-slate-300">
                            {card.influencer.charAt(0)}
                          </div>
                          <span className="text-xs text-slate-300 truncate max-w-[100px]">{card.influencer}</span>
                        </div>
                        <div className="flex gap-2 text-slate-500">
                          <MessageSquare size={14} className="hover:text-blue-400 transition-colors" />
                          <Calendar size={14} className="hover:text-blue-400 transition-colors" />
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {columnCards.length === 0 && (
                    <div className="h-24 border-2 border-dashed border-slate-800 rounded-xl flex items-center justify-center text-sm text-slate-500">
                      Drop cards here
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Campaign Details Slide-out */}
      <div 
        className={clsx(
          "absolute top-0 right-0 bottom-0 w-full max-w-md glass-panel border-l border-t-0 border-b-0 border-r-0 border-slate-700 shadow-2xl transform transition-transform duration-300 ease-in-out z-20 flex flex-col",
          selectedCampaignId && !isEditModalOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {selectedCampaign && (
          <>
            <div className="p-6 border-b border-slate-700 flex items-center justify-between shrink-0">
              <h2 className="text-lg font-semibold text-white">Campaign Details</h2>
              <button 
                onClick={() => setSelectedCampaignId(null)}
                className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6 overflow-y-auto flex-1 space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className={clsx("px-2.5 py-1 rounded-md text-xs font-medium border uppercase tracking-wider", getStatusColor(selectedCampaign.status))}>
                    {selectedCampaign.status}
                  </span>
                  <span className={clsx("px-2.5 py-1 rounded-md text-xs font-medium border uppercase tracking-wider", getDealTypeColor(selectedCampaign.dealType))}>
                    {selectedCampaign.dealType}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">{selectedCampaign.title}</h3>
                <p className="text-slate-400 font-medium">{selectedCampaign.brand}</p>
              </div>

              <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-800 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-lg font-bold text-slate-300">
                  {selectedCampaign.influencer.charAt(0)}
                </div>
                <div>
                  <p className="text-sm text-slate-400">Assigned Influencer</p>
                  <p className="text-white font-medium">{selectedCampaign.influencer}</p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-slate-300 mb-3 uppercase tracking-wider">Deliverables Tracking</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/50 border border-slate-700/50">
                    <div className="flex items-center gap-3">
                      <ImageIcon size={16} className="text-slate-400" />
                      <span className="text-sm text-slate-200">1x Instagram Reel</span>
                    </div>
                    <CheckCircle2 size={16} className="text-emerald-500" />
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/50 border border-slate-700/50">
                    <div className="flex items-center gap-3">
                      <ImageIcon size={16} className="text-slate-400" />
                      <span className="text-sm text-slate-200">2x Story with Link</span>
                    </div>
                    <div className="w-4 h-4 rounded-full border-2 border-slate-600" />
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-slate-300 mb-3 uppercase tracking-wider">Content Links</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Link size={14} className="text-blue-400" />
                    <a href="#" className="text-blue-400 hover:underline">Draft Video (Google Drive)</a>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Link size={14} className="text-blue-400" />
                    <a href="#" className="text-blue-400 hover:underline">Live Post (Instagram)</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-slate-700 shrink-0 flex gap-3">
              <button 
                onClick={() => setIsEditModalOpen(true)}
                className="flex-1 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2.5 rounded-xl font-medium transition-colors border border-slate-600"
              >
                Edit Campaign
              </button>
              <button 
                onClick={() => addToast('Campaign marked as completed', 'success')}
                className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2.5 rounded-xl font-medium transition-colors shadow-lg shadow-emerald-500/20"
              >
                Mark Complete
              </button>
            </div>
          </>
        )}
      </div>

      {/* Edit Campaign Modal */}
      <Modal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
        title="Edit Campaign"
      >
        <form onSubmit={(e) => { e.preventDefault(); setIsEditModalOpen(false); addToast('Campaign updated', 'success'); }} className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-300">Campaign Title</label>
            <input required type="text" defaultValue={selectedCampaign?.title} className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500" />
          </div>
          
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-300">Assigned Influencer</label>
            <input required type="text" defaultValue={selectedCampaign?.influencer} className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-300">Deal Type</label>
              <select required defaultValue={selectedCampaign?.dealType} className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500 appearance-none">
                <option value="barter">Barter</option>
                <option value="paid">Paid</option>
                <option value="both">Both</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-300">Status</label>
              <select required defaultValue={selectedCampaign?.status} className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500 appearance-none">
                <option value="active">Active</option>
                <option value="review">Review</option>
                <option value="completed">Completed</option>
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
