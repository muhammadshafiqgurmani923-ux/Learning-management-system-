import React, { useState, useEffect } from "react";
import Navigation from "./components/Navigation";
import CourseCatalog from "./components/CourseCatalog";
import LessonViewer from "./components/LessonViewer";
import CourseCreator from "./components/CourseCreator";
import Dashboard from "./components/Dashboard"; // Original dashboard features

// Developer Specific Sections
import DeveloperHeader from "./components/DeveloperHeader";
import DeveloperFooter from "./components/DeveloperFooter";
import LoginView from "./components/LoginView";

// Role-Based Dashboards
import PrincipalDashboard from "./components/PrincipalDashboard";
import TeacherDashboard from "./components/TeacherDashboard";
import StudentDashboard from "./components/StudentDashboard";

import { INITIAL_COURSES } from "./data/courses";
import { Course, CourseProgress, LessonProgress } from "./types";
import { motion } from "motion/react";
import { Sparkles, GraduationCap } from "lucide-react";

// Multi-Role LMS Mock Data Structures and Initial values
import { 
  LMSStudent, 
  LMSTeacher, 
  LMSAttendanceRecord, 
  LMSExam, 
  LMSAssignment, 
  LMSMaterial, 
  LMSResult, 
  INITIAL_LMS_DATA 
} from "./data/lmsData";

export default function App() {
  // --- LEGACY CURRICULUM STATE ---
  const [courses, setCourses] = useState<Course[]>(() => {
    try {
      const stored = localStorage.getItem("edsphere_courses");
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error("Failed loading stored courses", e);
    }
    return INITIAL_COURSES;
  });

  const [enrolledProgress, setEnrolledProgress] = useState<Record<string, CourseProgress>>(() => {
    try {
      const stored = localStorage.getItem("edsphere_enrolled");
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error("Failed loading progress", e);
    }
    return {};
  });

  const [currentView, setCurrentView] = useState<"dashboard" | "catalog" | "create-course" | "lesson-viewer">("dashboard");
  const [activeCourseId, setActiveCourseId] = useState<string>(() => {
    return localStorage.getItem("edsphere_active_course_id") || "";
  });
  const [activeLessonId, setActiveLessonId] = useState<string>(() => {
    return localStorage.getItem("edsphere_active_lesson_id") || "";
  });

  const [savedNotes, setSavedNotes] = useState<Record<string, string>>(() => {
    try {
      const stored = localStorage.getItem("edsphere_notes");
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error("Failed loading study notes", e);
    }
    return {};
  });

  const [studyMinutes, setStudyMinutes] = useState<number>(() => {
    const val = localStorage.getItem("edsphere_study_minutes");
    return val ? parseInt(val) : 75;
  });

  const [streakDays, setStreakDays] = useState<number>(() => {
    const val = localStorage.getItem("edsphere_streak_days");
    return val ? parseInt(val) : 2;
  });

  // --- MULTI-ROLE LMS SYSTEM STATE ---
  const [activeRole, setActiveRole] = useState<"principal" | "teacher" | "student" | "login">(() => {
    const val = localStorage.getItem("lms_active_role");
    return (val as any) || "login";
  });

  const [lmsStudents, setLmsStudents] = useState<LMSStudent[]>(() => {
    try {
      const stored = localStorage.getItem("lms_students");
      if (stored) return JSON.parse(stored);
    } catch (_) {}
    return INITIAL_LMS_DATA.students;
  });

  const [lmsTeachers, setLmsTeachers] = useState<LMSTeacher[]>(() => {
    try {
      const stored = localStorage.getItem("lms_teachers");
      if (stored) return JSON.parse(stored);
    } catch (_) {}
    return INITIAL_LMS_DATA.teachers;
  });

  const [lmsPendingTeachers, setLmsPendingTeachers] = useState<LMSTeacher[]>(() => {
    try {
      const stored = localStorage.getItem("lms_pending_teachers");
      if (stored) return JSON.parse(stored);
    } catch (_) {}
    return INITIAL_LMS_DATA.pendingTeachers;
  });

  const [lmsAttendance, setLmsAttendance] = useState<LMSAttendanceRecord[]>(() => {
    try {
      const stored = localStorage.getItem("lms_attendance");
      if (stored) return JSON.parse(stored);
    } catch (_) {}
    return INITIAL_LMS_DATA.attendance;
  });

  const [lmsExams, setLmsExams] = useState<LMSExam[]>(() => {
    try {
      const stored = localStorage.getItem("lms_exams");
      if (stored) return JSON.parse(stored);
    } catch (_) {}
    return INITIAL_LMS_DATA.exams;
  });

  const [lmsAssignments, setLmsAssignments] = useState<LMSAssignment[]>(() => {
    try {
      const stored = localStorage.getItem("lms_assignments");
      if (stored) return JSON.parse(stored);
    } catch (_) {}
    return INITIAL_LMS_DATA.assignments;
  });

  const [lmsMaterials, setLmsMaterials] = useState<LMSMaterial[]>(() => {
    try {
      const stored = localStorage.getItem("lms_materials");
      if (stored) return JSON.parse(stored);
    } catch (_) {}
    return INITIAL_LMS_DATA.materials;
  });

  const [lmsResults, setLmsResults] = useState<LMSResult[]>(() => {
    try {
      const stored = localStorage.getItem("lms_results");
      if (stored) return JSON.parse(stored);
    } catch (_) {}
    return INITIAL_LMS_DATA.results;
  });

  // Global system notification messages
  const [celebrationMessage, setCelebrationMessage] = useState<string>("");

  // Sync state to LocalStorage
  useEffect(() => {
    localStorage.setItem("edsphere_courses", JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem("edsphere_enrolled", JSON.stringify(enrolledProgress));
  }, [enrolledProgress]);

  useEffect(() => {
    localStorage.setItem("edsphere_notes", JSON.stringify(savedNotes));
  }, [savedNotes]);

  useEffect(() => {
    localStorage.setItem("edsphere_active_course_id", activeCourseId);
  }, [activeCourseId]);

  useEffect(() => {
    localStorage.setItem("edsphere_active_lesson_id", activeLessonId);
  }, [activeLessonId]);

  useEffect(() => {
    localStorage.setItem("edsphere_study_minutes", studyMinutes.toString());
  }, [studyMinutes]);

  useEffect(() => {
    localStorage.setItem("edsphere_streak_days", streakDays.toString());
  }, [streakDays]);

  // Sync multi-role state
  useEffect(() => {
    localStorage.setItem("lms_active_role", activeRole);
  }, [activeRole]);

  useEffect(() => {
    localStorage.setItem("lms_students", JSON.stringify(lmsStudents));
  }, [lmsStudents]);

  useEffect(() => {
    localStorage.setItem("lms_teachers", JSON.stringify(lmsTeachers));
  }, [lmsTeachers]);

  useEffect(() => {
    localStorage.setItem("lms_pending_teachers", JSON.stringify(lmsPendingTeachers));
  }, [lmsPendingTeachers]);

  useEffect(() => {
    localStorage.setItem("lms_attendance", JSON.stringify(lmsAttendance));
  }, [lmsAttendance]);

  useEffect(() => {
    localStorage.setItem("lms_exams", JSON.stringify(lmsExams));
  }, [lmsExams]);

  useEffect(() => {
    localStorage.setItem("lms_assignments", JSON.stringify(lmsAssignments));
  }, [lmsAssignments]);

  useEffect(() => {
    localStorage.setItem("lms_materials", JSON.stringify(lmsMaterials));
  }, [lmsMaterials]);

  useEffect(() => {
    localStorage.setItem("lms_results", JSON.stringify(lmsResults));
  }, [lmsResults]);

  // --- ACTIONS HANDLERS MODULES ---

  // Principal actions
  const handleApproveTeacher = (id: number) => {
    const teach = lmsPendingTeachers.find(t => t.id === id);
    if (!teach) return;

    const approvedTeach: LMSTeacher = {
      ...teach,
      status: "approved",
      approvedBy: "Principal Dr. Smith",
      approvedDate: new Date().toISOString().split("T")[0]
    };

    setLmsPendingTeachers(lmsPendingTeachers.filter(t => t.id !== id));
    setLmsTeachers([...lmsTeachers, approvedTeach]);
    triggerCelebration(`Successfully approved Faculty: ${teach.name}`);
  };

  const handleRejectTeacher = (id: number) => {
    const teach = lmsPendingTeachers.find(t => t.id === id);
    if (!teach) return;
    setLmsPendingTeachers(lmsPendingTeachers.filter(t => t.id !== id));
    triggerCelebration(`Rejected Faculty registration: ${teach.name}`);
  };

  const handleAddStudent = (student: LMSStudent) => {
    setLmsStudents([...lmsStudents, student]);
    triggerCelebration(`Enrolled student ${student.name} with Roll Number ${student.rollNo}`);
  };

  // Teacher actions
  const handleAddAttendance = (record: LMSAttendanceRecord) => {
    setLmsAttendance([record, ...lmsAttendance]);
    triggerCelebration(`Attendance record locked for Grade ${record.className}`);
  };

  const handleAddExam = (exam: LMSExam) => {
    setLmsExams([exam, ...lmsExams]);
    triggerCelebration(`Examination schema created: ${exam.title}`);
  };

  const handleAddAssignment = (assign: LMSAssignment) => {
    setLmsAssignments([assign, ...lmsAssignments]);
    triggerCelebration(`Assignment assignment created: ${assign.title}`);
  };

  const handleAddMaterial = (material: LMSMaterial) => {
    setLmsMaterials([material, ...lmsMaterials]);
    triggerCelebration(`Study manual released: ${material.title}`);
  };

  const handleAddResult = (res: LMSResult) => {
    setLmsResults([res, ...lmsResults]);
    triggerCelebration(`Academic report filed: Score ${res.marksObtained}/${res.totalMarks}`);
  };

  // Student actions
  const handleUpdateAssignmentSubmission = (assignId: number, studentId: number, answerText: string) => {
    const updated = lmsAssignments.map(ass => {
      if (ass.id === assignId) {
        const studentName = lmsStudents.find(s => s.id === studentId)?.name || "Current Student";
        const submissionsList = ass.submissions ? [...ass.submissions] : [];
        const existingIdx = submissionsList.findIndex(sub => sub.studentId === studentId);

        const newSub = {
          studentId,
          studentName,
          answerText,
          grade: "Pending review",
          feedback: "Awaiting faculty remarks"
        };

        if (existingIdx > -1) {
          submissionsList[existingIdx] = newSub;
        } else {
          submissionsList.push(newSub);
        }

        return {
          ...ass,
          submittedCount: submissionsList.length,
          submissions: submissionsList
        };
      }
      return ass;
    });

    setLmsAssignments(updated);
    triggerCelebration(`Homework submission verified and uploaded.`);
  };

  // --- LEGACY CURRICULUM METHODS ---
  const handleEnrollCourse = (courseId: string) => {
    if (enrolledProgress[courseId]) {
      handleContinueCourse(courseId);
      return;
    }
    const course = courses.find((c) => c.id === courseId);
    if (!course) return;

    const initialLessonProgress: Record<string, LessonProgress> = {};
    course.lessons.forEach((les) => {
      initialLessonProgress[les.id] = {
        lessonId: les.id,
        completed: false,
        quizTaken: false
      };
    });

    const newProgress: CourseProgress = {
      courseId,
      enrolledAt: new Date().toISOString(),
      completedLessons: [],
      lessonProgress: initialLessonProgress,
      overallProgressPercentage: 0,
      lastAccessedAt: new Date().toISOString()
    };

    setEnrolledProgress({
      ...enrolledProgress,
      [courseId]: newProgress
    });

    setActiveCourseId(courseId);
    setActiveLessonId(course.lessons[0].id);
    setCurrentView("lesson-viewer");
    triggerCelebration(`Successfully enrolled in ${course.title}!`);
  };

  const handleContinueCourse = (courseId: string) => {
    const progress = enrolledProgress[courseId];
    const course = courses.find((c) => c.id === courseId);
    if (!progress || !course) return;

    const incompleteLesson = course.lessons.find(
      (les) => !progress.completedLessons.includes(les.id)
    );

    const targetLessonId = incompleteLesson ? incompleteLesson.id : course.lessons[0].id;

    setActiveCourseId(courseId);
    setActiveLessonId(targetLessonId);
    setCurrentView("lesson-viewer");
  };

  const handleToggleLessonComplete = (courseId: string, lessonId: string) => {
    const progress = enrolledProgress[courseId];
    const course = courses.find((c) => c.id === courseId);
    if (!progress || !course) return;

    const updatedCompleted = [...progress.completedLessons];
    const isNowComplete = !updatedCompleted.includes(lessonId);

    if (isNowComplete) {
      updatedCompleted.push(lessonId);
      setStudyMinutes((prev) => prev + 25);
    } else {
      const idx = updatedCompleted.indexOf(lessonId);
      if (idx > -1) updatedCompleted.splice(idx, 1);
    }

    const newOverallPct = Math.round((updatedCompleted.length / course.lessons.length) * 100);

    const updatedProg: CourseProgress = {
      ...progress,
      completedLessons: updatedCompleted,
      overallProgressPercentage: newOverallPct,
      lessonProgress: {
        ...progress.lessonProgress,
        [lessonId]: {
          ...progress.lessonProgress[lessonId],
          completed: isNowComplete
        }
      },
      lastAccessedAt: new Date().toISOString()
    };

    setEnrolledProgress({
      ...enrolledProgress,
      [courseId]: updatedProg
    });

    if (isNowComplete) {
      if (newOverallPct === 100) {
        triggerCelebration(`🎉 Core Curriculum Complete! You graduated from "${course.title}"!`);
      } else {
        triggerCelebration(`⭐ Lesson Done! Added 25 minutes study credit.`);
      }
    }
  };

  const handleSaveQuizScore = (courseId: string, lessonId: string, score: number) => {
    const progress = enrolledProgress[courseId];
    if (!progress) return;

    const updatedProg: CourseProgress = {
      ...progress,
      lessonProgress: {
        ...progress.lessonProgress,
        [lessonId]: {
          ...progress.lessonProgress[lessonId],
          quizScore: score,
          quizTaken: true
        }
      }
    };

    setEnrolledProgress({
      ...enrolledProgress,
      [courseId]: updatedProg
    });

    if (score === 2) {
      triggerCelebration("🔥 Perfect Score 2/2! Quiz Master badge unlocked!");
    } else {
      triggerCelebration(`Graded! Score ${score}/2 registered.`);
    }
  };

  const handleSaveLessonNote = (courseId: string, lessonId: string, text: string) => {
    const noteKey = `${courseId}-${lessonId}`;
    setSavedNotes({
      ...savedNotes,
      [noteKey]: text
    });
  };

  const handleAddCustomCourse = (newCourse: Course) => {
    setCourses([...courses, newCourse]);
    triggerCelebration("🛠️ New Custom Training Track Published!");
  };

  const handleSimulateStudy = () => {
    setStudyMinutes((prev) => prev + 30);
    setStreakDays((prev) => prev + 1);
    triggerCelebration("⏳ Simulated 30 Mins of study! Streak incremented!");
  };

  const triggerCelebration = (msg: string) => {
    setCelebrationMessage(msg);
    setTimeout(() => {
      setCelebrationMessage("");
    }, 4500);
  };

  const activeCourse = courses.find((c) => c.id === activeCourseId);
  const activeProgress = enrolledProgress[activeCourseId];

  const completedLessonsCount = (Object.values(enrolledProgress) as CourseProgress[]).reduce(
    (sum, prog) => sum + (prog?.completedLessons?.length || 0),
    0
  );

  return (
    <div className="min-h-screen bg-[#F5F5F0] flex flex-col font-sans selection:bg-[#141414] selection:text-[#F5F5F0]">
      
      {/* 1. Dynamic Persistent Brand Header Bar */}
      <Navigation
        currentView={currentView}
        setCurrentView={setCurrentView}
        completedLessonsCount={completedLessonsCount}
        activeCourseTitle={activeCourse?.title}
        hasActiveCourse={activeCourseId !== "" && enrolledProgress[activeCourseId] !== undefined}
        activeRole={activeRole}
        onSwitchRole={setActiveRole}
      />

      {/* 2. Top Custom Developer Professional Header Section */}
      <DeveloperHeader />

      {/* Floating alert/celebration popovers */}
      {celebrationMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce">
          <div className="bg-[#141414] border border-white/20 text-[#F5F5F0] rounded-none px-6 py-4 shadow-xl flex items-center gap-3">
            <Sparkles className="h-4.5 w-4.5 text-amber-400 shrink-0" />
            <span className="text-xs tracking-widest uppercase font-bold font-mono text-[10px]">{celebrationMessage}</span>
          </div>
        </div>
      )}

      {/* 3. Primary Page Canvas Body Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <motion.div
          key={`${activeRole}-${currentView}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* A. AUTHENTICATION LANDING BOX */}
          {activeRole === "login" && (
            <LoginView
              onLoginSuccess={(role) => {
                setActiveRole(role);
                setCurrentView("dashboard");
                triggerCelebration(`Access Granted! Welcome back.`);
              }}
            />
          )}

          {/* B. EXECUTIVE COMMAND: PRINCIPAL SUITE */}
          {activeRole === "principal" && (
            <PrincipalDashboard
              students={lmsStudents}
              teachers={lmsTeachers}
              pendingTeachers={lmsPendingTeachers}
              onApproveTeacher={handleApproveTeacher}
              onRejectTeacher={handleRejectTeacher}
              onAddStudent={handleAddStudent}
              classes={INITIAL_LMS_DATA.classes}
              attendance={lmsAttendance}
              exams={lmsExams}
              assignments={lmsAssignments}
              results={lmsResults}
            />
          )}

          {/* C. LESSON EVALUATIONS: TEACHER SUITE */}
          {activeRole === "teacher" && (
            <TeacherDashboard
              students={lmsStudents}
              teachers={lmsTeachers}
              attendance={lmsAttendance}
              onAddAttendance={handleAddAttendance}
              exams={lmsExams}
              onAddExam={handleAddExam}
              assignments={lmsAssignments}
              onAddAssignment={handleAddAssignment}
              materials={lmsMaterials}
              onAddMaterial={handleAddMaterial}
              results={lmsResults}
              onAddResult={handleAddResult}
            />
          )}

          {/* D. SCHOLAR PORTFOLIO: STUDENT DESK */}
          {activeRole === "student" && (
            <div>
              {/* Secondary Switch to view legacy educational paths */}
              <div className="mb-6 flex items-center justify-between p-4 bg-[#EBEBE6] border border-[#141414]/10">
                <p className="text-xs font-serif text-[#141414]/80">
                  ⚡ <strong>Student Integration Option:</strong> Toggle between the modern customized <strong>Nisab Academic Desk</strong> or interact with the classic <strong>Dynamic Course Study Platform</strong>!
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setCurrentView("dashboard")}
                    className={`px-3 py-1.5 text-[9px] font-mono uppercase tracking-widest transition-all ${
                      currentView === "dashboard" || currentView === "lesson-viewer"
                        ? "bg-[#141414] text-white font-bold"
                        : "bg-[#F5F5F0] text-[#141414]"
                    }`}
                  >
                    Academic Desk
                  </button>
                  <button
                    onClick={() => setCurrentView("catalog")}
                    className={`px-3 py-1.5 text-[9px] font-mono uppercase tracking-widest transition-all ${
                      currentView === "catalog" || currentView === "create-course"
                        ? "bg-[#141414] text-white font-bold"
                        : "bg-[#F5F5F0] text-[#141414]"
                    }`}
                  >
                    Curriculum Catalog
                  </button>
                </div>
              </div>

              {/* Toggle renders */}
              {currentView === "dashboard" ? (
                <StudentDashboard
                  students={lmsStudents}
                  exams={lmsExams}
                  onAddResult={handleAddResult}
                  assignments={lmsAssignments}
                  onUpdateAssignmentSubmission={handleUpdateAssignmentSubmission}
                  timetable={INITIAL_LMS_DATA.timetable}
                  materials={lmsMaterials}
                  results={lmsResults}
                />
              ) : currentView === "catalog" ? (
                <CourseCatalog
                  courses={courses}
                  enrolledProgress={enrolledProgress}
                  onEnroll={handleEnrollCourse}
                  onContinueCourse={handleContinueCourse}
                />
              ) : currentView === "create-course" ? (
                <CourseCreator
                  onAddCourse={handleAddCustomCourse}
                  setCurrentView={setCurrentView}
                />
              ) : (
                activeCourse && activeProgress && (
                  <LessonViewer
                    course={activeCourse}
                    progress={activeProgress}
                    activeLessonId={activeLessonId}
                    setActiveLessonId={setActiveLessonId}
                    onToggleLessonComplete={handleToggleLessonComplete}
                    onSaveQuizScore={handleSaveQuizScore}
                    onSaveLessonNote={handleSaveLessonNote}
                    savedNotes={savedNotes}
                    onBackToDashboard={() => setCurrentView("dashboard")}
                  />
                )
              )}
            </div>
          )}
        </motion.div>
      </main>

      {/* 4. Beautiful Branded Custom Footer Section */}
      <DeveloperFooter />

    </div>
  );
}
