export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  content: string; // HTML or Markdown string for the lesson content
  resources?: { name: string; url: string }[];
  quiz?: QuizQuestion[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  category: "Development" | "Design" | "Business" | "Science" | "Custom";
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  instructor: string;
  duration: string;
  rating: number;
  lessons: Lesson[];
  imageUrl?: string;
}

export interface LessonProgress {
  lessonId: string;
  completed: boolean;
  quizScore?: number; // Score achieved out of the total questions if taken
  quizTaken: boolean;
}

export interface CourseProgress {
  courseId: string;
  enrolledAt: string;
  completedLessons: string[]; // List of lesson IDs completed
  lessonProgress: Record<string, LessonProgress>;
  overallProgressPercentage: number;
  lastAccessedAt: string;
}

export interface UserStats {
  studyGoalMinutes: number; // Daily goal, e.g., 30 minutes
  totalStudyMinutes: number;
  lastActiveDate: string;
  streakDays: number;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  unlockedAt: string;
  iconName: string; // Name of Lucide icon
  color: string;
}

export interface StudyNote {
  courseId: string;
  lessonId: string;
  noteText: string;
  updatedAt: string;
}
