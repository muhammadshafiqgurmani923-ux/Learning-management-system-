import React from "react";
import { Mail, GraduationCap, Github, BookOpen } from "lucide-react";

export default function DeveloperFooter() {
  return (
    <footer className="bg-[#141414] text-[#F5F5F0] border-t border-white/10 py-12 mt-16 transition-all" id="developer-footer-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          
          {/* Brand and Urdu tag lines */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-[#F5F5F0] rounded-sm flex items-center justify-center">
                <GraduationCap className="h-5 w-5 text-[#141414] stroke-[2]" />
              </div>
              <div>
                <h3 className="font-serif font-extrabold text-lg text-white tracking-tight leading-none">EduMaster LMS</h3>
                <span className="text-[9px] font-mono text-[#A59D84] uppercase tracking-widest block mt-1">Nisab System Administration</span>
              </div>
            </div>
            
            <p className="text-xs text-[#F5F5F0]/70 font-serif leading-relaxed italic max-w-sm">
              "An educational sphere curated for lifelong study, multi-role academic collaboration, and robust evaluation."
            </p>
            <p className="urdu text-sm text-amber-350 leading-loose text-amber-300">
              تعلیم ایک ایسا نور ہے جو انسانی زندگی کے ہر پہلو کو روشن کرتا ہے۔
            </p>
          </div>

          {/* Developer Specific Module Showcase */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#A59D84] font-bold">Platform Architect</h4>
            <div className="space-y-2">
              <p className="text-xs text-[#F5F5F0]/90 font-sans font-bold leading-none">Muhammad Shafiq Gurmani</p>
              <p className="text-[11px] font-mono text-[#F5F5F0]/60">Senior Lead Full-Stack Software Engineer & Platform Designer</p>
              <p className="urdu text-[12px] text-[#A59D84] leading-relaxed">
                ڈویلپر: محمد شفیق گورمانی — سافٹ ویئر انجینئر
              </p>
            </div>
            <div className="pt-2 flex items-center gap-3">
              <a 
                href="mailto:muhammadshafiqgurmani923@gmail.com" 
                className="text-[10px] bg-white/5 hover:bg-white/10 px-3 py-1.5 font-mono text-[#F5F5F0] transition flex items-center gap-1.5 tracking-wider border border-white/5"
              >
                <Mail className="h-3 w-3 text-sky-400" /> EMAIL ME
              </a>
            </div>
          </div>

          {/* Role Based Access Matrix Info */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#A59D84] font-bold">Role-Based Access Guard</h4>
            <div className="text-[11px] font-mono text-[#F5F5F0]/60 space-y-1.5">
              <div className="flex justify-between border-b border-white/5 pb-1">
                <span>Principal Panel (ڈائریکٹر)</span>
                <span className="text-emerald-400 font-bold font-mono">APPROVED</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-1">
                <span>Teacher Suite (اساتذہ)</span>
                <span className="text-emerald-400 font-bold font-mono">APPROVED</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-1">
                <span>Student Hub (طلباء)</span>
                <span className="text-[#F5F5F0] font-bold font-mono">ACTIVE</span>
              </div>
            </div>
            <p className="text-[9px] text-[#F5F5F0]/40 font-mono leading-normal uppercase">
              Build Version: 4.4.0-React-Vite • Sandboxed Environment On Port 3000
            </p>
          </div>
        </div>

        {/* Lower Legal Disclaimer Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-mono text-[#F5F5F0]/50 uppercase tracking-widest">
          <span>EduMaster LMS &copy; {new Date().getFullYear()} • Developed to excellence</span>
          <div className="flex items-center gap-4">
            <span>Muhammad Shafiq Gurmani Portfolio</span>
            <span>•</span>
            <span className="text-amber-400 font-bold lowercase tracking-normal">muhammadshafiqgurmani923@gmail.com</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
