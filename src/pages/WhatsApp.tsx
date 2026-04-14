import { useState } from 'react';
import { MessageCircle, Send, Copy, Search, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { clsx } from 'clsx';
import { useToast } from '../components/ui/ToastContext';

const mockConversations = [
  { id: 1, brand: 'The Spice Route', area: 'Hauz Khas', lastMessage: 'Interested! What are the costs?', time: '10 min ago', status: 'active', replyStatus: 'Replied ✅', unread: true },
  { id: 2, brand: 'Brew & Bean', area: 'Cyber Hub', lastMessage: 'How does the creator visit work?', time: '1 hour ago', status: 'active', replyStatus: 'Replied ✅', unread: false },
  { id: 3, brand: 'Pizza Paradise', area: 'GK', lastMessage: 'Hey Marco, just circling back...', time: '1 day ago', status: 'interested', replyStatus: 'Awaiting reply', unread: false },
];

const mockMessages = [
  { id: 1, text: 'Hi The Spice Route! 👋 We noticed your Butter Chicken looks amazing 🔥 We connect food businesses like yours with creators who make viral content. Interested in getting featured? Takes 2 minutes to discuss.', sender: 'outbound', time: 'Yesterday 10:30 AM' },
  { id: 2, text: 'Interested! What are the costs?', sender: 'inbound', time: 'Today 10:20 AM', classification: 'positive 🟢' },
];

const templates = [
  {
    id: 'day1',
    name: 'Day 1: Hook Message',
    content: 'Hi {business_name}! 👋\nWe noticed your {popular_item} looks amazing 🔥\nWe connect {industry_label} businesses like yours with creators who make viral content.\nInterested in getting featured? Takes 2 minutes to discuss.'
  },
  {
    id: 'day2',
    name: 'Day 2: Social Proof',
    content: 'Hey {contact_name}, just circling back!\n{nearby_brand} in {area} just got 45K views from a creator campaign with us.\nWould love to help {business_name} get similar results 📊'
  },
  {
    id: 'day3',
    name: 'Day 3: Free Offer',
    content: 'Last message from us! 🙏\nWe\'d love to offer {business_name} a FREE creator visit —\na creator comes, experiences your food, creates a reel. No cost to you.\nJust want to show you how it works. Deal?'
  }
];

export function WhatsApp() {
  const [activeChat, setActiveChat] = useState(mockConversations[0].id);
  const [selectedTemplate, setSelectedTemplate] = useState('day1');
  const [selectedBrand, setSelectedBrand] = useState('1');
  const [generatedMessage, setGeneratedMessage] = useState('');
  const { addToast } = useToast();

  const handleGenerate = () => {
    const template = templates.find(t => t.id === selectedTemplate);
    if (!template) return;
    
    // Mock generation replacing variables
    let msg = template.content
      .replace('{business_name}', 'The Spice Route')
      .replace('{popular_item}', 'Butter Chicken')
      .replace('{industry_label}', 'food')
      .replace('{contact_name}', 'Amit')
      .replace('{nearby_brand}', 'Dilli Darbar')
      .replace('{area}', 'Hauz Khas');
      
    setGeneratedMessage(msg);
    addToast('Message generated', 'success');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedMessage);
    addToast('Copied to clipboard', 'success');
  };

  // Helper to render template with highlighted variables
  const renderTemplateText = (text: string) => {
    const parts = text.split(/({[^}]+})/g);
    return parts.map((part, i) => {
      if (part.startsWith('{') && part.endsWith('}')) {
        return <span key={i} className="text-blue-400 font-medium bg-blue-500/10 px-1 rounded">{part}</span>;
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <div className="h-[calc(100vh-2rem)] flex flex-col space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">WhatsApp Outreach</h1>
        <p className="text-slate-400 mt-1">Manage brand conversations and generate template messages.</p>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-6 min-h-0">
        {/* Left Panel: Chat Interface */}
        <div className="w-full lg:w-[60%] glass-panel rounded-xl flex flex-col min-h-0 border border-slate-700 overflow-hidden">
          <div className="flex h-full">
            {/* Chat List */}
            <div className="w-1/3 border-r border-slate-700/50 flex flex-col bg-slate-900/50">
              <div className="p-4 border-b border-slate-700/50">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                  <input 
                    type="text" 
                    placeholder="Search brands..." 
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="flex-1 overflow-y-auto custom-scrollbar">
                {mockConversations.map(conv => (
                  <div 
                    key={conv.id}
                    onClick={() => setActiveChat(conv.id)}
                    className={clsx(
                      "p-4 border-b border-slate-700/50 cursor-pointer transition-colors",
                      activeChat === conv.id ? "bg-blue-500/10 border-l-2 border-l-blue-500" : "hover:bg-slate-800/50 border-l-2 border-l-transparent"
                    )}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-medium text-white text-sm truncate pr-2">{conv.brand}</h4>
                      <span className="text-[10px] text-slate-500 whitespace-nowrap">{conv.time}</span>
                    </div>
                    <p className="text-xs text-slate-400 truncate mb-2">{conv.lastMessage}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-medium text-slate-500">{conv.replyStatus}</span>
                      {conv.unread && <div className="w-2 h-2 rounded-full bg-blue-500" />}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat View */}
            <div className="flex-1 flex flex-col bg-slate-950/50">
              <div className="p-4 border-b border-slate-700/50 bg-slate-900/80 flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-white">The Spice Route</h3>
                  <p className="text-xs text-slate-400">Hauz Khas • Pipeline: Active</p>
                </div>
                <button className="text-sm text-blue-400 hover:text-blue-300 font-medium">View Brand</button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                {mockMessages.map(msg => (
                  <div key={msg.id} className={clsx("flex flex-col max-w-[80%]", msg.sender === 'outbound' ? "ml-auto items-end" : "items-start")}>
                    <div className={clsx(
                      "p-3 rounded-2xl text-sm",
                      msg.sender === 'outbound' 
                        ? "bg-blue-600 text-white rounded-tr-sm" 
                        : "bg-slate-800 text-slate-200 border border-slate-700 rounded-tl-sm"
                    )}>
                      {msg.text}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] text-slate-500">{msg.time}</span>
                      {msg.classification && (
                        <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300">
                          {msg.classification}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 border-t border-slate-700/50 bg-slate-900/80 flex gap-2">
                <button className="flex-1 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors border border-slate-700">
                  Log Reply
                </button>
                <button className="flex-1 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors">
                  Log New Message
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel: Template Tools */}
        <div className="w-full lg:w-[40%] flex flex-col gap-6 min-h-0 overflow-y-auto custom-scrollbar pr-2">
          
          {/* Quick Send */}
          <div className="glass-panel rounded-xl p-5 border border-slate-700">
            <h3 className="font-bold text-white mb-4 flex items-center gap-2">
              <Send size={18} className="text-blue-400" /> Quick Send Generator
            </h3>
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Select Brand</label>
                <select 
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500 appearance-none"
                >
                  <option value="1">The Spice Route</option>
                  <option value="2">Brew & Bean</option>
                  <option value="3">Pizza Paradise</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Select Template</label>
                <select 
                  value={selectedTemplate}
                  onChange={(e) => setSelectedTemplate(e.target.value)}
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500 appearance-none"
                >
                  {templates.map(t => (
                    <option key={t.id} value={t.id}>{t.name}</option>
                  ))}
                </select>
              </div>
              <button 
                onClick={handleGenerate}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl font-medium transition-colors shadow-lg shadow-blue-500/20"
              >
                Generate Message
              </button>

              {generatedMessage && (
                <div className="mt-4 p-4 bg-slate-900/80 border border-slate-700 rounded-xl relative group">
                  <p className="text-sm text-slate-300 whitespace-pre-wrap">{generatedMessage}</p>
                  <button 
                    onClick={handleCopy}
                    className="absolute top-2 right-2 p-2 bg-slate-800 text-slate-300 hover:text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity border border-slate-700"
                    title="Copy to clipboard"
                  >
                    <Copy size={16} />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Templates Preview */}
          <div className="space-y-4">
            <h3 className="font-bold text-white flex items-center gap-2">
              <MessageCircle size={18} className="text-violet-400" /> Templates Preview
            </h3>
            {templates.map(template => (
              <div key={template.id} className="glass-panel rounded-xl p-5 border border-slate-700 bg-slate-800/30">
                <h4 className="text-sm font-bold text-white mb-3">{template.name}</h4>
                <div className="text-sm text-slate-300 whitespace-pre-wrap leading-relaxed">
                  {renderTemplateText(template.content)}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
