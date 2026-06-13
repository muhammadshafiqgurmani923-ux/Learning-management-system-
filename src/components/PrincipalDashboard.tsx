import React, { useState } from "react";
import { 
  Users, 
  UserCheck, 
  School, 
  CalendarCheck, 
  FileText, 
  TrendingUp, 
  Search, 
  Plus, 
  Check, 
  X, 
  AlertCircle,
  Clock,
  BookOpen,
  Award,
  ChevronRight,
  UserPlus,
  HelpCircle,
  GraduationCap
} from "lucide-react";
import { LMSStudent, LMSTeacher, LMSAttendanceRecord, LMSExam, LMSAssignment, LMSResult, LMSTimetableSlot } from "../data/lmsData";

interface PrincipalDashboardProps {
  students: LMSStudent[];
  teachers: LMSTeacher[];
  pendingTeachers: LMSTeacher[];
  onApproveTeacher: (id: number) => void;
  onRejectTeacher: (id: number) => void;
  onAddStudent: (student: LMSStudent) => void;
  classes: string[];
  attendance: LMSAttendanceRecord[];
  exams: LMSExam[];
  assignments: LMSAssignment[];
  results: LMSResult[];
}

export default function PrincipalDashboard({
  students,
  teachers,
  pendingTeachers,
  onApproveTeacher,
  onRejectTeacher,
  onAddStudent,
  classes,
  attendance,
  exams,
  assignments,
  results
}: PrincipalDashboardProps) {
  const [activeTab, setActiveTab] = useState<"dashboard" | "teachers" | "students" | "classes" | "attendance" | "exams" | "reports">("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [newStudentName, setNewStudentName] = useState("");
  const [newStudentClass, setNewStudentClass] = useState("10-A");
  const [newStudentEmail, setNewStudentEmail] = useState("");
  const [newStudentPhone, setNewStudentPhone] = useState("");
  const [validationError, setValidationError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleCreateStudentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentName || !newStudentEmail || !newStudentPhone) {
      setValidationError("Please fill in all database attributes.");
      return;
    }
    const newRoll = (1000 + students.length + 1).toString();
    const studentObj: LMSStudent = {
      id: Date.now(),
      name: newStudentName,
      class: newStudentClass,
      rollNo: newRoll,
      attendance: 100, // starts fully attended
      email: newStudentEmail,
      phone: newStudentPhone
    };
    onAddStudent(studentObj);
    setSuccessMsg(`Successfully enrolled ${newStudentName} with Roll Number ${newRoll}`);
    setNewStudentName("");
    setNewStudentEmail("");
    setNewStudentPhone("");
    setNewStudentClass("10-A");
    setValidationError("");
    setTimeout(() => setSuccessMsg(""), 4500);
  };

  // Compute stats
  const totalStudents = students.length;
  const approvedTeachers = teachers.filter(t => t.status === "approved").length;
  const totalClasses = classes.length;
  const averageAttendance = Math.round(
    students.reduce((sum, s) => sum + s.attendance, 0) / (students.length || 1)
  );

  return (
    <div className="space-y-8 pb-16">
      
      {/* Title Header Banner Block */}
      <div className="bg-[#EBEBE6] border border-[#141414]/10 rounded-none p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="text-left space-y-2">
          <div className="flex items-center gap-2">
            <School className="h-6 w-6 text-[#141414]" />
            <h1 className="text-2xl font-serif font-extrabold text-[#141414]">
              Executive Principal Portal <span className="urdu text-lg font-normal ml-1"> (پرنسپل ڈیش بورڈ)</span>
            </h1>
          </div>
          <p className="text-xs font-serif text-[#141414]/70 max-w-xl leading-relaxed">
            Welcome back, Dr. John Smith. You have executive command over class enrollments, teacher registration statuses, examinations scheduling, and educational analytics directories.
          </p>
        </div>

        {/* Executive credential tag */}
        <div className="p-4 bg-[#141414] text-[#F5F5F0] rounded-none font-mono text-xs text-left">
          <p className="text-amber-400 uppercase tracking-widest text-[9px] font-bold">Session Supervisor</p>
          <p className="font-bold">Dr. John Smith / جان سمتھ</p>
          <p className="text-[#F5F5F0]/60 text-[9px]">ID: EMP-001 • Executive Principal</p>
        </div>
      </div>

      {/* Internal Navigation tabs matching HTML requirements */}
      <div className="flex flex-wrap border-b border-[#141414]/10 gap-2">
        {[
          { id: "dashboard", label: "Dashboard", urdu: "ڈیش بورڈ", badge: undefined },
          { id: "teachers", label: "Teachers Approval", urdu: "اساتذہ", badge: pendingTeachers.length },
          { id: "students", label: "Student Roster", urdu: "طلباء", badge: undefined },
          { id: "classes", label: "Classes & Timetable", urdu: "کلاسز", badge: undefined },
          { id: "attendance", label: "Attendance History", urdu: "حاضری", badge: undefined },
          { id: "exams", label: "Exam Schedules", urdu: "امتحانات", badge: undefined },
          { id: "reports", label: "Academic Reports", urdu: "رپورٹس", badge: undefined }
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setSearchQuery("");
              }}
              className={`px-4 py-3 text-[10px] font-mono uppercase tracking-widest font-bold transition-all border-b-2 flex items-center gap-2 ${
                isActive
                  ? "border-[#141414] text-[#141414]"
                  : "border-transparent text-[#141414]/50 hover:text-[#141414]/90 hover:border-[#141414]/20"
              }`}
            >
              <span>{tab.label}</span>
              <span className="urdu text-xs lowercase text-[#141414]/50">({tab.urdu})</span>
              {tab.badge !== undefined && tab.badge > 0 ? (
                <span className="bg-red-500 text-white font-mono text-[9px] px-1.5 py-0.5 rounded-full animate-bounce">
                  {tab.badge}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>

      {/* RENDER ACTIVE TAB VIEW */}
      {activeTab === "dashboard" && (
        <div className="space-y-8 animate-fade-in">
          
          {/* principal summary metric display widgets */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-[#141414]/15 border border-[#141414]/10">
            {/* Widget 1 */}
            <div className="bg-[#EBEBE6] p-6 text-left flex flex-col justify-between min-h-36">
              <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#141414]/50 flex items-center gap-1.5">
                <Users className="h-3 w-3 text-[#141414]" /> Total Students
              </span>
              <div className="mt-4">
                <span className="text-3xl font-light font-mono block text-[#141414]">{totalStudents}</span>
                <span className="text-[9px] text-[#141414]/50 font-mono uppercase tracking-wider">Actively Enrolled</span>
              </div>
            </div>

            {/* Widget 2 */}
            <div className="bg-[#EBEBE6] p-6 text-left flex flex-col justify-between min-h-36">
              <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#141414]/50 flex items-center gap-1.5">
                <UserCheck className="h-3 w-3 text-[#141414]" /> Approved Faculty
              </span>
              <div className="mt-4">
                <span className="text-3xl font-light font-mono block text-[#141414]">{approvedTeachers}</span>
                <span className="text-[9px] text-[#141414]/50 font-mono uppercase tracking-wider">Instructing Nisab</span>
              </div>
            </div>

            {/* Widget 3 */}
            <div className="bg-[#EBEBE6] p-6 text-left flex flex-col justify-between min-h-36">
              <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#141414]/50 flex items-center gap-1.5">
                <School className="h-3 w-3 text-[#141414]" /> Classes Taught
              </span>
              <div className="mt-4">
                <span className="text-3xl font-light font-mono block text-[#141414]">{totalClasses}</span>
                <span className="text-[9px] text-[#141414]/50 font-mono uppercase tracking-wider">9th, 10th & 11th levels</span>
              </div>
            </div>

            {/* Widget 4 */}
            <div className="bg-[#EBEBE6] p-6 text-left flex flex-col justify-between min-h-36">
              <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#141414]/50 flex items-center gap-1.5">
                <CalendarCheck className="h-3 w-3 text-[#141414]" /> Attendance rate2
              </span>
              <div className="mt-4">
                <span className="text-3xl font-light font-mono block text-emerald-800">{averageAttendance}%</span>
                <span className="text-[9px] text-[#141414]/50 font-mono uppercase tracking-wider">Daily Presence Ratio</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-left">
            {/* Pending Approvals queue inside dashboard */}
            <div className="bg-[#EBEBE6] border border-[#141414]/10 p-6 space-y-4">
              <div className="border-b border-[#141414]/10 pb-3 flex justify-between items-center">
                <h3 className="font-serif font-bold text-[#141414]">Pending Teacher Approval Queue</h3>
                <span className="text-[10px] font-mono text-red-700 bg-red-100/50 px-2 py-0.5 uppercase">Needs Attention</span>
              </div>

              {pendingTeachers.length === 0 ? (
                <div className="py-8 text-center text-[#141414]/50 font-serif text-sm italic">
                  No pending registrations in review. All active faculty verified.
                </div>
              ) : (
                <div className="space-y-3">
                  {pendingTeachers.map(teacher => (
                    <div key={teacher.id} className="p-4 bg-[#F5F5F0] border border-[#141414]/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div>
                        <p className="font-serif font-extrabold text-sm">{teacher.name}</p>
                        <p className="text-[10px] text-[#141414]/60 font-mono mt-0.5">Subject: {teacher.subject}</p>
                        <p className="text-[9px] text-[#141414]/40 font-mono">Contact: {teacher.phone} | {teacher.email}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => onApproveTeacher(teacher.id)}
                          className="px-2.5 py-1.5 bg-green-800 hover:bg-green-900 text-[#F5F5F0] font-mono font-bold text-[9px] uppercase tracking-wider"
                          title="Approve registration"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => onRejectTeacher(teacher.id)}
                          className="px-2.5 py-1.5 bg-stone-200 hover:bg-stone-300 text-[#141414] font-mono font-bold text-[9px] uppercase tracking-wider"
                          title="Reject registration"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick overview of latest scheduled examination plans */}
            <div className="bg-[#EBEBE6] border border-[#141414]/10 p-6 space-y-4">
              <div className="border-b border-[#141414]/10 pb-3 flex justify-between items-center">
                <h3 className="font-serif font-bold text-[#141414]">Syllabus Exam Schedules</h3>
                <span className="text-[10px] font-mono text-[#141414]/40">Active Milestones</span>
              </div>

              <div className="space-y-3">
                {exams.map(ex => (
                  <div key={ex.id} className="p-3.5 bg-[#F5F5F0] border border-[#141414]/10 flex justify-between items-center gap-4">
                    <div>
                      <p className="font-serif font-bold text-xs">{ex.title}</p>
                      <p className="text-[10px] text-[#141414]/50 font-mono mt-0.5">{ex.subject} | Grade {ex.className}</p>
                    </div>
                    <span className={`text-[9px] font-mono uppercase px-2 py-0.5 tracking-widest ${
                      ex.status === "scheduled" ? "bg-amber-100 text-amber-800 border border-amber-200" : "bg-emerald-100 text-emerald-800 border border-emerald-250"
                    }`}>
                      {ex.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW: TEACHERS DIRECTORY AND VERIFICATIONS */}
      {activeTab === "teachers" && (
        <div className="space-y-6 animate-fade-in text-left">
          <div className="bg-[#EBEBE6] p-6 border border-[#141414]/10">
            <h3 className="font-serif font-bold text-lg border-b border-[#141414]/10 pb-2">Nisab Faculty Roster</h3>
            
            <div className="mt-4 space-y-4">
              {teachers.map((t) => (
                <div key={t.id} className="p-4 bg-[#F5F5F0] border border-[#141414]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <p className="font-serif font-extrabold text-sm flex items-center gap-2">
                      {t.name}
                      {t.name === "Muhammad Shafiq Gurmani" && (
                        <span className="text-[8px] bg-[#141414] text-white font-mono uppercase font-bold tracking-widest px-2 py-0.5">Premier Developer</span>
                      )}
                    </p>
                    <p className="text-[10px] text-[#141414]/50 font-mono">Specialization: {t.subject}</p>
                    <p className="text-[9px] text-[#141414]/40 font-mono">Classes: {t.classes.join(", ")} | Contact: {t.phone} | {t.email}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1 font-mono text-[9px] uppercase">
                    <span className="text-emerald-800 font-bold bg-[#F5F5F0] border border-emerald-300 px-3 py-1">Verified Approved</span>
                    {t.approvedDate && <span className="text-[#141414]/40 mt-0.5">Date: {t.approvedDate}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* VIEW: STUDENTS DIRECTORY & ENROLLMENT ACTION GATE */}
      {activeTab === "students" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-left animate-fade-in">
          
          {/* List of active students */}
          <div className="lg:col-span-2 bg-[#EBEBE6] border border-[#141414]/10 p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#141414]/10 pb-4 gap-4">
              <h3 className="font-serif font-bold text-lg">Student Directory</h3>
              <div className="relative w-full sm:w-60">
                <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-[#141414]/40" />
                <input
                  type="text"
                  placeholder="Filter name or roll..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 bg-[#F5F5F0] border border-[#141414]/15 rounded-none font-mono text-[10px] focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-3 max-h-[500px] overflow-y-auto scrollbar-thin">
              {students
                .filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.rollNo.includes(searchQuery))
                .map(student => (
                  <div key={student.id} className="p-4 bg-[#F5F5F0] border border-[#141414]/10 flex justify-between items-center gap-4">
                    <div>
                      <p className="font-serif font-extrabold text-sm">{student.name} <span className="text-xs font-mono font-normal text-[#141414]/50">(Roll: {student.rollNo})</span></p>
                      <p className="text-[10px] text-[#141414]/60 font-mono mt-0.5">Grade: {student.class} | email: {student.email} | Contact: {student.phone}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-mono block font-bold text-[#141414]">{student.attendance}%</span>
                      <span className="text-[8px] font-mono text-[#141414]/40 uppercase">Attendance</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* New student enrollment admin gate card */}
          <div className="bg-[#EBEBE6] border border-[#141414]/10 p-6 space-y-4">
            <h3 className="font-serif font-bold text-lg border-b border-[#141414]/10 pb-2">Academic Registration Gate</h3>
            
            {validationError && (
              <div className="p-3 bg-red-100 border border-red-300 text-red-900 text-xs font-mono">
                {validationError}
              </div>
            )}
            {successMsg && (
              <div className="p-3 bg-green-100 border border-green-300 text-green-900 text-xs font-mono">
                {successMsg}
              </div>
            )}

            <form onSubmit={handleCreateStudentSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[9px] font-mono uppercase tracking-widest text-[#141414]/60 block font-bold">Student Name *</label>
                <input
                  type="text"
                  value={newStudentName}
                  onChange={(e) => setNewStudentName(e.target.value)}
                  placeholder="e.g. Hammad Ahmed"
                  className="w-full px-3 py-2 bg-[#F5F5F0] border border-[#141414]/15 rounded-none text-xs focus:outline-none focus:border-[#141414]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-mono uppercase tracking-widest text-[#141414]/60 block font-bold">Allocate Class *</label>
                <select
                  value={newStudentClass}
                  onChange={(e) => setNewStudentClass(e.target.value)}
                  className="w-full px-3 py-2 bg-[#F5F5F0] border border-[#141414]/15 rounded-none text-xs focus:outline-none font-mono"
                >
                  <option value="10-A">10-A (Secondary Master)</option>
                  <option value="9-B">9-B (Incomplete Intermediate)</option>
                  <option value="11-A">11-A (Higher Grade)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-mono uppercase tracking-widest text-[#141414]/60 block font-bold">Parent Email *</label>
                <input
                  type="email"
                  value={newStudentEmail}
                  onChange={(e) => setNewStudentEmail(e.target.value)}
                  placeholder="e.g. parent@email.com"
                  className="w-full px-3 py-2 bg-[#F5F5F0] border border-[#141414]/15 rounded-none text-xs focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-mono uppercase tracking-widest text-[#141414]/60 block font-bold">Emergency Phone *</label>
                <input
                  type="text"
                  value={newStudentPhone}
                  onChange={(e) => setNewStudentPhone(e.target.value)}
                  placeholder="e.g. 0321-1234567"
                  className="w-full px-3 py-2 bg-[#F5F5F0] border border-[#141414]/15 rounded-none text-xs focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#141414] hover:bg-opacity-95 text-[#F5F5F0] text-[10px] font-mono uppercase tracking-widest font-bold transition-all"
              >
                Enroll Student (امٹولمنٹ)
              </button>
            </form>
          </div>
        </div>
      )}

      {/* VIEW: CLASSES AND SYLLABUS DIRECTORIES */}
      {activeTab === "classes" && (
        <div className="space-y-6 text-left animate-fade-in">
          <div className="bg-[#EBEBE6] p-6 border border-[#141414]/10 space-y-4">
            <h3 className="font-serif font-bold text-lg border-b border-[#141414]/10 pb-2">Active Class Modules & Active Subject Syllabus</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
              <div className="p-4 bg-[#F5F5F0] border border-[#141414]/10">
                <h4 className="font-mono text-[10px] uppercase tracking-widest font-bold text-[#141414]/60 mb-2">Secondary Level: 10-A</h4>
                <div className="space-y-2 text-xs font-serif leading-relaxed">
                  <p><strong>Approved Subjects:</strong> Mathematics, Physics, English Literature</p>
                  <p><strong>Premier Instructor:</strong> Muhammad Shafiq Gurmani</p>
                  <p><strong>Assigned Students:</strong> 3 registered (Ali Hassan, Fatima Khan, Hamza Sheikh)</p>
                </div>
              </div>

              <div className="p-4 bg-[#F5F5F0] border border-[#141414]/10">
                <h4 className="font-mono text-[10px] uppercase tracking-widest font-bold text-[#141414]/60 mb-2">Secondary Level: 9-B</h4>
                <div className="space-y-2 text-xs font-serif leading-relaxed">
                  <p><strong>Approved Subjects:</strong> English, Mathematics</p>
                  <p><strong>Premier Instructor:</strong> Ms. Zainab Ali</p>
                  <p><strong>Assigned Students:</strong> 2 registered (Usman Ahmed, Ayesha Malik)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW: DAILY ATTENDANCE HISTORY */}
      {activeTab === "attendance" && (
        <div className="space-y-6 text-left animate-fade-in">
          <div className="bg-[#EBEBE6] p-6 border border-[#141414]/10">
            <h3 className="font-serif font-bold text-lg border-b border-[#141414]/10 pb-3">Platform Attendance Logs (حاضری ریکارڈز)</h3>
            
            <div className="mt-4 space-y-3">
              {attendance.map((rec) => (
                <div key={rec.id} className="p-4 bg-[#F5F5F0] border border-[#141414]/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <span className="text-[10px] font-mono text-[#141414]/50 uppercase tracking-widest font-bold bg-[#141414]/5 px-2 py-0.5">Date: {rec.date}</span>
                    <p className="font-serif font-extrabold text-[#141414] text-sm mt-1.5 font-bold">Grade Level: {rec.className}</p>
                  </div>
                  <div className="flex gap-4 items-center">
                    <span className="text-xs font-mono text-green-800 font-bold bg-green-50 px-2 py-1">{rec.presentCount} Present</span>
                    <span className="text-xs font-mono text-red-800 font-bold bg-red-50 px-2 py-1">{rec.absentCount} Absent</span>
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#141414]/50">Total: {rec.totalCount}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* VIEW: EXAMS PLANNING BOARD */}
      {activeTab === "exams" && (
        <div className="space-y-6 text-left animate-fade-in">
          <div className="bg-[#EBEBE6] p-6 border border-[#141414]/10">
            <h3 className="font-serif font-bold text-lg border-b border-[#141414]/10 pb-2">Central Examination Controller Board</h3>
            
            <div className="mt-4 space-y-4">
              {exams.map((ex) => (
                <div key={ex.id} className="p-5 bg-[#F5F5F0] border border-[#141414]/10 space-y-3">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h4 className="font-serif font-extrabold text-sm text-[#141414]">{ex.title}</h4>
                      <p className="text-[10px] text-[#141414]/50 font-mono mt-0.5">Subject: {ex.subject} | Grade level: {ex.className}</p>
                    </div>
                    <span className={`text-[9px] font-mono uppercase px-2 py-0.5 tracking-widest ${
                      ex.status === "scheduled" ? "bg-amber-100 text-amber-800 border-amber-200" : "bg-emerald-100 text-emerald-850"
                    }`}>
                      {ex.status}
                    </span>
                  </div>

                  <div className="pt-2 border-t border-[#141414]/5 flex justify-between items-center text-[10px] font-mono text-[#141414]/50 uppercase">
                    <span>Duration: {ex.duration} Mins</span>
                    <span>Total Marks: {ex.totalMarks} Points</span>
                    {ex.questions && <span>Questions Locked: {ex.questions.length} Pool</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* VIEW: STATISTICS REPORTS */}
      {activeTab === "reports" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left animate-fade-in">
          <div className="bg-[#EBEBE6] border border-[#141414]/10 p-5 space-y-2">
            <TrendingUp className="h-5 w-5 text-[#141414]/80" />
            <span className="text-[9px] font-mono uppercase tracking-widest text-[#141414]/50 block">Evaluation Performance</span>
            <p className="text-xl font-serif font-bold text-[#141414]">Grade Average A+</p>
            <p className="text-[10px] text-[#141414]/60 font-serif">Computed from mid-term completed test suites in matrices and mechanics.</p>
          </div>

          <div className="bg-[#EBEBE6] border border-[#141414]/10 p-5 space-y-2">
            <Award className="h-5 w-5 text-[#141414]/80" />
            <span className="text-[9px] font-mono uppercase tracking-widest text-[#141414]/50 block">Faculty Achievements</span>
            <p className="text-xl font-serif font-bold text-amber-800">100% Core Syllabus</p>
            <p className="text-[10px] text-[#141414]/60 font-serif">Syllabus segments successfully published across both custom and development catalogs.</p>
          </div>

          <div className="bg-[#EBEBE6] border border-[#141414]/10 p-5 space-y-2">
            <Users className="h-5 w-5 text-[#141414]/80" />
            <span className="text-[9px] font-mono uppercase tracking-widest text-[#141414]/50 block">Attendance Standing</span>
            <p className="text-xl font-serif font-bold text-emerald-800">92.2% Attendance</p>
            <p className="text-[10px] text-[#141414]/60 font-serif">Exceeds national secondary school benchmarks securely.</p>
          </div>
        </div>
      )}
    </div>
  );
}
