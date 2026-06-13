import React from "react";
import { 
  Trophy, 
  Hourglass, 
  CheckCircle, 
  Flame, 
  BookOpen, 
  ArrowRight,
  BookOpenCheck,
  ChevronRight,
  Plus
} from "lucide-react";
import { Course, CourseProgress, Badge } from "../types";
import { motion } from "motion/react";

interface DashboardProps {
  courses: Course[];
  enrolledProgress: Record<string, CourseProgress>;
  studyMinutes: number;
  onSimulateStudy: () => void;
  streakDays: number;
  onContinueCourse: (courseId: string) => void;
  setCurrentView: (view: "dashboard" | "catalog" | "create-course" | "lesson-viewer") => void;
}

export default function Dashboard({
  courses,
  enrolledProgress,
  studyMinutes,
  onSimulateStudy,
  streakDays,
  onContinueCourse,
  setCurrentView
}: DashboardProps) {
  
  // Calculate analytics
  const enrolledCoursesList = Object.keys(enrolledProgress).map(id => {
    return {
      course: courses.find(c => c.id === id),
      progress: enrolledProgress[id]
    };
  }).filter(item => item.course !== undefined) as { course: Course; progress: CourseProgress }[];

  const totalLessonsInEnrolled = enrolledCoursesList.reduce((sum, item) => sum + item.course.lessons.length, 0);
  const totalCompletedLessons = enrolledCoursesList.reduce((sum, item) => sum + item.progress.completedLessons.length, 0);
  
  const completedCoursesCount = enrolledCoursesList.filter(
    item => item.progress.overallProgressPercentage === 100
  ).length;

  const ALL_BADGES: { id: string; title: string; description: string; cond: boolean; icon: string; color: string }[] = [
    {
      id: "b1",
      title: "First Step",
      description: "Enrolled in your first course on EdSphere",
      cond: enrolledCoursesList.length > 0,
      icon: "🎓",
      color: "bg-[#EBEBE6] border-[#141414]/15 text-[#141414]"
    },
    {
      id: "b2",
      title: "Academic Devotee",
      description: "Completed 2 or more detailed lessons",
      cond: totalCompletedLessons >= 2,
      icon: "📚",
      color: "bg-[#EBEBE6] border-[#141414]/15 text-[#141414]"
    },
    {
      id: "b3",
      title: "Perfect Score",
      description: "Scored 100% on any interactive lesson quiz",
      cond: Object.values(enrolledProgress).some(prog => 
        Object.values(prog.lessonProgress).some(lp => lp.quizTaken && lp.quizScore !== undefined && lp.quizScore === 2)
      ),
      icon: "🎯",
      color: "bg-[#EBEBE6] border-[#141414]/15 text-[#141414]"
    },
    {
      id: "b4",
      title: "Course Architect",
      description: "Formulated a custom learning track via Course Creator",
      cond: courses.some(c => c.category === "Custom"),
      icon: "🛠️",
      color: "bg-[#EBEBE6] border-[#141414]/15 text-[#141414]"
    }
  ];

  const unlockedBadges = ALL_BADGES.filter(b => b.cond);
  const lockedBadges = ALL_BADGES.filter(b => !b.cond);

  const formattedHours = (studyMinutes / 60).toFixed(1);

  return (
    <div className="space-y-12 pb-16" id="dashboard-view">
      {/* Editorial Welcome Header Banner */}
      <div className="bg-[#141414] text-[#F5F5F0] rounded-none p-8 sm:p-12 relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-6">
          <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#A59D84] border-b border-[#A59D84]/30 pb-1.5 inline-block">
            Student Portal • System Administration
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-extrabold tracking-tight text-[#F5F5F0] leading-tight">
            Assalam-o-Alaikum, <br className="sm:hidden" />
            <span className="italic font-normal">Scholar</span> Shafiq
          </h1>
          <p className="text-[#F5F5F0]/80 text-sm sm:text-base leading-relaxed max-w-2xl font-serif">
            Welcome back to Nisab Learning. Your course catalog progress, lesson schedules, performance analytics, and custom educational plans are synchronized. Review your study milestones below.
          </p>

          <div className="pt-4 flex flex-wrap gap-4">
            <button
              onClick={() => setCurrentView("catalog")}
              className="px-6 py-3 bg-[#F5F5F0] text-[#141414] hover:bg-opacity-90 font-mono text-xs uppercase tracking-widest font-bold transition duration-200"
            >
              Curriculum Catalog
            </button>
            <button
              onClick={onSimulateStudy}
              className="px-6 py-3 bg-transparent text-[#F5F5F0] hover:bg-[#F5F5F0]/10 font-mono text-xs uppercase tracking-widest border border-[#F5F5F0]/30 transition duration-200 flex items-center gap-2"
            >
              <Hourglass className="h-3.5 w-3.5 text-amber-300" />
              Log Study Interval
            </button>
          </div>
        </div>
      </div>

      {/* Analytics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-[#141414]/10 border border-[#141414]/10">
        {/* Stat 1: Study Time */}
        <div className="bg-[#EBEBE6] p-6 flex flex-col justify-between">
          <span className="text-[9px] font-mono text-[#141414]/50 uppercase tracking-widest block">Study Hours</span>
          <div className="mt-4">
            <span className="text-3xl sm:text-4xl font-light font-mono text-[#141414]">{formattedHours}</span>
            <span className="text-[10px] text-[#141414]/60 block mt-1">accumulated reading time</span>
          </div>
        </div>

        {/* Stat 2: Enrolled Courses */}
        <div className="bg-[#EBEBE6] p-6 flex flex-col justify-between">
          <span className="text-[9px] font-mono text-[#141414]/50 uppercase tracking-widest block">Courses Active</span>
          <div className="mt-4">
            <span className="text-3xl sm:text-4xl font-light font-mono text-[#141414]">{enrolledCoursesList.length}</span>
            <span className="text-[10px] text-[#141414]/60 block mt-1">active study plans</span>
          </div>
        </div>

        {/* Stat 3: Lessons Completed */}
        <div className="bg-[#EBEBE6] p-6 flex flex-col justify-between">
          <span className="text-[9px] font-mono text-[#141414]/50 uppercase tracking-widest block">Lessons Completed</span>
          <div className="mt-4">
            <span className="text-3xl sm:text-4xl font-light font-mono text-[#141414]">{totalCompletedLessons}</span>
            <span className="text-[10px] text-[#141414]/60 block mt-1">out of {totalLessonsInEnrolled || 0} enrolled</span>
          </div>
        </div>

        {/* Stat 4: Streak Days */}
        <div className="bg-[#EBEBE6] p-6 flex flex-col justify-between">
          <span className="text-[9px] font-mono text-[#141414]/50 uppercase tracking-widest block">Daily Streak</span>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-light font-mono text-[#141414]">{streakDays}</span>
            <span className="text-xs font-serif italic text-amber-800">Days</span>
          </div>
          <span className="text-[10px] text-[#141414]/60 block mt-1">unbroken retention streak</span>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Left Columns: Enrolled Courses */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-baseline border-b border-[#141414] pb-4">
            <h2 className="text-xl font-serif font-bold text-[#141414] flex items-center gap-2.5">
              <BookOpenCheck className="h-5 w-5 text-[#141414] stroke-[1.5]" />
              Enrolled Learning Tracks
            </h2>
            <button 
              onClick={() => setCurrentView("catalog")}
              className="text-[10px] font-mono uppercase tracking-widest text-[#141414] hover:underline flex items-center gap-1"
            >
              All tracks <ChevronRight className="h-3 w-3" />
            </button>
          </div>

          {enrolledCoursesList.length === 0 ? (
            <div className="border border-dashed border-[#141414]/20 rounded-none p-12 text-center space-y-6">
              <div className="text-[#141414]/40 h-10 w-10 flex items-center justify-center mx-auto">
                <BookOpen className="h-8 w-8 stroke-[1.2]" />
              </div>
              <div className="space-y-1">
                <p className="text-[#141414] font-serif font-bold text-lg">No Active Curriculum portfolios found</p>
                <p className="text-[#141414]/60 text-xs font-serif">Enroll in academic study tracks from the Curriculum catalog to begin.</p>
              </div>
              <button
                onClick={() => setCurrentView("catalog")}
                className="px-5 py-2.5 bg-[#141414] text-[#F5F5F0] text-xs font-mono uppercase tracking-widest hover:bg-opacity-90 transition"
              >
                Browse Our Curriculum
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {enrolledCoursesList.map(({ course, progress }) => {
                const completePct = progress.overallProgressPercentage;
                return (
                  <div 
                    key={course.id}
                    className="bg-[#EBEBE6] border border-[#141414]/10 rounded-none p-6 hover:border-[#141414]/30 transition duration-300 flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex justify-between items-start">
                        <span className="px-2 py-0.5 bg-[#141414]/5 text-[9px] font-bold font-mono text-[#141414]/60 uppercase tracking-wider border border-[#141414]/10">
                          {course.category}
                        </span>
                        <span className="text-[10px] font-bold font-mono text-[#141414]/80">
                          {completePct}% Complete
                        </span>
                      </div>
                      <h3 className="font-serif font-bold text-[#141414] text-lg mt-3 group-hover:underline line-clamp-1">
                        {course.title}
                      </h3>
                      <p className="text-[#141414]/60 text-xs font-serif italic mt-1">
                        Instructor: {course.instructor}
                      </p>

                      {/* Editorial Progress bar (flat outline structure) */}
                      <div className="w-full bg-[#141414]/10 h-1.5 rounded-none mt-5 overflow-hidden">
                        <div 
                          className="bg-[#141414] h-full transition-all duration-500"
                          style={{ width: `${completePct}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-[#141414]/10 flex items-center justify-between">
                      <span className="text-[10px] font-mono text-[#141414]/50">
                        {progress.completedLessons.length} / {course.lessons.length} lessons read
                      </span>
                      <button
                        onClick={() => onContinueCourse(course.id)}
                        className="px-3 py-1.5 bg-[#141414] text-[#F5F5F0] hover:bg-opacity-90 text-[10px] font-mono uppercase tracking-widest transition flex items-center gap-1"
                      >
                        study <ArrowRight className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Column: Achievements and Badges */}
        <div className="space-y-6">
          <div className="border-b border-[#141414] pb-4">
            <h2 className="text-xl font-serif font-bold text-[#141414] flex items-center gap-2.5">
              <Trophy className="h-5 w-5 text-[#141414] stroke-[1.5]" />
              Scholar's Credentials
            </h2>
          </div>

          <div className="bg-[#EBEBE6] border border-[#141414]/10 rounded-none p-6 space-y-5">
            <div className="flex justify-between text-xs font-semibold pb-2 border-b border-[#141414]/15">
              <span className="text-[#141414]/60 uppercase tracking-widest font-mono text-[10px]">Academic Badges</span>
              <span className="text-[#141414] font-mono">{unlockedBadges.length} / {ALL_BADGES.length}</span>
            </div>

            <div className="space-y-4">
              {/* Unlocked Badges */}
              {unlockedBadges.map(badge => (
                <div 
                  key={badge.id}
                  className="flex items-center gap-4 p-4 bg-[#F5F5F0] border border-[#141414]/10 rounded-none transition"
                >
                  <span className="text-2xl filter drop-shadow">{badge.icon}</span>
                  <div className="flex-1">
                    <p className="text-xs font-bold text-[#141414] font-serif leading-none">{badge.title}</p>
                    <p className="text-[10px] text-[#141414]/60 font-serif leading-relaxed mt-1">{badge.description}</p>
                  </div>
                  <span className="text-[8px] bg-[#141414] text-[#F5F5F0] font-mono uppercase font-bold tracking-wider px-2 py-0.5">
                    Acquired
                  </span>
                </div>
              ))}

              {/* Locked Badges */}
              {lockedBadges.map(badge => (
                <div 
                  key={badge.id}
                  className="flex items-center gap-4 p-4 bg-transparent border border-dashed border-[#141414]/15 rounded-none opacity-60"
                >
                  <span className="text-2xl filter grayscale">🔒</span>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-[#141414]/70 font-serif leading-none">{badge.title}</p>
                    <p className="text-[10px] text-[#141414]/50 font-serif leading-relaxed mt-1">{badge.description}</p>
                  </div>
                  <span className="text-[8px] border border-[#141414]/20 text-[#141414]/50 font-mono uppercase tracking-wider px-2 py-0.5 font-bold">
                    Pending
                  </span>
                </div>
              ))}
            </div>
            
            <p className="text-[10px] font-serif text-[#141414]/50 text-center leading-relaxed pt-2 border-t border-[#141414]/10 italic">
              Conclude lessons, complete rigorous review quizzes, and formulate educational tracks to broaden your spectrum of credentials.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
