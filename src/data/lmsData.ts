export interface LMSStudent {
  id: number;
  name: string;
  class: string;
  rollNo: string;
  attendance: number;
  email: string;
  phone: string;
}

export interface LMSTeacher {
  id: number;
  name: string;
  subject: string;
  classes: string[];
  email: string;
  phone: string;
  status: "approved" | "pending";
  approvedBy?: string;
  approvedDate?: string;
}

export interface LMSAttendanceRecord {
  id: string;
  date: string;
  className: string;
  presentCount: number;
  absentCount: number;
  totalCount: number;
  records?: Record<number, "present" | "absent">; // Student IDs mapping
}

export interface LMSExam {
  id: number;
  title: string;
  className: string;
  subject: string;
  date: string;
  duration: number; // in mins
  totalMarks: number;
  status: "scheduled" | "completed";
  questions?: LMSExamQuestion[];
}

export interface LMSExamQuestion {
  id: number;
  examId: number;
  type: "mcq" | "descriptive";
  question: string;
  options?: string[];
  answer: string;
  explanation?: string;
  marks: number;
}

export interface LMSAssignment {
  id: number;
  title: string;
  className: string;
  subject: string;
  dueDate: string;
  submittedCount: number;
  totalCount: number;
  instruction?: string;
  submissions?: { studentId: number; studentName: string; answerText: string; grade?: string; feedback?: string }[];
}

export interface LMSTimetableSlot {
  day: string;
  slots: { time: string; subject: string; teacher: string }[];
}

export interface LMSMaterial {
  id: number;
  title: string;
  subject: string;
  fileType: string;
  size: string;
  dateAdded: string;
  downloadUrl?: string;
}

export interface LMSResult {
  id: number;
  examId: number;
  studentId: number;
  studentName: string;
  examTitle: string;
  subject: string;
  marksObtained: number;
  totalMarks: number;
  grade: string;
  isDescriptiveGraded?: boolean;
}

export const INITIAL_LMS_DATA = {
  students: [
    { id: 1, name: "Ali Hassan", class: "10-A", rollNo: "1001", attendance: 92, email: "ali@student.com", phone: "0300-1234567" },
    { id: 2, name: "Fatima Khan", class: "10-A", rollNo: "1002", attendance: 95, email: "fatima@student.com", phone: "0301-1234567" },
    { id: 3, name: "Usman Ahmed", class: "9-B", rollNo: "9021", attendance: 88, email: "usman@student.com", phone: "0302-1234567" },
    { id: 4, name: "Ayesha Malik", class: "9-B", rollNo: "9022", attendance: 91, email: "ayesha@student.com", phone: "0303-1234567" },
    { id: 5, name: "Hamza Sheikh", class: "10-A", rollNo: "1003", attendance: 85, email: "hamza@student.com", phone: "0304-1234567" }
  ] as LMSStudent[],

  teachers: [
    { 
      id: 1, 
      name: "Muhammad Shafiq Gurmani", 
      subject: "Mathematics & Computer Science", 
      classes: ["10-A", "9-B"], 
      email: "muhammadshafiqgurmani923@gmail.com", 
      phone: "0300-1234567", 
      status: "approved", 
      approvedBy: "Principal Admin", 
      approvedDate: "2024-09-01" 
    },
    { 
      id: 2, 
      name: "Sir Ahmed Raza", 
      subject: "Physics", 
      classes: ["10-A", "10-B"], 
      email: "ahmed@school.com", 
      phone: "0301-9876543", 
      status: "approved", 
      approvedBy: "Principal Admin", 
      approvedDate: "2024-09-01" 
    },
    { 
      id: 3, 
      name: "Ms. Zainab Ali", 
      subject: "English Literature", 
      classes: ["9-B", "10-A"], 
      email: "zainab@school.com", 
      phone: "0302-9876543", 
      status: "approved", 
      approvedBy: "Principal Admin", 
      approvedDate: "2024-09-01" 
    }
  ] as LMSTeacher[],

  pendingTeachers: [
    { 
      id: 4, 
      name: "Tariq Mehmood", 
      subject: "Chemistry & Molecular Sciences", 
      classes: ["10-A"], 
      email: "tariq@school.com", 
      phone: "0345-9876543", 
      status: "pending" 
    }
  ] as LMSTeacher[],

  classes: ["9-A", "9-B", "10-A", "10-B", "11-A", "11-B"],

  attendance: [
    { id: "att-1", date: "2024-10-01", className: "10-A", presentCount: 4, absentCount: 1, totalCount: 5 },
    { id: "att-2", date: "2024-10-02", className: "10-A", presentCount: 5, absentCount: 0, totalCount: 5 },
    { id: "att-3", date: "2024-10-03", className: "9-B", presentCount: 2, absentCount: 0, totalCount: 2 }
  ] as LMSAttendanceRecord[],

  exams: [
    { 
      id: 1, 
      title: "Mid-Term Mathematics Exam", 
      className: "10-A", 
      subject: "Mathematics", 
      date: "2026-06-20", 
      duration: 60, 
      totalMarks: 50, 
      status: "scheduled",
      questions: [
        { id: 101, examId: 1, type: "mcq", question: "Which algorithm is most optimal for searching a sorted list?", options: ["Linear Search", "Binary Search", "Bubble Sort", "Depth First Search"], answer: "Binary Search", explanation: "Binary search cuts search time dynamically to O(log n).", marks: 5 },
        { id: 102, examId: 1, type: "mcq", question: "In calculus, what is the derivative of x^2?", options: ["x", "2x", "2", "3x^2"], answer: "2x", explanation: "By power rule: d/dx of x^n is n*x^(n-1).", marks: 5 },
        { id: 103, examId: 1, type: "descriptive", question: "Briefly explain the practical application of Newton's Method for root finding.", answer: "", explanation: "It iteratively approximates mathematical zeroes using tangent lines.", marks: 10 }
      ]
    },
    { 
      id: 2, 
      title: "Physics Mechanics Mini Quiz 1", 
      className: "10-A", 
      subject: "Physics", 
      date: "2026-06-11", 
      duration: 20, 
      totalMarks: 10, 
      status: "completed",
      questions: [
        { id: 201, examId: 2, type: "mcq", question: "What represents acceleration due to gravity on earth's surface?", options: ["9.8 m/s^2", "5.4 m/s^2", "12.2 m/s^2", "9.8 km/s^2"], answer: "9.8 m/s^2", explanation: "Universal acceleration under earth standard limits.", marks: 5 }
      ]
    }
  ] as LMSExam[],

  assignments: [
    { 
      id: 1, 
      title: "Algebraic Equations Problem Set 5", 
      className: "10-A", 
      subject: "Mathematics", 
      dueDate: "2026-06-18", 
      submittedCount: 3, 
      totalCount: 5,
      instruction: "Solve questions 1 through 10 from syllabus Chapter 3 textbook and submit explanations.",
      submissions: [
        { studentId: 1, studentName: "Ali Hassan", answerText: "Completed standard algebra answers using matrices solution technique.", grade: "9/10", feedback: "Very comprehensive analytical formulas used." },
        { studentId: 2, studentName: "Fatima Khan", answerText: "Applied direct substitution values. Checked against linear equations parameters.", grade: "10/10", feedback: "Elegant presentation and flawless solutions!" }
      ]
    },
    { 
      id: 2, 
      title: "English Descriptive Essay: My Academic Dream Tracker", 
      className: "9-B", 
      subject: "English Literature", 
      dueDate: "2026-06-19", 
      submittedCount: 1, 
      totalCount: 2,
      instruction: "Draft a 300 words reflection exploring learning paths and development goals.",
      submissions: []
    }
  ] as LMSAssignment[],

  timetable: [
    { 
      day: "Monday / پیر", 
      slots: [
        { time: "08:00 - 08:45", subject: "Mathematics / ریاضی", teacher: "Muhammad Shafiq Gurmani" },
        { time: "08:45 - 09:30", subject: "Physics / طبیعیات", teacher: "Sir Ahmed Raza" }
      ] 
    },
    { 
      day: "Tuesday / منگل", 
      slots: [
        { time: "08:00 - 08:45", subject: "English Literature / انگریزی", teacher: "Ms. Zainab Ali" },
        { time: "08:45 - 09:30", subject: "Mathematics / ریاضی", teacher: "Muhammad Shafiq Gurmani" }
      ] 
    },
    { 
      day: "Wednesday / بدھ", 
      slots: [
        { time: "08:00 - 08:45", subject: "Physics / طبیعیات", teacher: "Sir Ahmed Raza" },
        { time: "08:45 - 09:30", subject: "Chemistry / کیمیا", teacher: "Tariq Mehmood" }
      ] 
    }
  ] as LMSTimetableSlot[],

  materials: [
    { id: 1, title: "Matrices & Functional Linear Algebra", subject: "Mathematics", fileType: "PDF Handout", size: "3.4 MB", dateAdded: "2026-06-01" },
    { id: 2, title: "Newtonian Classical Mechanics Handbook", subject: "Physics", fileType: "EPUB Document", size: "5.1 MB", dateAdded: "2026-06-05" },
    { id: 3, title: "Verbal syntax structure & grammar workbook", subject: "English Literature", fileType: "Digital Doc", size: "1.8 MB", dateAdded: "2026-05-28" }
  ] as LMSMaterial[],

  results: [
    { id: 1, examId: 2, studentId: 1, studentName: "Ali Hassan", examTitle: "Physics Mechanics Mini Quiz 1", subject: "Physics", marksObtained: 9, totalMarks: 10, grade: "A+" },
    { id: 2, examId: 2, studentId: 2, studentName: "Fatima Khan", examTitle: "Physics Mechanics Mini Quiz 1", subject: "Physics", marksObtained: 10, totalMarks: 10, grade: "A+" }
  ] as LMSResult[]
};
