import React, { useState } from "react";
import { 
  GraduationCap, 
  LayoutDashboard, 
  Compass, 
  PlusCircle, 
  Award, 
  Menu, 
  X,
  BookOpen,
  LogOut,
  UserCheck,
  ShieldAlert
} from "lucide-react";

interface NavigationProps {
  currentView: "dashboard" | "catalog" | "create-course" | "lesson-viewer";
  setCurrentView: (view: "dashboard" | "catalog" | "create-course" | "lesson-viewer") => void;
  completedLessonsCount: number;
  activeCourseTitle?: string;
  hasActiveCourse: boolean;
  activeRole: "principal" | "teacher" | "student" | "login";
  onSwitchRole: (role: "principal" | "teacher" | "student" | "login") => void;
}

export default function Navigation({
  currentView,
  setCurrentView,
  completedLessonsCount,
  activeCourseTitle,
  hasActiveCourse,
  activeRole,
  onSwitchRole
}: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const userLevel = 1 + Math.floor(completedLessonsCount / 2);

  const navItems = [
    { id: "dashboard", label: "My Desk", icon: LayoutDashboard },
    { id: "catalog", label: "Curriculum Catalog", icon: Compass },
    { id: "create-course", label: "Design Course", icon: PlusCircle },
  ] as const;

  // Compute profile based on active roles
  const getRoleProfile = () => {
    switch (activeRole) {
      case "principal":
        return { name: "Dr. John Smith", id: "EMP-001 • Principal", alias: "JS" };
      case "teacher":
        return { name: "M. Shafiq Gurmani", id: "TCH-045 • Lead Teacher", alias: "SG" };
      case "student":
      default:
        return { name: "Ali Hassan", id: "STD-1001 • Student", alias: "AH" };
    }
  };

  const profile = getRoleProfile();

  return (
    <nav className="bg-[#F5F5F0] border-b border-[#141414]/10 sticky top-0 z-40 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          
          {/* Logo Brand / Title */}
          <div className="flex items-center">
            <div 
              onClick={() => {
                if (activeRole !== "login") {
                  setCurrentView("dashboard");
                }
              }} 
              className="flex items-center gap-3 cursor-pointer group"
              id="nav-logo"
            >
              <div className="text-[#141414] p-1">
                <GraduationCap className="h-7 w-7 text-[#141414] stroke-[1.5]" />
              </div>
              <div>
                <span className="font-serif italic font-extrabold text-2xl tracking-tighter text-[#141414] block leading-none">
                  EduMaster LMS
                </span>
                <span className="text-[9px] uppercase tracking-[0.2em] font-semibold text-[#A59D84] block mt-1">
                  Shafiq Gurmani Platform
                </span>
              </div>
            </div>

            {/* Desktop Navigation Link Tabs (Visible for student layout/activities) */}
            {activeRole === "student" && (
              <div className="hidden md:ml-12 md:flex md:space-x-2">
                {navItems.map((item) => {
                  const isActive = currentView === item.id;
                  return (
                    <button
                      key={item.id}
                      id={`nav-${item.id}`}
                      onClick={() => {
                        setCurrentView(item.id);
                      }}
                      className={`flex items-center gap-1.5 px-4 py-2 text-[10px] uppercase tracking-[0.15em] font-semibold transition-all duration-200 border-b-2 ${
                        isActive
                          ? "border-[#141414] text-[#141414] font-bold"
                          : "border-transparent text-[#141414]/55 hover:text-[#141414] hover:border-[#141414]/20"
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}

                {/* Dynamic Learn Tab when there is an active course */}
                {hasActiveCourse && (
                  <button
                    id="nav-lesson-viewer"
                    onClick={() => setCurrentView("lesson-viewer")}
                    className={`flex items-center gap-1.5 px-4 py-2 text-[10px] uppercase tracking-[0.15em] font-semibold transition-all duration-200 border-b-2 ${
                      currentView === "lesson-viewer"
                        ? "border-amber-600 text-amber-850 font-bold"
                        : "border-transparent text-amber-700/60 hover:text-amber-800"
                    }`}
                  >
                    <BookOpen className="h-3 w-3 animate-pulse" />
                    Lecture Workspace
                  </button>
                )}
              </div>
            )}

            {/* General informative text for special administrative modes */}
            {activeRole === "principal" && (
              <span className="hidden lg:inline ml-8 text-[9px] font-mono tracking-wider uppercase bg-stone-200/60 text-[#141414]/70 px-3 py-1 border border-black/5">
                💼 EXECUTIVE CONTROL ACTIVE: Dr. John Smith Mode
              </span>
            )}
            {activeRole === "teacher" && (
              <span className="hidden lg:inline ml-8 text-[9px] font-mono tracking-wider uppercase bg-amber-55 bg-amber-50 text-amber-805 px-3 py-1 border border-amber-300">
                ✏️ faculty syllabus MODE ACTIVE: Muhammad Shafiq Gurmani
              </span>
            )}
          </div>

          {/* Right Section: Level, Profile & Role Exit Button */}
          {activeRole !== "login" && (
            <div className="hidden md:flex items-center gap-6">
              
              {/* Level Indicator Badge */}
              {activeRole === "student" && (
                <div className="flex items-center gap-2 px-3 py-1.5 bg-[#EBEBE6] border border-[#141414]/10 rounded-sm">
                  <Award className="h-3.5 w-3.5 text-[#141414]/70" />
                  <div className="text-[10px] uppercase tracking-wider">
                    <span className="text-[#141414]/50 font-medium mr-1">Level</span>
                    <span className="font-bold font-mono text-[#141414]">{userLevel}</span>
                  </div>
                </div>
              )}

              {/* User Profile Card */}
              <div className="flex items-center gap-3 ml-2 pl-4 border-l border-[#141414]/10">
                <div className="bg-[#141414] text-[#F5F5F0] font-bold h-9 w-9 rounded-sm flex items-center justify-center text-xs uppercase tracking-wider">
                  {profile.alias}
                </div>
                <div className="text-left">
                  <p className="text-xs font-serif italic text-[#141414] leading-3 font-bold">{profile.name}</p>
                  <span className="text-[9px] font-mono tracking-tighter text-[#141414]/50 mt-1 block font-bold uppercase">{profile.id}</span>
                </div>
              </div>

              {/* Switch Role / Exit panel button */}
              <button
                onClick={() => onSwitchRole("login")}
                className="flex items-center gap-1 bg-stone-200/80 hover:bg-stone-300/90 text-[#141414]/80 text-[9px] font-mono uppercase tracking-widest font-bold px-3 py-2 transition border border-black/10 rounded-sm"
                title="Switch role"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span>Switch Role</span>
              </button>
            </div>
          )}

          {/* Mobile Menu Icon toggler */}
          {activeRole !== "login" && (
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={() => onSwitchRole("login")}
                className="p-2 text-[#141414]/70 hover:text-black"
                title="Logout"
              >
                <LogOut className="h-5 w-5" />
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-[#141414] p-2 focus:outline-none"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && activeRole !== "login" && (
        <div className="md:hidden bg-[#F5F5F0] border-b border-[#141414]/10 px-4 pt-2 pb-6 space-y-1">
          {activeRole === "student" && navItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentView(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-none text-xs uppercase tracking-widest transition ${
                  isActive
                    ? "bg-[#EBEBE6] text-[#141414] font-bold"
                    : "text-[#141414]/70 hover:bg-[#EBEBE6]/45"
                }`}
              >
                {item.label}
              </button>
            );
          })}

          {activeRole === "student" && hasActiveCourse && (
            <button
              onClick={() => {
                setCurrentView("lesson-viewer");
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-none text-xs uppercase tracking-widest transition ${
                currentView === "lesson-viewer"
                  ? "bg-amber-100/50 text-amber-900 font-bold"
                  : "text-amber-800 hover:bg-[#EBEBE6]/45"
              }`}
            >
              <BookOpen className="h-4 w-4" />
              Workspace Syllabus ({activeCourseTitle})
            </button>
          )}

          {/* Profile details in Mobile Menu */}
          <div className="pt-4 border-t border-[#141414]/10 flex flex-col gap-3 px-4 text-left">
            <div className="flex items-center gap-3">
              <div className="bg-[#141414] text-[#F5F5F0] font-bold h-10 w-10 flex items-center justify-center uppercase">
                {profile.alias}
              </div>
              <div>
                <p className="text-sm font-serif italic text-[#141414] font-bold">{profile.name}</p>
                <p className="text-[10px] text-[#141414]/50 uppercase tracking-widest font-mono">{profile.id}</p>
              </div>
            </div>
            
            <button
              onClick={() => {
                onSwitchRole("login");
                setMobileMenuOpen(false);
              }}
              className="w-full text-center py-2 bg-stone-200 text-[#141414] text-[10px] font-mono uppercase tracking-widest font-bold"
            >
              LOGOUT / CHANGE ACCOUNT MODE
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
