import { useState, useRef, useEffect, ReactNode } from 'react';
import { MoreHorizontal } from 'lucide-react';

interface DropdownProps {
  children: ReactNode;
}

export function Dropdown({ children }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="text-slate-500 hover:text-white p-1 rounded transition-colors"
      >
        <MoreHorizontal size={18} />
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 glass-panel rounded-xl shadow-xl py-1 z-50 animate-in fade-in zoom-in-95 duration-100">
          <div onClick={(e) => {
            e.stopPropagation();
            setIsOpen(false);
          }}>
            {children}
          </div>
        </div>
      )}
    </div>
  );
}

export function DropdownItem({ onClick, children, className = '' }: { onClick: () => void, children: ReactNode, className?: string }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition-colors flex items-center gap-2 ${className}`}
    >
      {children}
    </button>
  );
}
