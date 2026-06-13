import React, { useState } from "react";
import { 
  Search, 
  Clock, 
  MapPin, 
  User, 
  Star, 
  Check, 
  Plus, 
  Compass, 
  BookOpen, 
  X,
  Target,
  ArrowRight
} from "lucide-react";
import { Course, CourseProgress } from "../types";

interface CourseCatalogProps {
  courses: Course[];
  enrolledProgress: Record<string, CourseProgress>;
  onEnroll: (courseId: string) => void;
  onContinueCourse: (courseId: string) => void;
}

export default function CourseCatalog({
  courses,
  enrolledProgress,
  onEnroll,
  onContinueCourse
}: CourseCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const categories = ["All", "Development", "Design", "Business", "Science", "Custom"];

  // Filter courses
  const filteredCourses = courses.filter(course => {
    const matchesCategory = selectedCategory === "All" || course.category === selectedCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8 pb-16" id="catalog-view">
      {/* Search and Filters Header */}
      <div className="bg-[#EBEBE6] border border-[#141414]/10 rounded-none p-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-[#141414]/15">
          <div className="space-y-2">
            <h1 className="text-2xl font-serif font-extrabold text-[#141414] flex items-center gap-2">
              <Compass className="h-5.5 w-5.5 text-[#141414] stroke-[1.5]" />
              Academic Curriculum Catalog
            </h1>
            <p className="text-xs text-[#141414]/60 font-serif max-w-xl">
              Select an educational track to enroll. All courses include structured materials and grading benchmarks.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-3 h-4 w-4 text-[#141414]/40" />
            <input
              type="text"
              placeholder="Search curriculum..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-12 py-2.5 bg-[#F5F5F0] border border-[#141414]/15 rounded-none text-xs focus:outline-none focus:border-[#141414] transition font-mono uppercase tracking-wider"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-3 text-[10px] font-mono uppercase font-bold text-[#141414]/50 hover:text-[#141414]"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 pt-1">
          {categories.map((cat) => {
            const count = cat === "All" 
              ? courses.length 
              : courses.filter(c => c.category === cat).length;
            
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-[10px] font-mono uppercase tracking-widest transition-all border ${
                  isActive
                    ? "bg-[#141414] text-[#F5F5F0] border-[#141414] font-bold"
                    : "bg-[#F5F5F0] text-[#141414]/70 border-[#141414]/10 hover:bg-[#141414]/5 hover:text-[#141414]"
                }`}
              >
                {cat} <span className="ml-1 opacity-60">({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Course Grid */}
      {filteredCourses.length === 0 ? (
        <div className="border border-dashed border-[#141414]/20 rounded-none p-16 text-center space-y-4">
          <div className="text-[#141414]/40 h-10 w-10 flex items-center justify-center mx-auto">
            <Search className="h-8 w-8 stroke-[1.2]" />
          </div>
          <div>
            <p className="text-[#141414] font-serif font-bold text-lg">No curriculum paths found matching "{searchQuery}"</p>
            <p className="text-[#141414]/60 text-xs font-serif mt-1">Try resetting your filters or construct a custom training design.</p>
          </div>
          <button
            onClick={() => {
              setSelectedCategory("All");
              setSearchQuery("");
            }}
            className="px-4 py-2 bg-[#141414] text-[#F5F5F0] text-xs font-mono uppercase tracking-widest hover:bg-opacity-90"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => {
            const isEnrolled = enrolledProgress[course.id] !== undefined;
            const progress = isEnrolled ? enrolledProgress[course.id] : null;

            return (
              <div 
                key={course.id}
                className="bg-[#EBEBE6] border border-[#141414]/15 rounded-none overflow-hidden flex flex-col justify-between hover:border-[#141414]/35 transition-all duration-300"
              >
                {/* Visual Header card */}
                <div className="p-6 pb-0">
                  <div className="relative h-44 bg-[#141414] text-[#F5F5F0] rounded-none flex flex-col justify-between p-5">
                    <div className="flex justify-between items-start">
                      <span className="px-2.5 py-0.5 bg-transparent border border-[#F5F5F0]/20 text-[9px] font-bold font-mono uppercase tracking-wider">
                        {course.category}
                      </span>
                      <span className="px-2.5 py-0.5 bg-transparent border border-[#F5F5F0]/20 text-[9px] font-bold font-mono uppercase tracking-wider text-amber-300">
                        {course.difficulty}
                      </span>
                    </div>

                    <div>
                      <span className="text-2xl filter brightness-90 block mb-1">
                        {course.category === "Development" ? "💻" : course.category === "Science" ? "🔬" : "📚"}
                      </span>
                      <h4 className="font-serif font-bold text-white text-lg tracking-tight line-clamp-1">
                        {course.title}
                      </h4>
                    </div>
                  </div>
                </div>

                {/* Course Details */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-4">
                    <p className="text-[#141414]/75 text-xs font-serif leading-relaxed line-clamp-2">
                      {course.description}
                    </p>

                    <div className="flex items-center gap-4 text-[10px] font-mono text-[#141414]/50 uppercase tracking-wider pb-1">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3 stroke-[1.5]" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <BookOpen className="h-3 w-3 stroke-[1.5]" />
                        <span>{course.lessons.length} LESSONS</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 text-amber-700 fill-amber-700" />
                        <span className="font-bold text-[#141414]">{course.rating.toFixed(1)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#141414]/10 flex items-center justify-between gap-2">
                    <button
                      onClick={() => setSelectedCourse(course)}
                      className="px-4 py-2 bg-transparent hover:bg-[#141414]/5 text-[#141414]/70 hover:text-[#141414] text-[10px] font-mono uppercase tracking-widest border border-[#141414]/15 transition"
                    >
                      Syllabus
                    </button>

                    {isEnrolled ? (
                      <button
                        onClick={() => onContinueCourse(course.id)}
                        className="px-4 py-2 bg-transparent text-emerald-850 border border-emerald-700/30 text-[10px] font-mono uppercase tracking-widest flex items-center gap-1 font-bold"
                      >
                        <Check className="h-3.5 w-3.5" /> RESUME: {progress.overallProgressPercentage}%
                      </button>
                    ) : (
                      <button
                        onClick={() => onEnroll(course.id)}
                        className="px-4 py-2 bg-[#141414] text-[#F5F5F0] text-[10px] font-mono uppercase tracking-widest hover:bg-opacity-90 font-bold tracking-widest transition"
                      >
                        ENROLL PLAN
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Course Details Modal Dialog */}
      {selectedCourse && (
        <div className="fixed inset-0 bg-[#141414]/65 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-[#F5F5F0] rounded-none max-w-lg w-full overflow-hidden border border-[#141414]/20 flex flex-col max-h-[90vh] shadow-2xl">
            {/* Modal Header */}
            <div className="p-8 bg-[#141414] text-[#F5F5F0] flex justify-between items-start relative">
              <div className="relative z-10">
                <span className="px-2 py-0.5 border border-[#F5F5F0]/20 text-[9px] font-bold tracking-wider font-mono uppercase">
                  {selectedCourse.category} Syllabus
                </span>
                <h3 className="font-serif font-extrabold text-xl mt-3 tracking-tight">
                  {selectedCourse.title}
                </h3>
                <p className="text-[#F5F5F0]/70 text-[11px] font-mono uppercase tracking-widest mt-1">
                  Instructed by {selectedCourse.instructor}
                </p>
              </div>
              <button 
                onClick={() => setSelectedCourse(null)}
                className="text-[#F5F5F0]/70 hover:text-white p-1 rounded-none hover:bg-white/10 transition relative z-10"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Content Scroll Area */}
            <div className="p-8 overflow-y-auto space-y-6 flex-1">
              <div className="space-y-2">
                <h4 className="text-[10px] font-mono text-[#141414]/50 uppercase tracking-widest">Aims & Scope</h4>
                <p className="text-[#141414]/80 text-xs font-serif leading-relaxed">
                  {selectedCourse.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 bg-[#EBEBE6] p-4 border border-[#141414]/10">
                <div>
                  <span className="text-[9px] font-mono text-[#141414]/50 uppercase tracking-widest">Total Duration</span>
                  <p className="text-xs font-mono font-bold text-[#141414]">{selectedCourse.duration}</p>
                </div>
                <div>
                  <span className="text-[9px] font-mono text-[#141414]/50 uppercase tracking-widest">Curriculum Portion</span>
                  <p className="text-xs font-mono font-bold text-[#141414]">{selectedCourse.lessons.length} Modules</p>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-[10px] font-mono text-[#141414]/50 uppercase tracking-widest">Syllabus Outline</h4>
                <div className="space-y-3">
                  {selectedCourse.lessons.map((lesson, idx) => (
                    <div 
                      key={lesson.id}
                      className="flex items-center gap-4 p-4 bg-[#EBEBE6] border border-[#141414]/10 rounded-none hover:border-[#141414]/30 transition"
                    >
                      <span className="bg-[#141414] text-[#F5F5F0] font-mono text-xs h-6 w-6 flex items-center justify-center font-bold">
                        {idx + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-serif font-bold text-[#141414] truncate">{lesson.title}</p>
                        <p className="text-[10px] text-[#141414]/50 font-mono mt-0.5 uppercase tracking-wider">Estimated Time • {lesson.duration}</p>
                      </div>
                      {lesson.quiz && (
                        <span className="text-[8px] bg-[#141414]/5 border border-[#141414]/20 text-[#141414] font-mono uppercase font-bold tracking-wider px-2 py-0.5">
                          Grade Quiz
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="px-8 py-5 bg-[#EBEBE6] border-t border-[#141414]/10 flex items-center justify-end gap-3">
              <button
                onClick={() => setSelectedCourse(null)}
                className="px-4 py-2 text-[#141414]/60 hover:text-[#141414] text-[10px] font-mono uppercase tracking-widest transition"
              >
                Close Syllabus
              </button>

              {enrolledProgress[selectedCourse.id] !== undefined ? (
                <button
                  onClick={() => {
                    onContinueCourse(selectedCourse.id);
                    setSelectedCourse(null);
                  }}
                  className="px-5 py-2.5 bg-[#141414] text-[#F5F5F0] text-[10px] font-mono uppercase tracking-widest font-bold hover:bg-opacity-90 flex items-center gap-1.5"
                >
                  Continue study <ArrowRight className="h-3.5 w-3.5" />
                </button>
              ) : (
                <button
                  onClick={() => {
                    onEnroll(selectedCourse.id);
                    setSelectedCourse(null);
                  }}
                  className="px-5 py-2.5 bg-[#141414] text-[#F5F5F0] text-[10px] font-mono uppercase tracking-widest font-bold hover:bg-opacity-90 flex items-center gap-1.5"
                >
                  Enroll and study <ArrowRight className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
