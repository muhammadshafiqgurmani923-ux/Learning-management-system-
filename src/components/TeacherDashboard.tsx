import React, { useState } from "react";
import { 
  Users, 
  CalendarCheck2, 
  Plus, 
  Trash2, 
  BookOpen, 
  FileText, 
  CheckCircle, 
  Clock, 
  GraduationCap,
  Save,
  MessageSquare,
  HelpCircle,
  FolderLock
} from "lucide-react";
import { LMSStudent, LMSTeacher, LMSAttendanceRecord, LMSExam, LMSAssignment, LMSMaterial, LMSResult } from "../data/lmsData";

interface TeacherDashboardProps {
  students: LMSStudent[];
  teachers: LMSTeacher[];
  attendance: LMSAttendanceRecord[];
  onAddAttendance: (record: LMSAttendanceRecord) => void;
  exams: LMSExam[];
  onAddExam: (exam: LMSExam) => void;
  assignments: LMSAssignment[];
  onAddAssignment: (assignment: LMSAssignment) => void;
  materials: LMSMaterial[];
  onAddMaterial: (mat: LMSMaterial) => void;
  results: LMSResult[];
  onAddResult: (res: LMSResult) => void;
}

export default function TeacherDashboard({
  students,
  teachers,
  attendance,
  onAddAttendance,
  exams,
  onAddExam,
  assignments,
  onAddAssignment,
  materials,
  onAddMaterial,
  results,
  onAddResult
}: TeacherDashboardProps) {
  const [activeTab, setActiveTab] = useState<"dashboard" | "classes" | "attendance" | "materials" | "assignments" | "exams" | "grading">("dashboard");
  
  // States for interactive modules
  // 1. Attendance module state
  const [selectedClassForAtt, setSelectedClassForAtt] = useState("10-A");
  const [attDate, setAttDate] = useState(new Date().toISOString().split("T")[0]);
  const [attStates, setAttStates] = useState<Record<number, "present" | "absent">>({
    1: "present", 2: "present", 3: "present", 4: "present", 5: "present"
  });
  const [attSuccessMsg, setAttSuccessMsg] = useState("");

  // 2. Study material form state
  const [newMaterialTitle, setNewMaterialTitle] = useState("");
  const [newMaterialSubject, setNewMaterialSubject] = useState("Mathematics");
  const [newMaterialType, setNewMaterialType] = useState("PDF Booklet");
  const [newMaterialSize, setNewMaterialSize] = useState("2.5 MB");

  // 3. New Assignment form state
  const [newAssignTitle, setNewAssignTitle] = useState("");
  const [newAssignClass, setNewAssignClass] = useState("10-A");
  const [newAssignSubject, setNewAssignSubject] = useState("Mathematics");
  const [newAssignDueDate, setNewAssignDueDate] = useState("2026-06-25");
  const [newAssignInstruction, setNewAssignInstruction] = useState("");

  // 4. Create Exam form state
  const [examTitle, setExamTitle] = useState("");
  const [examClass, setExamClass] = useState("10-A");
  const [examSubject, setExamSubject] = useState("Mathematics");
  const [examDuration, setExamDuration] = useState("30");
  const [examMaxMarks, setExamMaxMarks] = useState("25");
  const [examType, setExamType] = useState<"mcq" | "descriptive">("mcq");
  
  // First default MCQ question construct
  const [questionText, setQuestionText] = useState("");
  const [opt1, setOpt1] = useState("");
  const [opt2, setOpt2] = useState("");
  const [opt3, setOpt3] = useState("");
  const [opt4, setOpt4] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [explanation, setExplanation] = useState("");

  // Notification overlays
  const [successOverlay, setSuccessOverlay] = useState("");
  const [validationError, setValidationError] = useState("");

  // Active user context prefilled as Muhammad Shafiq Gurmani
  const activeTeacher = {
    name: "Muhammad Shafiq Gurmani",
    id: "TCH-045",
    subject: "Mathematics & Computer Science",
    classes: ["10-A", "9-B"]
  };

  const handleToggleAttendance = (studentId: number) => {
    setAttStates(prev => ({
      ...prev,
      [studentId]: prev[studentId] === "present" ? "absent" : "present"
    }));
  };

  const handleSubmitAttendance = (e: React.FormEvent) => {
    e.preventDefault();
    const studentsInClass = students.filter(s => s.class === selectedClassForAtt);
    let presentCount = 0;
    let absentCount = 0;

    studentsInClass.forEach(s => {
      const state = attStates[s.id] || "present";
      if (state === "present") presentCount++;
      else absentCount++;
    });

    const newRec: LMSAttendanceRecord = {
      id: "att-" + Date.now(),
      date: attDate,
      className: selectedClassForAtt,
      presentCount,
      absentCount,
      totalCount: studentsInClass.length,
      records: { ...attStates }
    };

    onAddAttendance(newRec);
    setAttSuccessMsg(`Attendance for class ${selectedClassForAtt} successfully saved on ${attDate}.`);
    setTimeout(() => setAttSuccessMsg(""), 4500);
  };

  const handleAddMaterialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMaterialTitle) return;
    const material: LMSMaterial = {
      id: Date.now(),
      title: newMaterialTitle,
      subject: newMaterialSubject,
      fileType: newMaterialType,
      size: newMaterialSize,
      dateAdded: new Date().toISOString().split("T")[0]
    };
    onAddMaterial(material);
    triggerSuccess(`Successfully added materials handouts for ${newMaterialTitle}`);
    setNewMaterialTitle("");
  };

  const handleAddAssignmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAssignTitle) return;
    const classCount = students.filter(s => s.class === newAssignClass).length;
    const assignObj: LMSAssignment = {
      id: Date.now(),
      title: newAssignTitle,
      className: newAssignClass,
      subject: newAssignSubject,
      dueDate: newAssignDueDate,
      instruction: newAssignInstruction,
      submittedCount: 0,
      totalCount: classCount,
      submissions: []
    };
    onAddAssignment(assignObj);
    triggerSuccess(`Published Assignment: ${newAssignTitle}`);
    setNewAssignTitle("");
    setNewAssignInstruction("");
  };

  const handleAddExamSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!examTitle || !questionText) {
      setValidationError("Please fill out exam subject and first question structure.");
      return;
    }

    const examObj: LMSExam = {
      id: Date.now(),
      title: examTitle,
      className: examClass,
      subject: examSubject,
      date: new Date().toISOString().split("T")[0],
      duration: parseInt(examDuration),
      totalMarks: parseInt(examMaxMarks),
      status: "scheduled",
      questions: [
        {
          id: Date.now() + 1,
          examId: Date.now(),
          type: examType,
          question: questionText,
          options: examType === "mcq" ? [opt1 || "Option A", opt2 || "Option B", opt3 || "Option C", opt4 || "Option D"] : undefined,
          answer: correctAnswer || opt1 || "Answer",
          explanation,
          marks: parseInt(examMaxMarks)
        }
      ]
    };

    onAddExam(examObj);
    triggerSuccess(`Successfully created Exam: ${examTitle}`);
    setExamTitle("");
    setQuestionText("");
    setOpt1("");
    setOpt2("");
    setOpt3("");
    setOpt4("");
    setCorrectAnswer("");
    setExplanation("");
    setValidationError("");
  };

  const triggerSuccess = (msg: string) => {
    setSuccessOverlay(msg);
    setTimeout(() => setSuccessOverlay(""), 4500);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Visual Header Banner for premier teacher */}
      <div className="bg-[#EBEBE6] border border-[#141414]/10 rounded-none p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="text-left space-y-2">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-[#141414]" />
            <h1 className="text-2xl font-serif font-extrabold text-[#141414]">
              Instructor Workspace & Syllabus Workbench <span className="urdu text-lg font-normal ml-1">(اساتذہ پورٹل)</span>
            </h1>
          </div>
          <p className="text-xs font-serif text-[#141414]/70 max-w-xl leading-relaxed">
            Welcome, Lead Instructor <strong className="underline text-black">Muhammad Shafiq Gurmani</strong>. Manage subject evaluation schedules, write lecture textbooks, record daily attendance ratios, and evaluate grading metrics.
          </p>
        </div>

        {/* Dynamic active role credential badge */}
        <div className="p-4 bg-[#141414] text-[#F5F5F0] rounded-none font-mono text-xs text-left">
          <p className="text-amber-400 uppercase tracking-widest text-[9px] font-bold">Assigned Subject Faculty</p>
          <p className="font-bold">Prof. Shafiq Gurmani / شفیق گورمانی</p>
          <p className="text-[#F5F5F0]/60 text-[9px]">ID: TCH-045 • Lead Mathematics Scientist</p>
        </div>
      </div>

      {successOverlay && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-950 p-4 font-mono text-xs text-left">
          ✓ APPROVED STATE UPDATE: {successOverlay}
        </div>
      )}

      {/* Internal Navigation tabs */}
      <div className="flex flex-wrap border-b border-[#141414]/10 gap-2">
        {(
          [
            { id: "dashboard", label: "Dashboard Overview", urdu: "ڈیش بورڈ" },
            { id: "classes", label: "My Classes Group", urdu: "کلاسز" },
            { id: "attendance", label: "Attendance Recorder", urdu: "حاضری" },
            { id: "materials", label: "Syllabus Handouts", urdu: "مواد" },
            { id: "assignments", label: "Homework Manager", urdu: "اسائنمنٹس" },
            { id: "exams", label: "Create Exam Test", urdu: "امتحان لیں" },
            { id: "grading", label: "Grading Terminal", urdu: "گریڈنگ" }
          ] as const
        ).map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setValidationError("");
              }}
              className={`px-4 py-3 text-[10px] font-mono uppercase tracking-widest font-bold transition-all border-b-2 flex items-center gap-1.5 ${
                isActive
                  ? "border-[#141414] text-[#141414]"
                  : "border-transparent text-[#141414]/50 hover:text-[#141414]/90 hover:border-[#141414]/20"
              }`}
            >
              <span>{tab.label}</span>
              <span className="urdu text-xs text-[#141414]/40">({tab.urdu})</span>
            </button>
          );
        })}
      </div>

      {/* RENDER INSTRUCTOR SUB SECTION PANELS */}
      {activeTab === "dashboard" && (
        <div className="space-y-8 animate-fade-in text-left">
          
          {/* Quick teacher overview counters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#141414]/15 border border-[#141414]/10">
            <div className="p-6 bg-[#EBEBE6]">
              <span className="text-[9px] font-mono uppercase tracking-widest text-[#141414]/50">Assigned Cohorts</span>
              <p className="text-3xl font-light font-mono text-[#141414] mt-2">2 Classes</p>
              <p className="text-[10px] font-mono text-[#141414]/40 uppercase mt-1">Grade 10-A & Grade 9-B</p>
            </div>

            <div className="p-6 bg-[#EBEBE6]">
              <span className="text-[9px] font-mono uppercase tracking-widest text-[#141414]/50">Handout Textbooks</span>
              <p className="text-3xl font-light font-mono text-[#141414] mt-2">{materials.length} Resources</p>
              <p className="text-[10px] font-mono text-[#141414]/40 uppercase mt-1">Active PDFs & Docs</p>
            </div>

            <div className="p-6 bg-[#EBEBE6]">
              <span className="text-[9px] font-mono uppercase tracking-widest text-[#141414]/50">Active Exams</span>
              <p className="text-3xl font-light font-mono text-[#141414] mt-2">{exams.length} Evaluations</p>
              <p className="text-[10px] font-mono text-[#141414]/40 uppercase mt-1">Both scheduled & graded</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-[#EBEBE6] border border-[#141414]/10 p-6 space-y-4">
              <h3 className="font-serif font-bold text-[#141414] border-b border-[#141414]/10 pb-2">Active Homework Portfolios</h3>
              
              <div className="space-y-3">
                {assignments.map(ass => (
                  <div key={ass.id} className="p-4 bg-[#F5F5F0] border border-[#141414]/10 flex justify-between items-center">
                    <div>
                      <p className="font-serif font-bold text-xs">{ass.title}</p>
                      <p className="text-[10px] text-[#141414]/50 font-mono mt-0.5">Subject: {ass.subject} | Grade: {ass.className} | Due: {ass.dueDate}</p>
                    </div>
                    <span className="text-[9px] font-mono font-bold uppercase tracking-wider bg-[#141414]/5 px-2.5 py-1 border border-[#141414]/10">
                      Submissions: {ass.submittedCount} / {ass.totalCount}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#EBEBE6] border border-[#141414]/10 p-6 space-y-3">
              <h3 className="font-serif font-bold text-[#141414] border-b border-[#141414]/10 pb-2">Teacher Tasks</h3>
              <div className="space-y-2 text-xs font-serif text-[#141414]/80">
                <p className="flex items-center gap-2">✓ <span className="underline">Approve lesson catalog index</span></p>
                <p className="flex items-center gap-2">✓ <span className="underline">Plan linear equations descriptive quiz</span></p>
                <p className="flex items-center gap-2">✓ <span className="underline">Complete peer validation reviews</span></p>
              </div>
              <p className="urdu text-sm text-[#A59D84] leading-relaxed pt-2 border-t border-[#141414]/10">
                براہ کرم روزانہ کی بنیاد پر حاضری اور اسائنمنٹ کے نتائج درج کریں۔
              </p>
            </div>
          </div>
        </div>
      )}

      {/* VIEW: TEACHER CLASSES CHANNELS */}
      {activeTab === "classes" && (
        <div className="space-y-6 text-left animate-fade-in">
          <div className="bg-[#EBEBE6] p-6 border border-[#141414]/10 space-y-4">
            <h3 className="font-serif font-bold text-lg border-b border-[#141414]/10 pb-2">My Assigned Classes</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div className="p-5 bg-[#F5F5F0] border border-[#141414]/10">
                <h4 className="font-serif font-extrabold text-[#141414] text-sm">Class 10-A (Secondary)</h4>
                <p className="text-[10px] font-mono text-[#141414]/50 uppercase tracking-widest mt-1">Primary math track</p>
                <p className="text-xs font-serif text-[#141414]/75 mt-3">3 students are registered to your sessions here.</p>
              </div>

              <div className="p-5 bg-[#F5F5F0] border border-[#141414]/10">
                <h4 className="font-serif font-extrabold text-[#141414] text-sm">Class 9-B (Junior)</h4>
                <p className="text-[10px] font-mono text-[#141414]/50 uppercase tracking-widest mt-1">Secondary foundations</p>
                <p className="text-xs font-serif text-[#141414]/75 mt-3">2 students registered. Primary supervisor Zainab Ali.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW: INTERACTIVE ATTENDANCE SUBMISSION ENGINE */}
      {activeTab === "attendance" && (
        <div className="space-y-6 text-left animate-fade-in">
          <div className="bg-[#EBEBE6] p-6 border border-[#141414]/10">
            <h3 className="font-serif font-bold text-lg border-b border-[#141414]/10 pb-2">Subject Attendance Recorder Tool (حاضری شیٹ)</h3>
            
            {attSuccessMsg && (
              <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-950 text-xs font-mono my-3">
                ✓ {attSuccessMsg}
              </div>
            )}

            <form onSubmit={handleSubmitAttendance} className="mt-4 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-widest text-[#141414]/65 block font-bold mb-1">Select Active Class *</label>
                  <select
                    value={selectedClassForAtt}
                    onChange={(e) => setSelectedClassForAtt(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#F5F5F0] border border-[#141414]/15 rounded-none text-xs focus:outline-none"
                  >
                    <option value="10-A">Class 10-A (Secondary Master)</option>
                    <option value="9-B">Class 9-B (Junior Level)</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-mono uppercase tracking-widest text-[#141414]/65 block font-bold mb-1">Target Date *</label>
                  <input
                    type="date"
                    value={attDate}
                    onChange={(e) => setAttDate(e.target.value)}
                    className="w-full px-3.5 py-2 bg-[#F5F5F0] border border-[#141414]/15 rounded-none text-xs focus:outline-none font-mono"
                  />
                </div>
              </div>

              {/* Attendance student rows list */}
              <div className="p-4 bg-[#F5F5F0] border border-[#141414]/10 space-y-3">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#141414]/50 leading-none">Roster Presence Checker</span>
                
                <div className="space-y-2.5 pt-2">
                  {students
                    .filter(s => s.class === selectedClassForAtt)
                    .map(student => {
                      const presence = attStates[student.id] || "present";
                      return (
                        <div key={student.id} className="p-3 bg-[#EBEBE6] border border-[#141414]/5 flex justify-between items-center text-xs">
                          <span className="font-serif font-extrabold">{student.name} ({student.rollNo})</span>
                          <button
                            type="button"
                            onClick={() => handleToggleAttendance(student.id)}
                            className={`px-4 py-1.5 font-mono text-[9px] uppercase tracking-widest font-bold transition-all ${
                              presence === "present" ? "bg-green-800 text-[#F5F5F0]" : "bg-red-800 text-[#F5F5F0]"
                            }`}
                          >
                            {presence === "present" ? "✓ Present / حاضر" : "✗ Absent / غیر حاضر"}
                          </button>
                        </div>
                      );
                    })}

                  {students.filter(s => s.class === selectedClassForAtt).length === 0 && (
                    <p className="text-xs font-serif italic text-stone-500 py-3">No students found assigned to this class level portfolio.</p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="px-6 py-3 bg-[#141414] hover:bg-opacity-95 text-[#F5F5F0] text-[10px] font-mono uppercase tracking-widest font-bold font-bold"
              >
                SUBMIT CLASS ATTENDANCE LOG (حاضری محفوظ کریں)
              </button>
            </form>
          </div>
        </div>
      )}

      {/* VIEW: STUDY MATERIALS textbook manager */}
      {activeTab === "materials" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-left animate-fade-in">
          
          <div className="lg:col-span-2 bg-[#EBEBE6] border border-[#141414]/10 p-6 space-y-4">
            <h3 className="font-serif font-bold text-lg border-b border-[#141414]/10 pb-2">Active Textbook Handouts ({materials.length})</h3>
            
            <div className="space-y-3">
              {materials.map(mat => (
                <div key={mat.id} className="p-4 bg-[#F5F5F0] border border-[#141414]/10 flex justify-between items-center">
                  <div>
                    <span className="text-[10px] font-mono text-amber-800 bg-amber-100 uppercase px-2 py-0.5">{mat.subject}</span>
                    <p className="font-serif font-extrabold text-sm mt-1">{mat.title}</p>
                    <p className="text-[9px] text-[#141414]/40 font-mono">Added: {mat.dateAdded} • {mat.fileType} • Size: {mat.size}</p>
                  </div>
                  <span className="text-[9px] font-mono tracking-widest uppercase text-emerald-800 font-bold bg-emerald-50 border border-emerald-300 px-3 py-1">
                    Released
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#EBEBE6] border border-[#141414]/10 p-6 space-y-4">
            <h3 className="font-serif font-bold text-lg border-b border-[#141414]/10 pb-2">Upload Syllabus Resource</h3>
            
            <form onSubmit={handleAddMaterialSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[9px] font-mono uppercase tracking-widest block font-bold text-[#141414]/65">Document Title *</label>
                <input
                  type="text"
                  value={newMaterialTitle}
                  onChange={(e) => setNewMaterialTitle(e.target.value)}
                  placeholder="e.g. Intro to Geometry formulas"
                  className="w-full px-3 py-2 bg-[#F5F5F0] border border-[#141414]/15 rounded-none text-xs focus:outline-none"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-mono uppercase tracking-widest block font-bold text-[#141414]/65">Subject Classify *</label>
                <select
                  value={newMaterialSubject}
                  onChange={(e) => setNewMaterialSubject(e.target.value)}
                  className="w-full px-3 py-2 bg-[#F5F5F0] border border-[#141414]/15 rounded-none text-xs focus:outline-none font-mono"
                >
                  <option value="Mathematics">Mathematics</option>
                  <option value="Physics">Physics</option>
                  <option value="English Literature">English Literature</option>
                  <option value="Computer Science">Computer Science</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-mono uppercase tracking-widest block font-bold text-[#141414]/65">Document Type *</label>
                <input
                  type="text"
                  value={newMaterialType}
                  onChange={(e) => setNewMaterialType(e.target.value)}
                  placeholder="e.g. PDF Handout"
                  className="w-full px-3 py-2 bg-[#F5F5F0] border border-[#141414]/15 rounded-none text-xs focus:outline-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#141414] hover:bg-opacity-95 text-[#F5F5F0] text-[10px] font-mono uppercase tracking-widest font-bold"
              >
                RELEASE TEXTBOOK RESOURCE (اپ لوڈ کریں)
              </button>
            </form>
          </div>
        </div>
      )}

      {/* VIEW: TEACHER ASSIGNMENTS homework architect */}
      {activeTab === "assignments" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-left animate-fade-in">
          
          <div className="lg:col-span-2 bg-[#EBEBE6] border border-[#141414]/10 p-6 space-y-4">
            <h3 className="font-serif font-bold text-lg border-b border-[#141414]/10 pb-2">Active Homework Portfolios</h3>
            
            <div className="space-y-3">
              {assignments.map(ass => (
                <div key={ass.id} className="p-4 bg-[#F5F5F0] border border-[#141414]/10 space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[9px] font-mono text-amber-800 bg-amber-50 border border-amber-250 px-2.5 py-0.5 font-bold uppercase">{ass.subject}</span>
                      <h4 className="font-serif font-extrabold text-sm mt-1">{ass.title}</h4>
                      <p className="text-[10px] text-[#141414]/50 font-mono">Submission Target: {ass.className} | Due Date: {ass.dueDate}</p>
                    </div>
                    <span className="text-[10px] font-mono font-bold bg-[#141414]/5 px-2 py-1 uppercase border border-[#141414]/10">
                      Replies: {ass.submittedCount} / {ass.totalCount}
                    </span>
                  </div>
                  {ass.instruction && <p className="text-xs font-serif text-[#141414]/70 italic bg-white/40 p-2 border-l-2 border-[#141414]">{ass.instruction}</p>}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#EBEBE6] border border-[#141414]/10 p-6 space-y-4">
            <h3 className="font-serif font-bold text-[#141414] border-b border-[#141414]/10 pb-2">Construct Assignment</h3>
            
            <form onSubmit={handleAddAssignmentSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[9px] font-mono uppercase tracking-widest block font-bold text-[#141414]/65">Assignment Title *</label>
                <input
                  type="text"
                  value={newAssignTitle}
                  onChange={(e) => setNewAssignTitle(e.target.value)}
                  placeholder="e.g. Quad equations matrices work"
                  className="w-full px-3 py-2 bg-[#F5F5F0] border border-[#141414]/15 rounded-none text-xs focus:outline-none"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-mono uppercase tracking-widest block font-bold text-[#141414]/65">Assigned Class *</label>
                <select
                  value={newAssignClass}
                  onChange={(e) => setNewAssignClass(e.target.value)}
                  className="w-full px-3 py-2 bg-[#F5F5F0] border border-[#141414]/15 rounded-none text-xs focus:outline-none font-mono"
                >
                  <option value="10-A">Class 10-A (Secondary Master)</option>
                  <option value="9-B">Class 9-B (Junior Cohort)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-mono uppercase tracking-widest block font-bold text-[#141414]/65">Topic Category *</label>
                <select
                  value={newAssignSubject}
                  onChange={(e) => setNewAssignSubject(e.target.value)}
                  className="w-full px-3 py-2 bg-[#F5F5F0] border border-[#141414]/15 rounded-none text-xs focus:outline-none font-mono"
                >
                  <option value="Mathematics">Mathematics</option>
                  <option value="Physics">Physics</option>
                  <option value="English Literature">English Literature</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-mono uppercase tracking-widest block font-bold text-[#141414]/65">Due Deadline *</label>
                <input
                  type="date"
                  value={newAssignDueDate}
                  onChange={(e) => setNewAssignDueDate(e.target.value)}
                  className="w-full px-3 py-2 bg-[#F5F5F0] border border-[#141414]/15 rounded-none text-xs focus:outline-none font-mono"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-mono uppercase tracking-widest block font-bold text-[#141414]/65">Task Instructions *</label>
                <textarea
                  value={newAssignInstruction}
                  onChange={(e) => setNewAssignInstruction(e.target.value)}
                  placeholder="Solve problems set on Chapter 2 page 45"
                  className="w-full h-24 px-3 py-2 bg-[#F5F5F0] border border-[#141414]/15 rounded-none text-xs focus:outline-none font-serif"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#141414] hover:bg-opacity-95 text-[#F5F5F0] text-[10px] font-mono uppercase tracking-widest font-bold"
              >
                PUBLISH HOMEWORK TASK (محفوظ کریں)
              </button>
            </form>
          </div>
        </div>
      )}

      {/* VIEW: TEACHER EXAMS SCHEDULER & CONSTRUCTOR */}
      {activeTab === "exams" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-left animate-fade-in">
          
          <div className="lg:col-span-2 bg-[#EBEBE6] border border-[#141414]/10 p-6 space-y-4">
            <h3 className="font-serif font-bold text-lg border-b border-[#141414]/10 pb-2">Ongoing & Scheduled Examinations ({exams.length})</h3>
            
            <div className="space-y-3">
              {exams.map(ex => (
                <div key={ex.id} className="p-4 bg-[#F5F5F0] border border-[#141414]/10 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] font-mono text-amber-800 bg-amber-50 border border-amber-250 px-2.5 py-0.5 font-bold uppercase">{ex.subject}</span>
                    <span className={`text-[9px] font-mono uppercase px-2 py-0.5 font-bold ${
                      ex.status === "scheduled" ? "bg-amber-150 text-amber-800" : "bg-emerald-100 text-emerald-800"
                    }`}>
                      {ex.status}
                    </span>
                  </div>
                  <h4 className="font-serif font-extrabold text-sm">{ex.title}</h4>
                  <div className="flex flex-wrap text-[10px] font-mono text-[#141414]/50 uppercase tracking-widest justify-between pt-1 border-t border-[#141414]/5">
                    <span>Target Grade: {ex.className}</span>
                    <span>Allocated Time: {ex.duration} Mins</span>
                    <span>Total Marks: {ex.totalMarks} Points</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#EBEBE6] border border-[#141414]/10 p-6 space-y-4">
            <h3 className="font-serif font-bold text-lg border-b border-[#141414]/10 pb-2">Formulate New Exam</h3>
            
            {validationError && <p className="p-3 bg-red-100 border border-red-300 text-red-900 text-[11px] font-mono">{validationError}</p>}

            <form onSubmit={handleAddExamSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[9px] font-mono uppercase tracking-widest block font-bold text-[#141414]/65">Exam Title *</label>
                <input
                  type="text"
                  value={examTitle}
                  onChange={(e) => setExamTitle(e.target.value)}
                  placeholder="e.g. Midterm Maths Evaluation"
                  className="w-full px-3 py-2 bg-[#F5F5F0] border border-[#141414]/15 rounded-none text-xs focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[9px] font-mono uppercase tracking-widest block font-bold text-[#141414]/65">Allocate Class *</label>
                  <select
                    value={examClass}
                    onChange={(e) => setExamClass(e.target.value)}
                    className="w-full px-3 py-2 bg-[#F5F5F0] border border-[#141414]/15 rounded-none text-[11px] focus:outline-none font-mono"
                  >
                    <option value="10-A">10-A</option>
                    <option value="9-B">9-B</option>
                  </select>
                </div>

                <div>
                  <label className="text-[9px] font-mono uppercase tracking-widest block font-bold text-[#141414]/65">Topic Subject *</label>
                  <select
                    value={examSubject}
                    onChange={(e) => setExamSubject(e.target.value)}
                    className="w-full px-3 py-2 bg-[#F5F5F0] border border-[#141414]/15 rounded-none text-[11px] focus:outline-none font-mono"
                  >
                    <option value="Mathematics">Mathematics</option>
                    <option value="Physics">Physics</option>
                    <option value="English Literature">English Literature</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[9px] font-mono uppercase tracking-widest block font-bold text-[#141414]/65">Duration (mins) *</label>
                  <input
                    type="number"
                    value={examDuration}
                    onChange={(e) => setExamDuration(e.target.value)}
                    className="w-full px-3 py-2 bg-[#F5F5F0] border border-[#141414]/15 rounded-none text-xs focus:outline-none font-mono"
                    required
                  />
                </div>

                <div>
                  <label className="text-[9px] font-mono uppercase tracking-widest block font-bold text-[#141414]/65">Max Points *</label>
                  <input
                    type="number"
                    value={examMaxMarks}
                    onChange={(e) => setExamMaxMarks(e.target.value)}
                    className="w-full px-3 py-2 bg-[#F5F5F0] border border-[#141414]/15 rounded-none text-xs focus:outline-none font-mono"
                    required
                  />
                </div>
              </div>

              <div className="p-3 bg-[#F5F5F0] border border-[#141414]/10 space-y-3">
                <span className="text-[9px] font-mono uppercase tracking-widest text-[#141414]/50 block font-bold">First Evaluation Question Details</span>
                
                <div className="space-y-1">
                  <label className="text-[9px] font-mono uppercase tracking-widest block text-[#141414]/65">Type *</label>
                  <select
                    value={examType}
                    onChange={(e) => setExamType(e.target.value as any)}
                    className="w-full px-3 py-1 bg-white border border-[#141414]/15 rounded-none text-[11px] focus:outline-none font-mono text-[9px]"
                  >
                    <option value="mcq">Multiple Choice Question (MCQ)</option>
                    <option value="descriptive">Descriptive Question (Descriptive)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-mono uppercase tracking-widest block text-[#141414]/65">Question *</label>
                  <input
                    type="text"
                    value={questionText}
                    onChange={(e) => setQuestionText(e.target.value)}
                    placeholder="Enter mathematical question text"
                    className="w-full px-3 py-1 bg-white border border-[#141414]/15 rounded-none text-xs focus:outline-none"
                    required
                  />
                </div>

                {examType === "mcq" && (
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-1.5">
                      <input type="text" value={opt1} onChange={(e) => setOpt1(e.target.value)} placeholder="Option 1" className="bg-white border text-[11px] p-1 text-xs outline-none" required />
                      <input type="text" value={opt2} onChange={(e) => setOpt2(e.target.value)} placeholder="Option 2" className="bg-white border text-[11px] p-1 text-xs outline-none" required />
                      <input type="text" value={opt3} onChange={(e) => setOpt3(e.target.value)} placeholder="Option 3" className="bg-white border text-[11px] p-1 text-xs outline-none" required />
                      <input type="text" value={opt4} onChange={(e) => setOpt4(e.target.value)} placeholder="Option 4" className="bg-white border text-[11px] p-1 text-xs outline-none" required />
                    </div>
                    <input
                      type="text"
                      value={correctAnswer}
                      onChange={(e) => setCorrectAnswer(e.target.value)}
                      placeholder="Write exact correct option word"
                      className="w-full px-3 py-1 bg-white border border-[#141414]/15 rounded-none text-[11px] focus:outline-none font-bold"
                      required
                    />
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#141414] hover:bg-opacity-95 text-[#F5F5F0] text-[10px] font-mono uppercase tracking-widest font-bold"
              >
                PUBLISH EXAM PLAN (امتحانی پیپر بنائیں)
              </button>
            </form>
          </div>
        </div>
      )}

      {/* VIEW: TEACHER GRADING PORTAL CHECKLIST */}
      {activeTab === "grading" && (
        <div className="space-y-6 text-left animate-fade-in">
          <div className="bg-[#EBEBE6] p-6 border border-[#141414]/10 space-y-4">
            <h3 className="font-serif font-bold text-lg border-b border-[#141414]/10 pb-2">Academic Grader Review Panel (اصلاح کریں)</h3>
            
            <p className="text-xs font-serif text-[#141414]/70">
              Below are the student scores and replies for the completed mechanics check-ups and homework submissions. Add grades as required.
            </p>

            <div className="space-y-3 pt-2">
              {results.map(res => (
                <div key={res.id} className="p-4 bg-[#F5F5F0] border border-[#141414]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-[9px] font-mono text-emerald-800 bg-emerald-50 border border-emerald-300 px-2 py-0.5 tracking-wider font-bold">GRADED</span>
                    <p className="font-serif font-extrabold text-sm mt-1">{res.examTitle}</p>
                    <p className="text-[10px] text-[#141414]/60 font-serif">Student: {res.studentName} | Subject: {res.subject}</p>
                  </div>

                  <div className="text-right">
                    <span className="text-sm font-mono block font-bold text-[#141414]">{res.marksObtained} / {res.totalMarks} Points</span>
                    <span className="text-[9px] font-mono text-emerald-800 font-extrabold bg-[#EBEBE6] px-2.5 py-0.5 mt-0.5">Grade: {res.grade}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
