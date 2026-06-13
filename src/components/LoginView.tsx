import React, { useState } from "react";
import { GraduationCap, Key, ShieldCheck, Mail, ArrowRight, UserCheck, BookOpen } from "lucide-react";

interface LoginViewProps {
  onLoginSuccess: (role: "principal" | "teacher" | "student") => void;
}

export default function LoginView({ onLoginSuccess }: LoginViewProps) {
  const [selectedRole, setSelectedRole] = useState<"principal" | "teacher" | "student">("student");
  const [userEmail, setUserEmail] = useState("ali@student.com");
  const [userPassword, setUserPassword] = useState("••••••••");

  // Sync pre-sets when the role changes to make testing instant and seamless!
  const handleRoleSelect = (role: "principal" | "teacher" | "student") => {
    setSelectedRole(role);
    if (role === "principal") {
      setUserEmail("john.smith@school.com");
      setUserPassword("EMP-001");
    } else if (role === "teacher") {
      setUserEmail("muhammadshafiqgurmani923@gmail.com");
      setUserPassword("TCH-045");
    } else {
      setUserEmail("ali@student.com");
      setUserPassword("STD-1001");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSuccess(selectedRole);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4" id="login-selection-container">
      <div className="bg-[#EBEBE6] border border-[#141414]/15 rounded-none max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 overflow-hidden shadow-2xl">
        
        {/* Left column: Branded Editorial visual message */}
        <div className="bg-[#141414] text-[#F5F5F0] p-10 flex flex-col justify-between text-left relative">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-[#F5F5F0] rounded-sm flex items-center justify-center">
                <GraduationCap className="h-5.5 w-5.5 text-[#141414] stroke-[2]" />
              </div>
              <div>
                <h3 className="font-serif font-extrabold text-xl text-white tracking-tight leading-none">EduMaster LMS</h3>
                <span className="text-[9px] font-mono text-[#A59D84] uppercase tracking-widest block mt-1">Nisab Systems Administration</span>
              </div>
            </div>

            <div className="space-y-4 pt-8">
              <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-amber-400 block font-bold">
                Platform Motto / رہنما اصول
              </span>
              <p className="font-serif text-[#F5F5F0]/85 text-base italic leading-relaxed">
                "Education is the absolute beacon that guides human intellect across global frontiers."
              </p>
              
              <div className="pt-4 border-t border-white/10 space-y-2">
                <p className="urdu text-lg text-amber-300 leading-loose">
                  علم حاصل کرنا ہر مسلمان پر فرض ہے۔
                </p>
                <p className="text-[10px] text-[#F5F5F0]/50 font-mono uppercase tracking-wider">
                  Urdu Noto Nastaliq support active
                </p>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 text-[9px] font-mono uppercase tracking-widest text-[#F5F5F0]/40">
            <span>Powered by React 18 & Vite • Created by Muhammad Shafiq Gurmani</span>
          </div>
        </div>

        {/* Right column: Form portal */}
        <div className="p-10 text-left bg-[#EBEBE6] flex flex-col justify-between">
          <div className="space-y-6">
            <div>
              <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-[#141414]/50 font-bold block">
                Security Authorization Gate
              </span>
              <h2 className="text-xl font-serif font-extrabold text-[#141414] mt-1">
                LMS Account Authentication
              </h2>
            </div>

            {/* Selector Tab for Roles as per HTML */}
            <div className="space-y-2">
              <span className="text-[9px] font-mono uppercase tracking-widest text-[#141414]/60 font-bold block">
                Select Academic Role (اپنا کردار منتخب کریں)
              </span>
              <div className="grid grid-cols-3 gap-1.5 pt-1">
                {(
                  [
                    { id: "student", label: "Student", sub: "طلباء" },
                    { id: "teacher", label: "Teacher", sub: "اساتذہ" },
                    { id: "principal", label: "Principal", sub: "پرنسپل" }
                  ] as const
                ).map((role) => {
                  const isChosen = selectedRole === role.id;
                  return (
                    <button
                      key={role.id}
                      type="button"
                      onClick={() => handleRoleSelect(role.id)}
                      className={`flex flex-col items-center justify-center p-3 border tracking-wider transition-all duration-300 ${
                        isChosen
                          ? "bg-[#141414] text-[#F5F5F0] border-[#141414] font-bold"
                          : "bg-[#F5F5F0] text-[#141414]/80 border-[#141414]/15 hover:border-[#141414]/40"
                      }`}
                    >
                      <span className="text-[11px] font-mono uppercase tracking-wider block">{role.label}</span>
                      <span className="urdu text-[9px] opacity-70 mt-1">{role.sub}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Main Email and Credentials Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[9px] font-mono uppercase tracking-widest text-[#141414]/65 block font-bold">
                  Email Address / شناختی ای میل
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 h-3.5 w-3.5 text-[#141414]/40" />
                  <input
                    type="email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    className="w-full pl-9 pr-4 py-3 bg-[#F5F5F0] border border-[#141414]/15 text-xs focus:outline-none focus:border-[#141414]"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label className="text-[9px] font-mono uppercase tracking-widest text-[#141414]/65 block font-bold">
                    Credential passcode
                  </label>
                  <span className="text-[9px] font-mono uppercase tracking-widest text-[#141414]/40 block">
                    Secured Passcode
                  </span>
                </div>
                <div className="relative">
                  <Key className="absolute left-3 top-3.5 h-3.5 w-3.5 text-[#141414]/40" />
                  <input
                    type="text"
                    value={userPassword}
                    onChange={(e) => setUserPassword(e.target.value)}
                    className="w-full pl-9 pr-4 py-3 bg-[#F5F5F0] border border-[#141414]/15 text-xs font-mono focus:outline-none focus:border-[#141414] tracking-widest font-bold"
                    required
                  />
                </div>
              </div>

              {/* Demo credentials helper card to satisfy usability */}
              <div className="p-3 bg-[#F5F5F0] border border-[#141414]/10 rounded-sm">
                <p className="text-[9px] font-mono uppercase tracking-widest text-amber-900 font-bold mb-1 flex items-center gap-1.5">
                  <ShieldCheck className="h-3 w-3" /> DEMO Sandbox Credentials Pre-loaded
                </p>
                <p className="text-[10px] text-[#141414]/70 font-mono leading-relaxed select-all">
                  Simply select a role tab above to instantly populate correct emails and secure code ids! Click 'AUTHORIZED ENTRY' below to continue.
                </p>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#141414] hover:bg-opacity-95 text-[#F5F5F0] text-[10px] font-mono uppercase tracking-widest font-bold flex items-center justify-center gap-2 transition"
              >
                <span>Authorized Entry (لاگ ان)</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
