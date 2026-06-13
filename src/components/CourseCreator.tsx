import React, { useState } from "react";
import { 
  Plus, 
  Trash2, 
  BookOpen, 
  PlusCircle, 
  CheckCircle,
  HelpCircle,
  AlertCircle,
  Info
} from "lucide-react";
import { Course, Lesson, QuizQuestion } from "../types";

interface CourseCreatorProps {
  onAddCourse: (newCourse: Course) => void;
  setCurrentView: (view: "dashboard" | "catalog" | "create-course" | "lesson-viewer") => void;
}

export default function CourseCreator({ onAddCourse, setCurrentView }: CourseCreatorProps) {
  // General Fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<"Development" | "Design" | "Business" | "Science" | "Custom">("Custom");
  const [difficulty, setDifficulty] = useState<"Beginner" | "Intermediate" | "Advanced">("Beginner");
  const [instructor, setInstructor] = useState("Muhammad Shafiq Gurmani");
  const [duration, setDuration] = useState("3 Hours");

  // Lesson state inside form
  const [lessons, setLessons] = useState<Partial<Lesson>[]>([
    {
      id: "l-temp-1",
      title: "First introductory module",
      duration: "30 Mins",
      content: "### Learning Targets\n\nWelcome to your course! Add standard learning guidelines in this textarea.",
      resources: [],
      quiz: [
        {
          id: "q-temp-1",
          question: "An introductory question?",
          options: ["First Choice Option", "Second Choice Option"],
          correctAnswerIndex: 0,
          explanation: "Add explanation guidelines here."
        }
      ]
    }
  ]);

  const [validationError, setValidationError] = useState<string>("");
  const [successMsg, setSuccessMsg] = useState<boolean>(false);

  const handleAddLesson = () => {
    const tempId = `l-temp-${Date.now()}`;
    setLessons([
      ...lessons,
      {
        id: tempId,
        title: "",
        duration: "20 Mins",
        content: "### New Chapter\n\nEnter theory paragraphs here...",
        resources: [],
        quiz: [
          {
            id: `q-temp-${Date.now()}`,
            question: "Question context?",
            options: ["Option A", "Option B"],
            correctAnswerIndex: 0,
            explanation: "Rationale goes here."
          }
        ]
      }
    ]);
  };

  const handleRemoveLesson = (index: number) => {
    if (lessons.length <= 1) {
      setValidationError("A course must contain at least one instructional lesson.");
      return;
    }
    const updated = [...lessons];
    updated.splice(index, 1);
    setLessons(updated);
  };

  const handleLessonChange = (index: number, field: keyof Lesson, value: any) => {
    const updated = [...lessons];
    updated[index] = {
      ...updated[index],
      [field]: value
    };
    setLessons(updated);
  };

  const handleQuizChange = (lessonIndex: number, quizIndex: number, field: keyof QuizQuestion, value: any) => {
    const updated = [...lessons];
    const quizList = [...(updated[lessonIndex].quiz || [])];
    
    quizList[quizIndex] = {
      ...quizList[quizIndex],
      [field]: value
    } as QuizQuestion;

    updated[lessonIndex] = {
      ...updated[lessonIndex],
      quiz: quizList
    };
    setLessons(updated);
  };

  const handleQuizOptionChange = (lessonIndex: number, quizIndex: number, optionIdxForCode: number, value: string) => {
    const updated = [...lessons];
    const quizList = [...(updated[lessonIndex].quiz || [])];
    const currentQuiz = quizList[quizIndex];
    if (!currentQuiz) return;

    const optList = [...currentQuiz.options];
    optList[optionIdxForCode] = value;

    quizList[quizIndex] = {
      ...currentQuiz,
      options: optList
    };

    updated[lessonIndex] = {
      ...updated[lessonIndex],
      quiz: quizList
    };
    setLessons(updated);
  };

  const handleSubmitCourse = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError("");

    // Validate overall fields
    if (!title.trim() || !description.trim() || !instructor.trim()) {
      setValidationError("Please fill out all required general metrics (Title, Description, Instructor).");
      return;
    }

    // Validate lesson fields
    for (let i = 0; i < lessons.length; i++) {
      const les = lessons[i];
      if (!les.title?.trim() || !les.content?.trim()) {
        setValidationError(`Lesson #${i + 1} requires a valid Title and text content.`);
        return;
      }
      if (les.quiz) {
        for (let j = 0; j < les.quiz.length; j++) {
          const q = les.quiz[j];
          if (!q.question.trim() || q.options.some(o => !o.trim())) {
            setValidationError(`Lesson #${i + 1} Quiz question #${j + 1} requires a non-empty question text and full non-empty choices.`);
            return;
          }
        }
      }
    }

    const compiledCourse: Course = {
      id: `custom-course-${Date.now()}`,
      title,
      description,
      category,
      difficulty,
      instructor,
      duration,
      rating: 5.0, // Pre-graded first score
      lessons: lessons as Lesson[]
    };

    onAddCourse(compiledCourse);
    setSuccessMsg(true);

    // Reset formulation states
    setTitle("");
    setDescription("");
    setInstructor("");
    setLessons([
      {
        id: "l-temp-1",
        title: "Introduction",
        duration: "30 Mins",
        content: "### General targets...",
        resources: [],
        quiz: [
          {
            id: "q-temp-1",
            question: "First test query?",
            options: ["Check 1", "Check 2"],
            correctAnswerIndex: 0,
            explanation: "Rationale text."
          }
        ]
      }
    ]);

    setTimeout(() => {
      setSuccessMsg(false);
      setCurrentView("catalog"); // Route to catalog automatically!
    }, 2800);
  };

  return (
    <div className="space-y-8 pb-16" id="course-creator-panel">
      {/* Visual Header */}
      <div className="bg-[#EBEBE6] border border-[#141414]/10 rounded-none p-8">
        <h1 className="text-2xl font-serif font-extrabold text-[#141414] flex items-center gap-2">
          <PlusCircle className="h-5.5 w-5.5 text-[#141414]" />
          Curriculum Design & Publication
        </h1>
        <p className="text-xs text-[#141414]/60 font-serif mt-1 max-w-xl">
          Construct custom educational tracks, seed syllabus reading material, and design multiple-choice validation benchmarks.
        </p>
      </div>

      {successMsg && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-950 p-5 rounded-none flex items-center gap-4">
          <CheckCircle className="h-6 w-6 text-emerald-700 shrink-0" />
          <div>
            <p className="text-xs font-mono uppercase tracking-widest font-bold leading-none">Curriculum Drafted Successfully</p>
            <p className="text-[11px] text-emerald-800 font-serif mt-1">Course metadata listed inside active Catalog. Redirecting soon...</p>
          </div>
        </div>
      )}

      {validationError && (
        <div className="bg-rose-50 border border-rose-300 text-rose-950 p-5 rounded-none flex items-center gap-4">
          <AlertCircle className="h-6 w-6 text-rose-700 shrink-0" />
          <span className="text-xs font-mono uppercase tracking-wider font-bold">{validationError}</span>
        </div>
      )}

      <form onSubmit={handleSubmitCourse} className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Left Section: Course Metadata Setup */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-[#EBEBE6] border border-[#141414]/10 rounded-none p-6 space-y-5">
            <h3 className="text-[10px] font-mono uppercase tracking-widest text-[#141414]/50 pb-2 border-b border-[#141414]/10">
              General Metadata
            </h3>

            {/* Course Title input */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono uppercase tracking-widest text-[#141414]/60 block font-bold">Course Title *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Advanced Python Programming"
                className="w-full px-3.5 py-2.5 bg-[#F5F5F0] border border-[#141414]/15 rounded-none text-xs focus:outline-none focus:border-[#141414] font-serif"
                required
              />
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono uppercase tracking-widest text-[#141414]/60 block font-bold">Short Summary *</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Briefly state target demographics, goals, skill benefits..."
                className="w-full h-32 px-3.5 py-2.5 bg-[#F5F5F0] border border-[#141414]/15 rounded-none text-xs focus:outline-none focus:border-[#141414] leading-relaxed font-serif"
                required
              ></textarea>
            </div>

            {/* Instructor Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase tracking-widest text-[#141414]/60 block font-bold">Instructor *</label>
                <input
                  type="text"
                  value={instructor}
                  onChange={(e) => setInstructor(e.target.value)}
                  placeholder="Muhammad Shafiq Gurmani"
                  className="w-full px-3 py-2 bg-[#F5F5F0] border border-[#141414]/15 rounded-none text-xs focus:outline-none focus:border-[#141414] font-serif"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase tracking-widest text-[#141414]/60 block font-bold">Planned Hours *</label>
                <input
                  type="text"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="e.g. 5 Hours"
                  className="w-full px-3 py-2 bg-[#F5F5F0] border border-[#141414]/15 rounded-none text-xs focus:outline-none focus:border-[#141414] font-serif"
                  required
                />
              </div>
            </div>

            {/* Difficulty and Category selectors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase tracking-widest text-[#141414]/60 block font-bold">Category *</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full px-3 py-2 bg-[#F5F5F0] border border-[#141414]/15 rounded-none text-xs focus:outline-none focus:border-[#141414] font-mono uppercase tracking-wider"
                >
                  <option value="Custom">Custom Track</option>
                  <option value="Development">Development</option>
                  <option value="Design">Design</option>
                  <option value="Business">Business</option>
                  <option value="Science">Science</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase tracking-widest text-[#141414]/60 block font-bold">Difficulty *</label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value as any)}
                  className="w-full px-3 py-2 bg-[#F5F5F0] border border-[#141414]/15 rounded-none text-xs focus:outline-none focus:border-[#141414] font-mono uppercase tracking-wider"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
            </div>

            <div className="p-4 bg-[#F5F5F0] border border-[#141414]/10 rounded-none flex items-start gap-2.5 text-[10px] text-[#141414]/60 leading-normal font-mono uppercase tracking-wider">
              <Info className="h-4.5 w-4.5 text-[#141414]/70 shrink-0 mt-0.5" />
              <span>
                All created tracks are pre-assigned a perfect 5.0 initial score. Users can enroll immediately upon publishing.
              </span>
            </div>
          </div>
        </div>

        {/* Right Section: Add Lessons & Quizzes */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-center pb-2 border-b border-[#141414]/15">
            <h3 className="text-base font-serif font-bold text-[#141414] flex items-center gap-2">
              <BookOpen className="h-4.5 w-4.5 text-[#141414]/70" />
              Syllabus Modules ({lessons.length})
            </h3>
            <button
              type="button"
              onClick={handleAddLesson}
              className="px-4 py-2 bg-[#141414] hover:bg-opacity-90 text-[#F5F5F0] text-[10px] font-mono uppercase tracking-widest font-bold transition flex items-center gap-1.5"
            >
              <Plus className="h-3.5 w-3.5" /> ADD LESSON PORTION
            </button>
          </div>

          <div className="space-y-6">
            {lessons.map((lesson, idx) => (
              <div 
                key={lesson.id}
                className="bg-[#EBEBE6] border border-[#141414]/10 rounded-none p-6 sm:p-8 space-y-5 relative"
              >
                {/* Delete button wrapper */}
                <div className="flex justify-between items-center pb-3 border-b border-[#141414]/10">
                  <span className="text-[9px] font-mono uppercase tracking-widest text-[#141414]/60 bg-[#141414]/5 px-3 py-1 border border-[#141414]/10 font-bold">
                    Lesson MODULE {idx + 1}
                  </span>
                  
                  <button
                    type="button"
                    onClick={() => handleRemoveLesson(idx)}
                    className="p-1 text-[#141414]/50 hover:text-rose-705 transition"
                    title="Remove lesson module"
                  >
                    <Trash2 className="h-4.5 w-4.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2 space-y-1.5">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-[#141414]/60 font-bold">Lesson Title *</label>
                    <input
                      type="text"
                      value={lesson.title || ""}
                      onChange={(e) => handleLessonChange(idx, "title", e.target.value)}
                      placeholder="e.g. Chapter 1: Basic concepts"
                      className="w-full px-3 py-2 bg-[#F5F5F0] border border-[#141414]/15 rounded-none text-xs focus:outline-none focus:border-[#141414] font-serif font-bold"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-[#141414]/60 font-bold">Section Duration *</label>
                    <input
                      type="text"
                      value={lesson.duration || ""}
                      onChange={(e) => handleLessonChange(idx, "duration", e.target.value)}
                      placeholder="e.g. 20 Mins"
                      className="w-full px-3 py-2 bg-[#F5F5F0] border border-[#141414]/15 rounded-none text-xs focus:outline-none focus:border-[#141414] font-mono"
                      required
                    />
                  </div>
                </div>

                {/* Content text */}
                <div className="space-y-1.5 font-serif">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-[#141414]/60 block font-bold">Lesson Textbook Content (Markdown-capable) *</label>
                  <span className="text-[9px] text-[#141414]/50 block -mt-1 font-sans italic">Use ### header blocks and * bullet points to structure your writing.</span>
                  <textarea
                    value={lesson.content || ""}
                    onChange={(e) => handleLessonChange(idx, "content", e.target.value)}
                    placeholder="### Chapter Goals..."
                    className="w-full h-52 px-3.5 py-2.5 bg-[#F5F5F0] border border-[#141414]/15 rounded-none text-xs focus:outline-none focus:border-[#141414] font-mono leading-relaxed"
                    required
                  ></textarea>
                </div>

                {/* Lesson graded quiz generator */}
                <div className="border border-[#141414]/10 rounded-none p-5 bg-[#F5F5F0] space-y-4">
                  <div className="flex items-center gap-1.5">
                    <HelpCircle className="h-4 w-4 text-[#141414]/75" />
                    <span className="text-[9px] font-extrabold uppercase font-mono tracking-widest text-[#141414]/70">Graded Quiz Configurations</span>
                  </div>

                  {lesson.quiz && lesson.quiz.map((q, quizIdx) => (
                    <div key={q.id} className="space-y-3">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono uppercase tracking-widest text-[#141414]/40 font-bold">Quiz Question Text *</label>
                        <input
                          type="text"
                          value={q.question}
                          onChange={(e) => handleQuizChange(idx, quizIdx, "question", e.target.value)}
                          placeholder="e.g. Which keyword defines a React hooks rule?"
                          className="w-full px-3.5 py-2 bg-[#EBEBE6] border border-[#141414]/15 rounded-none text-xs focus:outline-none focus:border-[#141414] font-serif"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-mono uppercase tracking-widest text-[#141414]/40 font-bold">Choice Option 1 *</label>
                          <input
                            type="text"
                            value={q.options[0]}
                            onChange={(e) => handleQuizOptionChange(idx, quizIdx, 0, e.target.value)}
                            placeholder="Option 1"
                            className="w-full px-3 py-1.5 bg-[#EBEBE6] border border-[#141414]/15 rounded-none text-xs focus:outline-none font-serif"
                            required
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[10px] font-mono uppercase tracking-widest text-[#141414]/40 font-bold">Choice Option 2 *</label>
                          <input
                            type="text"
                            value={q.options[1]}
                            onChange={(e) => handleQuizOptionChange(idx, quizIdx, 1, e.target.value)}
                            placeholder="Option 2"
                            className="w-full px-3 py-1.5 bg-[#EBEBE6] border border-[#141414]/15 rounded-none text-xs focus:outline-none font-serif"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center pt-1">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-mono uppercase tracking-widest text-[#141414]/40 block font-bold">Correct Option *</label>
                          <select
                            value={q.correctAnswerIndex}
                            onChange={(e) => handleQuizChange(idx, quizIdx, "correctAnswerIndex", parseInt(e.target.value))}
                            className="w-full px-3 py-1.5 bg-[#EBEBE6] border border-[#141414]/15 rounded-none text-xs focus:outline-none font-mono uppercase tracking-widest"
                          >
                            <option value={0}>Option 1 (Index 0)</option>
                            <option value={1}>Option 2 (Index 1)</option>
                          </select>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[10px] font-mono uppercase tracking-widest text-[#141414]/40 block font-bold">Explanation (Rationale) *</label>
                          <input
                            type="text"
                            value={q.explanation}
                            onChange={(e) => handleQuizChange(idx, quizIdx, "explanation", e.target.value)}
                            placeholder="This answer is correct because..."
                            className="w-full px-3 py-1.5 bg-[#EBEBE6] border border-[#141414]/15 rounded-none text-xs focus:outline-none font-serif"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end pt-6 border-t border-[#141414]/10">
            <button
              type="submit"
              className="px-6 py-3 bg-[#141414] hover:bg-opacity-95 text-[#F5F5F0] font-mono uppercase tracking-widest font-bold rounded-none text-xs transition-all cursor-pointer"
            >
              PUBLISH SYLLABUS TRACK
            </button>
          </div>
        </div>

      </form>
    </div>
  );
}
