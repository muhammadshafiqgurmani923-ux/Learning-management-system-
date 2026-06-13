import React, { useState, useEffect } from "react";
import { Coffee, Code, Mail, ExternalLink, ShieldCheck, MapPin, Cpu, Clock, Terminal, ChevronDown, ChevronUp } from "lucide-react";

export default function DeveloperHeader() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [timeStr, setTimeStr] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString("en-US", { hour12: true }) + " (PST)");
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#141414] text-[#F5F5F0] border-b border-[#F5F5F0]/10" id="developer-header-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
          {/* Main Title Banner Tag info */}
          <div className="flex items-center gap-3.5">
            <div className="h-4.5 w-4.5 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
            <div className="text-left">
              <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-[#A59D84] block leading-none">
                Principal Portfolio & Core Architecture
              </span>
              <h2 className="text-xs sm:text-sm font-serif italic text-white font-extrabold mt-1">
                LMS Platform Engineered by <span className="font-sans font-bold not-italic underline text-[#F5F5F0]">Muhammad Shafiq Gurmani</span>
              </h2>
            </div>
          </div>

          {/* Quick Stats list */}
          <div className="flex items-center gap-4 text-[10px] font-mono tracking-wider">
            <span className="hidden md:flex items-center gap-1.5 text-[#F5F5F0]/70">
              <Clock className="h-3 w-3 text-amber-400" />
              <span>{timeStr}</span>
            </span>
            <span className="text-[#F5F5F0]/50 hidden sm:inline">|</span>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-1 bg-[#F5F5F0]/10 hover:bg-[#F5F5F0]/15 px-3 py-1 text-[9px] uppercase tracking-widest font-bold font-mono transition text-[#F5F5F0]"
            >
              <span>{isExpanded ? "Collapse Specs" : "Architect Specs"}</span>
              {isExpanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
            </button>
          </div>
        </div>

        {/* Expandable Architecture details drawer */}
        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-[#F5F5F0]/10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in text-left">
            {/* Developer Card */}
            <div className="p-3 bg-white/[0.03] border border-white/[0.08] flex items-start gap-2.5">
              <div className="p-1.5 bg-white/5 text-amber-400">
                <Code className="h-4 w-4" />
              </div>
              <div className="space-y-0.5">
                <p className="text-[10px] font-mono uppercase tracking-widest text-amber-400">Software Engineer</p>
                <p className="text-xs font-serif italic font-bold text-[#F5F5F0]">Muhammad Shafiq Gurmani</p>
                <p className="text-[9px] font-mono text-[#F5F5F0]/60">Full-Stack LMS Architect & Designer</p>
              </div>
            </div>

            {/* Contacts Hub */}
            <div className="p-3 bg-white/[0.03] border border-white/[0.08] flex items-start gap-2.5">
              <div className="p-1.5 bg-white/5 text-sky-400">
                <Mail className="h-4 w-4" />
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-mono uppercase tracking-widest text-sky-450 text-sky-400">Connect Hub</p>
                <a 
                  href="mailto:muhammadshafiqgurmani923@gmail.com" 
                  className="text-[11px] font-mono text-[#F5F5F0]/95 hover:text-white hover:underline block truncate"
                >
                  muhammadshafiqgurmani923@gmail.com
                </a>
                <p className="text-[9px] font-mono text-[#F5F5F0]/50 flex items-center gap-1">
                  <MapPin className="h-2.5 w-2.5" /> Punjab, Pakistan / پاکستان
                </p>
              </div>
            </div>

            {/* Core Tech Stack */}
            <div className="p-3 bg-white/[0.03] border border-white/[0.08] flex items-start gap-2.5">
              <div className="p-1.5 bg-white/5 text-emerald-400">
                <Cpu className="h-4 w-4" />
              </div>
              <div className="space-y-0.5">
                <p className="text-[10px] font-mono uppercase tracking-widest text-emerald-550 text-emerald-400">Environment Specs</p>
                <p className="text-xs font-mono font-bold text-[#F5F5F0]">Vite + React 18 + TS</p>
                <p className="text-[9px] font-mono text-[#F5F5F0]/60">Tailwind CSS + Noto Nastaliq Urdu</p>
              </div>
            </div>

            {/* Platform Guard */}
            <div className="p-3 bg-white/[0.03] border border-white/[0.08] flex items-start gap-2.5">
              <div className="p-1.5 bg-white/5 text-purple-400">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <div className="space-y-0.5">
                <p className="text-[10px] font-mono uppercase tracking-widest text-purple-450 text-purple-400">Security Gate</p>
                <p className="text-xs font-mono font-bold text-[#F5F5F0]">Role-Based Auth (RBAC)</p>
                <p className="text-[9px] font-mono text-[#F5F5F0]/60">Principal, Teacher & Student Access</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
