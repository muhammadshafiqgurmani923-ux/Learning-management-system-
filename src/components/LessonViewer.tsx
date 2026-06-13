import React, { useState, useEffect } from "react";
import { 
  ArrowLeft, 
  CheckCircle, 
  Circle, 
  HelpCircle, 
  BookOpen, 
  FileText, 
  GraduationCap, 
  Link, 
  ChevronRight,
  ArrowRight,
  Sparkles,
  Award,
  AlertCircle,
  Save,
  Check
} from "lucide-react";
import { Course, CourseProgress, Lesson, QuizQuestion } from "../types";

interface LessonViewerProps {
  course: Course;
  progress: CourseProgress;
  activeLessonId: string;
  setActiveLessonId: (lessonId: string) => void;
  onToggleLessonComplete: (courseId: string, lessonId: string) => void;
  onSaveQuizScore: (courseId: string, lessonId: string, score: number) => void;
  onSaveLessonNote: (courseId: string, lessonId: string, noteText: string) => void;
  savedNotes: Record<string, string>;
  onBackToDashboard: () => void;
}

export default function LessonViewer({
  course,
  progress,
  activeLessonId,
  setActiveLessonId,
  onToggleLessonComplete,
  onSaveQuizScore,
  onSaveLessonNote,
  savedNotes,
  onBackToDashboard
}: LessonViewerProps) {
  const [activeTab, setActiveTab] = useState<"read" | "quiz" | "notes" | "resources">("read");
  const [typedNote, setTypedNote] = useState<string>("");
  const [noteSavedFeedback, setNoteSavedFeedback] = useState<boolean>(false);

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<number>(0);

  const activeLesson = course.lessons.find((l) => l.id === activeLessonId) || course.lessons[0];
  const lessonProgress = progress.lessonProgress[activeLesson.id];

  // Load memoized note for this active lesson
  useEffect(() => {
    const noteKey = `${course.id}-${activeLesson.id}`;
    setTypedNote(savedNotes[noteKey] || "");
    
    // Reset transient quiz states
    setSelectedAnswers({});
    setQuizSubmitted(false);
    setQuizScore(0);
    setActiveTab("read");
  }, [activeLesson.id, course.id, savedNotes]);

  const handleSaveNote = () => {
    onSaveLessonNote(course.id, activeLesson.id, typedNote);
    setNoteSavedFeedback(true);
    setTimeout(() => {
      setNoteSavedFeedback(false);
    }, 2000);
  };

  // Quiz handlers
  const handleAnswerSelect = (questionId: string, optionIndex: number) => {
    if (quizSubmitted) return; // Locked when submitted
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: optionIndex
    });
  };

  const handleSubmitQuiz = (questions: QuizQuestion[]) => {
    if (quizSubmitted) return;
    
    let score = 0;
    questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswerIndex) {
        score++;
      }
    });

    setQuizScore(score);
    setQuizSubmitted(true);
    
    // Save to global progress
    onSaveQuizScore(course.id, activeLesson.id, score);
  };

  // Find next lesson to advance smoothly
  const currentIdx = course.lessons.findIndex((l) => l.id === activeLesson.id);
  const nextLesson = currentIdx < course.lessons.length - 1 ? course.lessons[currentIdx + 1] : null;

  const isCompleted = progress.completedLessons.includes(activeLesson.id);

  return (
    <div className="pb-16" id="lesson-viewer-workspace">
      {/* Upper Navigation Row */}
      <div className="flex items-center justify-between py-5 border-b border-[#141414]/15 mb-8">
        <button
          onClick={onBackToDashboard}
          className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-[#141414]/70 hover:text-[#141414] transition"
        >
          <ArrowLeft className="h-4 w-4 stroke-[1.5]" /> RETURN TO DASHBOARD
        </button>

        <div className="text-right">
          <p className="text-sm font-serif font-bold text-[#141414] truncate max-w-sm">
            {course.title}
          </p>
          <span className="text-[9px] font-mono uppercase tracking-widest text-[#141414]/50 mt-1 block">
            Workspace progress • {progress.overallProgressPercentage}% Complete
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        
        {/* Course Lesson Navigation Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-[#EBEBE6] border border-[#141414]/10 rounded-none p-5">
            <h3 className="text-[10px] font-mono text-[#141414]/50 uppercase tracking-widest mb-4 px-1 pb-1.5 border-b border-[#141414]/10">
              Syllabus Portions
            </h3>
            <div className="space-y-2">
              {course.lessons.map((lesson, idx) => {
                const isActive = lesson.id === activeLesson.id;
                const lessonProg = progress.lessonProgress[lesson.id];
                const lessonComplete = progress.completedLessons.includes(lesson.id);
                const lpScore = lessonProg?.quizScore;
                const isGradesDone = lessonProg?.quizTaken;

                return (
                  <button
                    key={lesson.id}
                    onClick={() => setActiveLessonId(lesson.id)}
                    className={`w-full text-left p-3.5 rounded-none transition-all flex gap-3 border ${
                      isActive 
                        ? "bg-[#141414] text-[#F5F5F0] border-[#141414] font-bold" 
                        : "bg-[#F5F5F0] hover:bg-[#EBEBE6]/50 text-[#141414]/80 border-[#141414]/5"
                    }`}
                  >
                    <div className="mt-0.5">
                      {lessonComplete ? (
                        <CheckCircle className={`h-4 w-4 ${isActive ? "text-emerald-400" : "text-emerald-700"}`} />
                      ) : (
                        <Circle className="h-4 w-4 text-[#141414]/30" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-xs font-serif ${isActive ? "text-white" : "text-[#141414]/95"}`}>
                        {idx + 1}. {lesson.title}
                      </p>
                      
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className={`text-[9px] font-mono uppercase tracking-wider ${isActive ? "text-[#EBEBE6]" : "text-[#141414]/40"}`}>
                          Duration: {lesson.duration}
                        </span>
                        {isGradesDone && (
                          <span className={`text-[8px] font-mono tracking-wider uppercase px-1.5 ${
                            isActive 
                              ? "bg-white/10 text-emerald-200" 
                              : "bg-[#141414]/5 text-emerald-850 border border-emerald-700/10"
                          }`}>
                            Score: {lpScore}/2
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="bg-[#EBEBE6] border border-[#141414]/10 rounded-none p-5 space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#141414] block">Grading Metric Info</span>
            <p className="text-[10px] text-[#141414]/60 leading-relaxed font-serif italic">
              Conclude each reading segment, then progress toward the Interactive quiz. A score of 2/2 records proficient mastery and releases associated credentials.
            </p>
          </div>
        </div>

        {/* Dynamic Lesson Context Window */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Header Segment of active lesson */}
          <div className="bg-[#EBEBE6] border border-[#141414]/10 rounded-none p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[9px] font-mono tracking-widest text-[#141414]/60 bg-[#141414]/5 px-2.5 py-1 uppercase border border-[#141414]/10">
                ACTIVE PORTFOLIO LESSON
              </span>
              <h2 className="text-xl sm:text-2.5xl font-serif font-extrabold tracking-tight text-[#141414] pt-2">
                {activeLesson.title}
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => onToggleLessonComplete(course.id, activeLesson.id)}
                className={`px-4 py-2 text-[10px] uppercase tracking-widest font-mono font-bold rounded-none border transition-all ${
                  isCompleted
                    ? "bg-transparent text-emerald-800 border-emerald-700/40"
                    : "bg-[#141414] hover:bg-opacity-95 text-[#F5F5F0] border-transparent"
                }`}
              >
                {isCompleted ? (
                  <span className="flex items-center gap-1.5">
                    <Check className="h-4 w-4" /> COMPLETED ✓
                  </span>
                ) : (
                  "MARK AS COMPLETED"
                )}
              </button>
            </div>
          </div>

          {/* Interactive tabs */}
          <div className="border-b border-[#141414]/15 flex space-x-1">
            {(["read", "quiz", "notes", "resources"] as const).map((tab) => {
              const tabLabels = {
                read: "Theory Material",
                quiz: "Interactive Quiz",
                notes: "Scholar Log",
                resources: "External references"
              };
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-3 text-[10px] uppercase tracking-[0.14em] font-bold transition-all border-b-2 -mb-[2px] ${
                    isActive
                      ? "border-[#141414] text-[#141414] font-extrabold"
                      : "border-transparent text-[#141414]/40 hover:text-[#141414]/80"
                  }`}
                >
                  {tabLabels[tab]}
                </button>
              );
            })}
          </div>

          {/* Tab contexts */}
          <div className="bg-[#EBEBE6] border border-[#141414]/10 rounded-none p-6 sm:p-10">
            
            {/* TAB: Read Lesson material */}
            {activeTab === "read" && (
              <div className="space-y-8">
                {/* Simulated Markdown parsing layout with beautiful spacing details */}
                <div className="prose max-w-none text-[#141414]/85 text-[14px] font-serif leading-relaxed space-y-6">
                  {activeLesson.content.split("\n\n").map((chunk, index) => {
                    if (chunk.trim().startsWith("###")) {
                      return (
                        <h3 key={index} className="text-lg font-serif font-bold tracking-tight text-[#141414] pt-4 pb-1 border-b border-[#141414]/10 flex items-center gap-2">
                          <Sparkles className="h-4 w-4 text-[#141414]/60" />
                          {chunk.replace("###", "").trim()}
                        </h3>
                      );
                    }
                    if (chunk.trim().startsWith("####")) {
                      return (
                        <h4 key={index} className="text-xs font-bold tracking-wider text-[#141414]/80 pt-2 font-mono uppercase">
                          {chunk.replace("####", "").trim()}
                        </h4>
                      );
                    }
                    if (chunk.trim().startsWith("*")) {
                      return (
                        <ul key={index} className="list-disc pl-5 my-3 space-y-2 bg-[#F5F5F0]/50 p-4 border border-[#141414]/5">
                          {chunk.split("\n").map((li, liIdx) => (
                            <li key={liIdx} className="text-xs font-serif text-[#141414]/75">
                              {li.replace("*", "").trim()}
                            </li>
                          ))}
                        </ul>
                      );
                    }
                    if (chunk.trim().startsWith("```")) {
                      const rawCode = chunk.replace(/```[a-z]*/, "").replace(/```$/, "").trim();
                      return (
                        <pre key={index} className="bg-[#141414] text-[#EBEBE6] p-5 rounded-none font-mono text-xs overflow-x-auto shadow-inner select-all leading-relaxed">
                          <code>{rawCode}</code>
                        </pre>
                      );
                    }
                    
                    return (
                      <p key={index} className="font-serif leading-relaxed text-[#141414]/75">
                        {chunk}
                      </p>
                    );
                  })}
                </div>

                {/* Progress actions bottom bar */}
                <div className="pt-6 border-t border-[#141414]/10 flex flex-wrap justify-between items-center gap-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onToggleLessonComplete(course.id, activeLesson.id)}
                      className={`px-5 py-2.5 text-[10px] uppercase font-mono tracking-widest font-bold border transition ${
                        isCompleted
                          ? "bg-transparent text-emerald-950 border-emerald-700/50"
                          : "bg-[#141414] text-[#F5F5F0] hover:bg-opacity-90 border-transparent"
                      }`}
                    >
                      {isCompleted ? "✓ Completed! Toggle Undone" : "Complete Lesson"}
                    </button>
                  </div>

                  {nextLesson ? (
                    <button
                      onClick={() => setActiveLessonId(nextLesson.id)}
                      className="px-4 py-2.5 bg-[#F5F5F0] hover:bg-[#141414]/5 text-[#141414] border border-[#141414]/15 text-[10px] font-mono uppercase tracking-widest font-semibold flex items-center gap-1.5 transition"
                    >
                      Next Lesson modules <ArrowRight className="h-4 w-4" />
                    </button>
                  ) : (
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-[#141414]/5 text-[#141414]/70 border border-[#141414]/15">
                      <Award className="h-4 w-4" />
                      <span className="text-[9px] font-mono font-bold uppercase tracking-widest">Syllabus Complete</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB: Lesson Interactive Quiz */}
            {activeTab === "quiz" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-serif font-bold text-[#141414] flex items-center gap-2">
                    <HelpCircle className="h-5 w-5 text-[#141414]/60" />
                    Interactive Review Quiz
                  </h3>
                  <p className="text-xs text-[#141414]/60 font-serif mt-1">
                    Select your responses carefully. Each input contributes directly to your scholar credentials metrics.
                  </p>
                </div>

                {!activeLesson.quiz || activeLesson.quiz.length === 0 ? (
                  <div className="p-10 border border-dashed border-[#141414]/20 rounded-none text-center">
                    <AlertCircle className="h-8 w-8 text-[#141414]/40 mx-auto mb-2" />
                    <p className="text-xs font-serif font-bold text-[#141414]">No Graded Quiz Required</p>
                    <p className="text-[11px] text-[#141414]/50 font-serif italic mt-1">This specific study module relies entirely on complete reading of theory guidelines.</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {activeLesson.quiz.map((q, qidx) => {
                      const isSelected = selectedAnswers[q.id] !== undefined;
                      const selectedIdx = selectedAnswers[q.id];
                      
                      return (
                        <div key={q.id} className="p-6 bg-[#F5F5F0] border border-[#141414]/10 rounded-none space-y-4">
                          <h4 className="text-sm font-serif font-bold text-[#141414] flex items-start gap-3">
                            <span className="bg-[#141414] text-[#F5F5F0] text-[10px] h-6 w-6 flex items-center justify-center font-mono font-bold">
                              {qidx + 1}
                            </span>
                            {q.question}
                          </h4>

                          <div className="grid grid-cols-1 gap-2.5 pt-1">
                            {q.options.map((opt, oidx) => {
                              const isThisChoice = selectedIdx === oidx;
                              
                              // Visual flags if submitted
                              let pillStyle = "bg-transparent text-[#141414]/80 border-[#141414]/15 hover:bg-[#141414]/5";
                              if (quizSubmitted) {
                                  if (oidx === q.correctAnswerIndex) {
                                    pillStyle = "bg-emerald-100 text-emerald-950 border-emerald-600/40 font-bold";
                                  } else if (isThisChoice) {
                                    pillStyle = "bg-rose-100/80 text-rose-950 border-rose-600/40";
                                  } else {
                                    pillStyle = "text-[#141414]/40 border-[#141414]/5 opacity-50";
                                  }
                              } else if (isThisChoice) {
                                pillStyle = "bg-[#141414] text-[#F5F5F0] border-[#141414]";
                              }

                              return (
                                <button
                                  key={oidx}
                                  onClick={() => handleAnswerSelect(q.id, oidx)}
                                  disabled={quizSubmitted}
                                  className={`w-full text-left p-3 text-xs border rounded-none transition font-sans ${pillStyle}`}
                                >
                                  {opt}
                                </button>
                              );
                            })}
                          </div>

                          {quizSubmitted && (
                            <div className="bg-[#EBEBE6] border border-[#141414]/10 p-4 rounded-none mt-2 text-[11px] leading-relaxed">
                              <span className="font-bold text-[#141414] uppercase tracking-widest font-mono text-[9px] block mb-1">Scholar Commentary</span>
                              <p className="text-[#141414]/75 font-serif italic">{q.explanation}</p>
                            </div>
                          )}
                        </div>
                      );
                    })}

                    {/* Submit Bar and summary score state */}
                    {!quizSubmitted ? (
                      <div className="pt-4 border-t border-[#141414]/10 flex justify-end">
                        <button
                          onClick={() => handleSubmitQuiz(activeLesson.quiz || [])}
                          disabled={Object.keys(selectedAnswers).length < (activeLesson.quiz?.length || 0)}
                          className="px-6 py-3 bg-[#141414] text-[#F5F5F0] rounded-none text-xs font-mono uppercase tracking-widest font-bold hover:bg-opacity-95 transition disabled:bg-[#141414]/10 disabled:text-[#141414]/30"
                        >
                          SUBMIT REVIEW PORTFOLIO
                        </button>
                      </div>
                    ) : (
                      <div className="p-6 bg-[#141414] text-[#F5F5F0] rounded-none flex flex-col sm:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-4">
                          <span className="text-3xl">🎯</span>
                          <div>
                            <span className="text-xs uppercase tracking-widest font-mono font-bold text-[#A59D84]">Grading Result Recieved</span>
                            <p className="text-sm font-serif italic mt-0.5">Evaluation Outcome: {quizScore} / {activeLesson.quiz.length} Correct Matches</p>
                          </div>
                        </div>

                        <div className="flex gap-3">
                          <button
                            onClick={() => {
                              setSelectedAnswers({});
                              setQuizSubmitted(false);
                              setQuizScore(0);
                            }}
                            className="px-4 py-2 bg-transparent text-[#F5F5F0] hover:bg-white/10 border border-[#F5F5F0]/30 rounded-none text-[10px] font-mono uppercase tracking-widest"
                          >
                            RE-EVALUATE
                          </button>
                          {nextLesson && (
                            <button
                              onClick={() => {
                                setActiveLessonId(nextLesson.id);
                              }}
                              className="px-4 py-2 bg-[#F5F5F0] hover:bg-opacity-90 text-[#141414] rounded-none text-[10px] font-mono uppercase tracking-widest font-bold"
                            >
                              NEXT LESSON
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* TAB: Smart study notes */}
            {activeTab === "notes" && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-serif font-bold text-[#141414] flex items-center gap-2">
                    <FileText className="h-5 w-5 text-[#141414]/60" />
                    Personal Scholar Log
                  </h3>
                  <p className="text-xs text-[#141414]/60 font-serif mt-1">
                    Compile private, self-summarized course takeaways. Keys and observations are cached inside the client database profile.
                  </p>
                </div>

                <textarea
                  value={typedNote}
                  onChange={(e) => setTypedNote(e.target.value)}
                  placeholder="Draft syllabus logs, formulations, citations, or instructions here..."
                  className="w-full h-72 p-4 bg-[#F5F5F0] border border-[#141414]/15 rounded-none text-xs focus:outline-none focus:border-[#141414] font-mono leading-relaxed"
                ></textarea>

                <div className="flex justify-between items-center">
                  <span className="text-[9px] font-mono uppercase tracking-widest text-[#141414]/40">
                    Character Count: {typedNote.length} • Auto-saving active
                  </span>

                  <button
                    onClick={handleSaveNote}
                    className="px-5 py-2.5 bg-[#141414] hover:bg-opacity-90 text-[#F5F5F0] rounded-none text-[10px] font-mono uppercase tracking-widest font-bold transition flex items-center gap-2"
                  >
                    <Save className="h-3.5 w-3.5" /> 
                    {noteSavedFeedback ? "SAVED!" : "SAVE LOG REFERENCE"}
                  </button>
                </div>
              </div>
            )}

            {/* TAB: Extra resources */}
            {activeTab === "resources" && (
              <div className="space-y-5">
                <div>
                  <h3 className="text-lg font-serif font-bold text-[#141414] flex items-center gap-2">
                    <Link className="h-5 w-5 text-[#141414]/60" />
                    Referred Reference Bibliography
                  </h3>
                  <p className="text-xs text-[#141414]/60 font-serif mt-1">
                    Explore recommended external publications, reference coordinates, and documentation for {course.title}.
                  </p>
                </div>

                {!activeLesson.resources || activeLesson.resources.length === 0 ? (
                  <div className="p-10 border border-dashed border-[#141414]/20 rounded-none text-center">
                    <AlertCircle className="h-8 w-8 text-[#141414]/40 mx-auto mb-2" />
                    <p className="text-xs font-serif font-bold text-[#141414]">No Bibliography pre-seeded</p>
                    <p className="text-[11px] text-[#141414]/50 font-serif italic mt-1">Consult custom study material or search online for additional instruction guides.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {activeLesson.resources.map((res, index) => (
                      <a
                        key={index}
                        href={res.url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-between p-4 bg-[#F5F5F0] hover:bg-[#141414]/5 border border-[#141414]/10 rounded-none transition"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xl">📚</span>
                          <div>
                            <p className="text-xs font-serif font-bold text-[#141414]">{res.name}</p>
                            <p className="text-[9px] font-mono text-[#141414]/40 truncate max-w-sm">{res.url}</p>
                          </div>
                        </div>
                        <ChevronRight className="h-4 w-4 text-[#141414]/40" />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
