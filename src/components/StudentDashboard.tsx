import React, { useState } from "react";
import { 
  Award, 
  CalendarCheck, 
  Clock, 
  BookOpen, 
  FolderDown, 
  Milestone, 
  CheckCircle,
  HelpCircle,
  TrendingUp,
  X,
  Play
} from "lucide-react";
import { LMSStudent, LMSExam, LMSAssignment, LMSTimetableSlot, LMSMaterial, LMSResult } from "../data/lmsData";

interface StudentDashboardProps {
  students: LMSStudent[];
  exams: LMSExam[];
  onAddResult: (res: LMSResult) => void;
  assignments: LMSAssignment[];
  onUpdateAssignmentSubmission: (assignId: number, studentId: number, answerText: string) => void;
  timetable: LMSTimetableSlot[];
  materials: LMSMaterial[];
  results: LMSResult[];
}

export default function StudentDashboard({
  students,
  exams,
  onAddResult,
  assignments,
  onUpdateAssignmentSubmission,
  timetable,
  materials,
  results
}: StudentDashboardProps) {
  const [activeTab, setActiveTab] = useState<"dashboard" | "timetable" | "attendance" | "assignments" | "exams" | "results" | "materials">("dashboard");

  // Interactive exams modal simulation state
  const [activeExamForQuiz, setActiveExamForQuiz] = useState<LMSExam | null>(null);
  const [answers, setAnswers] = useState<Record<number, string>>({}); // Question ID to Choice
  const [quizScore, setQuizScore] = useState<{ score: number; total: number; answersChecked: boolean } | null>(null);

  // Homework submission state
  const [activeAssignForSub, setActiveAssignForSub] = useState<LMSAssignment | null>(null);
  const [subAnswer, setSubAnswer] = useState("");
  const [homeworkStatus, setHomeworkStatus] = useState("");
  const [validationError, setValidationError] = useState("");

  // Default active student persona
  const currentStudent = {
    id: 1,
    name: "Ali Hassan",
    rollNo: "1001",
    class: "10-A",
    attendance: 92,
    email: "ali@student.com"
  };

  const handleSelectAnswer = (qId: number, optionVal: string) => {
    setAnswers(prev => ({
      ...prev,
      [qId]: optionVal
    }));
  };

  const handleSubmitExamQuiz = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeExamForQuiz || !activeExamForQuiz.questions) return;

    let score = 0;
    const questions = activeExamForQuiz.questions;
    questions.forEach(q => {
      const studentAns = answers[q.id];
      if (studentAns === q.answer) {
        score += q.marks;
      }
    });

    const totalMarks = questions.reduce((sum, q) => sum + q.marks, 0);
    const gradeVal = score / totalMarks >= 0.85 ? "A+" : score / totalMarks >= 0.70 ? "B" : "C";

    // Add to student's academic results
    const newRes: LMSResult = {
      id: Date.now(),
      examId: activeExamForQuiz.id,
      studentId: currentStudent.id,
      studentName: currentStudent.name,
      examTitle: activeExamForQuiz.title,
      subject: activeExamForQuiz.subject,
      marksObtained: score,
      totalMarks,
      grade: gradeVal
    };

    onAddResult(newRes);

    setQuizScore({
      score,
      total: totalMarks,
      answersChecked: true
    });
  };

  const handleHomeworkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeAssignForSub || !subAnswer) return;

    onUpdateAssignmentSubmission(activeAssignForSub.id, currentStudent.id, subAnswer);
    setHomeworkStatus("✓ Assignment submission successfully submitted to your supervisor!");
    setSubAnswer("");
    setTimeout(() => {
      setHomeworkStatus("");
      setActiveAssignForSub(null);
    }, 3500);
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Title Header Banner Block for Scholar Ali */}
      <div className="bg-[#EBEBE6] border border-[#141414]/10 rounded-none p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="text-left space-y-2">
          <div className="flex items-center gap-2">
            <Award className="h-6 w-6 text-[#141414]" />
            <h1 className="text-2xl font-serif font-extrabold text-[#141414]">
              Scholar Workspace & Academic Desk <span className="urdu text-lg font-normal ml-1">(طلباء ڈیسک)</span>
            </h1>
          </div>
          <p className="text-xs font-serif text-[#141414]/70 max-w-xl leading-relaxed">
            Welcome back, Scholar <strong className="underline text-black">Ali Hassan</strong>. You are currently in class Grade 10-A. Attend scheduled linear algebra examinations, submit homework sets, and check terminal report cards.
          </p>
        </div>

        {/* Dynamic scholar card badge */}
        <div className="p-4 bg-[#141414] text-[#F5F5F0] rounded-none font-mono text-xs text-left">
          <p className="text-amber-400 uppercase tracking-widest text-[9px] font-bold">Academic Scholar Status</p>
          <p className="font-bold">Ali Hassan / علی حسن</p>
          <p className="text-[#F5F5F0]/60 text-[9px]">Roll: 1001 • Class: 10-A (Secondary)</p>
        </div>
      </div>

      {/* Navigation tabs */}
      <div className="flex flex-wrap border-b border-[#141414]/10 gap-2">
        {(
          [
            { id: "dashboard", label: "Dashboard Desk", urdu: "ڈیش بورڈ" },
            { id: "timetable", label: "Class Timetable", urdu: "ٹائم ٹیبل" },
            { id: "attendance", label: "Presence & Attendance", urdu: "میری حاضری" },
            { id: "assignments", label: "Homework Tasks", urdu: "ہوم ورک" },
            { id: "exams", label: "Take Exam Paper", urdu: "امتحان دیں" },
            { id: "results", label: "Terminal Results", urdu: "رزلٹ کارڈ" },
            { id: "materials", label: "Syllabus Handouts", urdu: "مواد" }
          ] as const
        ).map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setQuizScore(null);
                setAnswers({});
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

      {/* RENDER CHOSEN STUDENT MODULE PANEL */}
      {activeTab === "dashboard" && (
        <div className="space-y-8 animate-fade-in text-left">
          
          {/* Quick core metrics widgets for Student */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#141414]/15 border border-[#141414]/10">
            <div className="p-6 bg-[#EBEBE6]">
              <span className="text-[9px] font-mono uppercase tracking-widest text-[#141414]/50">Attendance Quotient</span>
              <p className="text-3xl font-light font-mono text-[#141414] mt-2">92% Attendance</p>
              <p className="text-[10px] font-mono text-[#141414]/40 uppercase mt-1">Status: Regular & Good</p>
            </div>

            <div className="p-6 bg-[#EBEBE6]">
              <span className="text-[9px] font-mono uppercase tracking-widest text-[#141414]/50">Home Assignment Sheets</span>
              <p className="text-3xl font-light font-mono text-[#141414] mt-2">1 Pending Task</p>
              <p className="text-[10px] font-mono text-[#141414]/40 uppercase mt-1">Algebra Equations due soon</p>
            </div>

            <div className="p-6 bg-[#EBEBE6]">
              <span className="text-[9px] font-mono uppercase tracking-widest text-[#141414]/50">Completed Evaluations</span>
              <p className="text-3xl font-light font-mono text-emerald-800">{results.filter(r => r.studentId === currentStudent.id).length} Passed</p>
              <p className="text-[10px] font-mono text-[#141414]/40 uppercase mt-1">Grades lock secure</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-[#EBEBE6] border border-[#141414]/10 p-6 space-y-4">
              <h3 className="font-serif font-bold text-[#141414] border-b border-[#141414]/10 pb-2">Instructors Highlights</h3>
              <p className="text-xs font-serif leading-relaxed text-[#141414]/80">
                You are currently being coached in Advanced Linear Mathematics by supervisor <strong className="underline font-sans font-bold">Muhammad Shafiq Gurmani</strong>. Stay focused on textbook chapters to complete requirements.
              </p>
              <p className="urdu text-sm text-emerald-850 leading-loose">
                محنتی طلباء ہمیشہ اساتذہ کا نام فخر سے بلند کرتے ہیں۔
              </p>
            </div>

            <div className="bg-[#EBEBE6] border border-[#141414]/10 p-6 space-y-4">
              <h3 className="font-serif font-bold text-[#141414] border-b border-[#141414]/10 pb-2">Academic Badges & Credentials</h3>
              <div className="flex gap-4">
                <div className="p-3 bg-amber-50 border border-amber-200 text-center space-y-1">
                  <span className="text-xl block">🎖️</span>
                  <p className="text-[9px] font-mono font-bold tracking-wider text-amber-900">10-Day Streak</p>
                </div>
                <div className="p-3 bg-indigo-50 border border-indigo-200 text-center space-y-1">
                  <span className="text-xl block">🎓</span>
                  <p className="text-[9px] font-mono font-bold tracking-wider text-indigo-900">Curric Scholar</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW: WEEKLY TIMETABLE SLOTS */}
      {activeTab === "timetable" && (
        <div className="space-y-6 text-left animate-fade-in">
          <div className="bg-[#EBEBE6] p-6 border border-[#141414]/10">
            <h3 className="font-serif font-bold text-lg border-b border-[#141414]/10 pb-2">Student Weekly Schedule (ٹائم ٹیبل)</h3>
            
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6 pt-1">
              {timetable.map((daySlot, dIdx) => (
                <div key={dIdx} className="p-4 bg-[#F5F5F0] border border-[#141414]/10 space-y-3">
                  <h4 className="font-serif font-extrabold text-sm text-[#141414] border-b border-[#141414]/5 pb-1">{daySlot.day}</h4>
                  <div className="space-y-2 text-xs font-serif">
                    {daySlot.slots.map((sl, sIdx) => (
                      <div key={sIdx} className="p-2 bg-white/40 border border-[#141414]/5">
                        <p className="font-mono text-[9px] text-[#141414]/50 uppercase">{sl.time}</p>
                        <p className="font-bold text-[#141414]">{sl.subject}</p>
                        <p className="text-[10px] text-[#141414]/65">Faculty: {sl.teacher}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* VIEW: LOGGED ATTENDANCE LOG SUMMARY CARD */}
      {activeTab === "attendance" && (
        <div className="space-y-6 text-left animate-fade-in">
          <div className="bg-[#EBEBE6] p-6 border border-[#141414]/10 space-y-4">
            <h3 className="font-serif font-bold text-lg border-b border-[#141414]/10 pb-2">My Subject Presence Indicators (میری حاضری)</h3>
            
            <div className="p-6 bg-[#F5F5F0] border border-[#141414]/10 max-w-md flex justify-between items-center gap-8">
              <div className="space-y-1">
                <span className="text-[9px] font-mono text-[#141414]/50 uppercase tracking-widest font-bold block">Status Level</span>
                <p className="text-lg font-serif font-extrabold text-[#141414]">Attendance rate: {currentStudent.attendance}%</p>
                <p className="text-xs text-green-800 font-serif font-bold">Standard Grade A • Compliant with exams eligibility criteria</p>
              </div>
              <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center font-mono font-bold text-emerald-800 text-lg border border-emerald-300">
                {currentStudent.attendance}%
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW: HOMEWORK ASSIGNMENTS submit interface workflow */}
      {activeTab === "assignments" && (
        <div className="space-y-6 text-left animate-fade-in">
          <div className="bg-[#EBEBE6] p-6 border border-[#141414]/10">
            <h3 className="font-serif font-bold text-lg border-b border-[#141414]/10 pb-2">Assigned Home Lessons Assignments</h3>
            
            {homeworkStatus && <p className="p-3 bg-green-100 border border-green-300 text-green-905 text-xs font-mono my-3">{homeworkStatus}</p>}

            <div className="mt-4 space-y-3.5 pt-1">
              {assignments
                .filter(ass => ass.className === currentStudent.class)
                .map(ass => {
                  const studentSub = ass.submissions?.find(sub => sub.studentId === currentStudent.id);
                  return (
                    <div key={ass.id} className="p-5 bg-[#F5F5F0] border border-[#141414]/10 space-y-3">
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <span className="text-[10px] font-mono text-amber-800 bg-amber-50 px-2 py-0.5 uppercase tracking-wider">{ass.subject}</span>
                          <h4 className="font-serif font-extrabold text-[#141414] text-sm mt-1">{ass.title}</h4>
                          <p className="text-[9px] text-[#141414]/50 font-mono mt-0.5">Topic: {ass.subject} | Due: {ass.dueDate}</p>
                        </div>

                        {studentSub ? (
                          <span className="text-[9px] font-mono uppercase font-bold tracking-widest bg-emerald-100 text-emerald-800 border border-emerald-300 px-3 py-1">
                            ✓ Submitted • Grade: {studentSub.grade || "In Review"}
                          </span>
                        ) : (
                          <button
                            onClick={() => {
                              setActiveAssignForSub(ass);
                              setValidationError("");
                            }}
                            className="px-3.5 py-1.5 bg-[#141414] hover:bg-opacity-90 text-[#F5F5F0] font-mono font-bold text-[9px] uppercase tracking-widest"
                          >
                            Submit Homework
                          </button>
                        )}
                      </div>

                      {ass.instruction && (
                        <p className="text-xs text-[#141414]/70 font-serif leading-relaxed italic border-l-2 border-[#141414] pl-2 bg-white/40 p-2">
                          Instructions: {ass.instruction}
                        </p>
                      )}

                      {studentSub && (
                        <div className="p-3 bg-[#EBEBE6]/60 text-xs border border-[#141414]/5 space-y-1">
                          <p className="font-mono text-[9px] font-bold uppercase text-[#141414]/50">My Answer Text:</p>
                          <p className="font-serif text-[#141414]/90">{studentSub.answerText}</p>
                          {studentSub.feedback && <p className="text-[11px] font-serif text-[#A59D84] mt-1.5"><strong>Feedback:</strong> {studentSub.feedback}</p>}
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          </div>

          {/* Active submit modal drawer */}
          {activeAssignForSub && (
            <div className="fixed inset-0 bg-[#141414]/65 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
              <div className="bg-[#F5F5F0] border border-[#141414]/20 rounded-none max-w-lg w-full p-8 space-y-4">
                <div className="flex justify-between items-start border-b border-[#141414]/10 pb-3">
                  <div>
                    <span className="text-[9px] font-mono uppercase text-amber-800 block">Uploading submission</span>
                    <h4 className="font-serif font-bold text-sm">{activeAssignForSub.title}</h4>
                  </div>
                  <button onClick={() => setActiveAssignForSub(null)} className="text-stone-500 hover:text-black">
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <form onSubmit={handleHomeworkSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[9px] font-mono uppercase tracking-widest text-[#141414]/65 block font-bold">Write Answer Text *</label>
                    <textarea
                      value={subAnswer}
                      onChange={(e) => setSubAnswer(e.target.value)}
                      placeholder="Input complete textual answer details or matrices solutions techniques for the teacher..."
                      className="w-full h-36 px-4 py-3 bg-[#EBEBE6] border border-[#141414]/15 rounded-none text-xs focus:outline-none"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-[#141414] hover:bg-opacity-95 text-[#F5F5F0] text-[10px] font-mono uppercase tracking-widest font-bold"
                  >
                    CONFIRM VERIFIED UPLOAD SUBMISSION (جمع کروائیں)
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* VIEW: LIVE ONLINE EXAM WORKSPACE SHEET */}
      {activeTab === "exams" && (
        <div className="space-y-6 text-left animate-fade-in">
          <div className="bg-[#EBEBE6] p-6 border border-[#141414]/10 space-y-4">
            <h3 className="font-serif font-bold text-lg border-b border-[#141414]/10 pb-2">Academic Assessment Examinations Workspace</h3>
            
            <div className="pt-2 space-y-3">
              {exams
                .filter(ex => ex.className === currentStudent.class)
                .map(ex => {
                  const checkRes = results.find(r => r.examId === ex.id && r.studentId === currentStudent.id);
                  return (
                    <div key={ex.id} className="p-4 bg-[#F5F5F0] border border-[#141414]/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div>
                        <span className="text-[9px] font-mono text-[#141414]/55 bg-[#141414]/5 px-2 py-0.5 uppercase tracking-wider font-bold">Subject: {ex.subject}</span>
                        <h4 className="font-serif font-extrabold text-[#141414] text-sm mt-1">{ex.title}</h4>
                        <p className="text-[9px] text-[#141414]/40 font-mono">Duration: {ex.duration} Mins • Total Marks: {ex.totalMarks} Points</p>
                      </div>

                      {checkRes ? (
                        <span className="text-[9px] font-mono bg-[#EBEBE6] text-emerald-850 font-bold tracking-widest border border-emerald-350 px-3 py-1.5 uppercase">
                          ✓ Completed • Score: {checkRes.marksObtained} / {checkRes.totalMarks} ({checkRes.grade})
                        </span>
                      ) : (
                        <button
                          onClick={() => {
                            setActiveExamForQuiz(ex);
                            setAnswers({});
                            setQuizScore(null);
                          }}
                          className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-[#F5F5F0] font-mono font-bold text-[9px] uppercase tracking-widest flex items-center gap-1"
                        >
                          <Play className="h-3 w-3" /> LAUNCH TEST SHEETS
                        </button>
                      )}
                    </div>
                  );
                })}
            </div>
          </div>

          {/* Interactive Exam Mode Quiz Play Module Overlay */}
          {activeExamForQuiz && (
            <div className="fixed inset-0 bg-[#141414]/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm overflow-y-auto">
              <div className="bg-[#F5F5F0] border border-[#141414]/20 rounded-none max-w-xl w-full p-8 space-y-5 my-8 max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-start border-b border-[#141414]/10 pb-3">
                  <div>
                    <span className="text-[9px] font-mono text-emerald-800 bg-emerald-50 px-2.5 py-0.5 font-bold uppercase tracking-widest">Active Exam Play</span>
                    <h3 className="font-serif font-extrabold text-lg mt-1">{activeExamForQuiz.title}</h3>
                  </div>
                  <button onClick={() => setActiveExamForQuiz(null)} className="text-stone-500 hover:text-black">
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {!quizScore ? (
                  <form onSubmit={handleSubmitExamQuiz} className="space-y-6 text-left">
                    <div className="space-y-5">
                      {activeExamForQuiz.questions?.map((q, idx) => (
                        <div key={q.id} className="p-4 bg-[#EBEBE6] border border-[#141414]/10 space-y-3">
                          <p className="font-serif font-bold text-xs leading-relaxed text-[#141414]">
                            <span className="font-mono bg-[#141414] text-white px-1.5 py-0.5 text-[9px] mr-2">Q{idx + 1}</span>
                            {q.question}
                          </p>
                          
                          {q.type === "mcq" && q.options ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                              {q.options.map(opt => {
                                const isSelected = answers[q.id] === opt;
                                return (
                                  <button
                                    type="button"
                                    key={opt}
                                    onClick={() => handleSelectAnswer(q.id, opt)}
                                    className={`p-3 text-left transition ${
                                      isSelected 
                                        ? "bg-[#141414] text-white font-mono font-bold"
                                        : "bg-white/40 hover:bg-white/70 border border-[#141414]/5"
                                    }`}
                                  >
                                    {opt}
                                  </button>
                                );
                              })}
                            </div>
                          ) : (
                            <textarea
                              placeholder="Write a descriptive explanation answer here..."
                              onChange={(e) => handleSelectAnswer(q.id, e.target.value)}
                              className="w-full h-24 p-2.5 bg-white border border-[#141414]/10 text-xs focus:outline-none"
                              required
                            />
                          )}
                        </div>
                      ))}
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-[#141414] hover:bg-opacity-95 text-[#F5F5F0] text-[10px] font-mono uppercase tracking-widest font-bold"
                    >
                      SUBMIT TEST ANSWERS (امتحان مکمل کریں)
                    </button>
                  </form>
                ) : (
                  <div className="space-y-4 text-center py-4">
                    <span className="text-4xl">🎓</span>
                    <div>
                      <h4 className="font-serif font-bold text-[#141414] text-lg">Examination Grading Lock Successfully Filed!</h4>
                      <p className="text-2xl font-mono font-bold text-emerald-800 mt-2">
                        {quizScore.score} / {quizScore.total} Points
                      </p>
                      <p className="text-[11px] text-[#141414]/60 font-serif max-w-xs mx-auto mt-2">
                        Your test booklet responses were processed and submitted. Results have been populated into your terminal grades directory.
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#141414]/5 text-left space-y-2">
                      <p className="font-mono text-[9px] text-[#141414]/50 uppercase tracking-widest">Question Explanations:</p>
                      {activeExamForQuiz.questions?.map((q, idx) => (
                        <div key={q.id} className="p-3 bg-white/45 text-[11px] font-serif">
                          <p className="font-bold">Q{idx + 1}: {q.question}</p>
                          <p className="text-emerald-800 font-mono text-[10px] mt-1">Correct Answer: {q.answer}</p>
                          {q.explanation && <p className="text-[#141414]/65 mt-0.5">Rationale: {q.explanation}</p>}
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => setActiveExamForQuiz(null)}
                      className="w-full py-2 bg-[#141414] text-white text-[10px] font-mono uppercase tracking-[0.2em] font-bold"
                    >
                      Return to desk
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* VIEW: ACADEMIC GRADES RESULTS REPORT CARD */}
      {activeTab === "results" && (
        <div className="space-y-6 text-left animate-fade-in">
          <div className="bg-[#EBEBE6] p-6 border border-[#141414]/10 space-y-4">
            <h3 className="font-serif font-bold text-lg border-b border-[#141414]/10 pb-2">Secondary Level Terminal Report Card (امتحانی رزلٹ)</h3>
            
            <div className="space-y-3 pt-1">
              {results
                .filter(res => res.studentId === currentStudent.id)
                .map(res => (
                  <div key={res.id} className="p-4 bg-[#F5F5F0] border border-[#141414]/10 flex justify-between items-center">
                    <div>
                      <span className="text-[9px] font-mono text-emerald-800 bg-emerald-50 border border-emerald-300 px-2 py-0.5 font-bold uppercase">{res.subject}</span>
                      <h4 className="font-serif font-extrabold text-sm mt-1">{res.examTitle}</h4>
                      <p className="text-[9px] text-stone-500 font-mono">Date processed: 2026-06-13</p>
                    </div>

                    <div className="text-right">
                      <p className="font-mono text-xs font-bold text-[#141414]">{res.marksObtained} / {res.totalMarks} Points</p>
                      <span className="text-[9px] font-mono bg-[#EBEBE6] px-2.5 py-0.5 text-[#141414] font-bold">Grade: {res.grade}</span>
                    </div>
                  </div>
                ))}

              {results.filter(res => res.studentId === currentStudent.id).length === 0 && (
                <p className="text-xs font-serif italic text-stone-500 py-3">No grades found on record directory currently.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* VIEW: STUDY MATERIALS ACADEMIC HANDOUTS DOWNLOAD */}
      {activeTab === "materials" && (
        <div className="space-y-6 text-left animate-fade-in">
          <div className="bg-[#EBEBE6] p-6 border border-[#141414]/10 space-y-4">
            <h3 className="font-serif font-bold text-lg border-b border-[#141414]/10 pb-2">Academic Textbooks Handouts & Manuals</h3>
            
            <div className="space-y-3 pt-1">
              {materials.map(mat => (
                <div key={mat.id} className="p-4 bg-[#F5F5F0] border border-[#141414]/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <span className="text-[9px] font-mono text-amber-800 bg-amber-50 uppercase px-2 py-0.5 font-bold tracking-wider">{mat.subject}</span>
                    <h4 className="font-serif font-extrabold text-[#141414] text-sm mt-1">{mat.title}</h4>
                    <p className="text-[9px] text-[#141414]/40 font-mono">Document Format: {mat.fileType} • Size Budget: {mat.size}</p>
                  </div>
                  <button
                    onClick={() => alert(`Beginning download stream for: ${mat.title}`)}
                    className="px-3 py-1.5 bg-stone-200 hover:bg-stone-300 border border-[#141414]/10 text-[#141414] text-[9px] font-mono uppercase tracking-widest font-bold font-bold flex items-center gap-1"
                  >
                    <FolderDown className="h-3 w-3" /> Download Guide
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
