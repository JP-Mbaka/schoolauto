import { z } from "zod";

export declare type SummaryRow = {
  "S/N": number;
  Term: number;
  Level: string;
  Session?: string;
  Avg: number;
  Position: number;
};

export interface createAccountResponse {
  success: boolean;
  data: {
    message: string;
    user: {
      user_uuid: string;
      email: string;
      role: string;
      status: string;
      first_name: string;
      last_name: string;
      phone: unknown;
      profile_picture: unknown;
      student_id: string;
      teacher_id: number;
      email_verified: boolean;
      last_login: unknown;
      created_by: string;
      updated_by: string;
      created_at: string;
      updated_at: string;
      //Extras
      currentLevel?: "SS1" | "SS2" | "SS3";
      gender: string;
      salutation: string;
    };
    activation_token: string;
  };
}

export const createAccountSchema = z.object({
  email: z.string().min(1),
  role: z.string().min(1),
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  student_id: z.string().optional(),
  teacher_id: z.string().optional(),
});

export const authSchema = z.object({
  email: z.string().min(1),
  password: z.string().min(1),
});

//Subject type
export interface subjectSchema {
  subjectId: string;
  subjectTitle: string;
  level: "SS1" | "SS2" | "SS3";
  // term: number;
}

//Course Work
export interface courseWork {
  lessonId: string;
  lessonIndex: number;
  subjectId: string;
  lessonTopic: string;
  lessonFile: string;
  lessonVideo: string;
  term: 1 | 2 | 3;
  level: "SS1" | "SS2" | "SS3";
}

//Grades
interface CA {
  title: string;
  total: number;
  score: number;
}
interface gradeSubject {
  subjectId: string;
  session: string;
  ca: CA[];
  exam: CA;
  gradeAverage: number;
  position: number;
  highestGrade: number;
  lowestGrade: number;
  term: 1 | 2 | 3;
  level: "SS1" | "SS2" | "SS3";
}
export interface gradesType {
  gradeId: string;
  userId: string;
  subjects: gradeSubject[];
  studentTotal: number;
  classAverage: number;
  classPosition: number;
  session: string;
}
