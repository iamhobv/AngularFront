// export interface IExamDetails {
//     ExamTitle:string,
//     studentName:string
//     startedAt:string,
//     submittedAt:string,
//     totalScore:number,
//     totalStudents:number
// }

import { StudentResult } from "./student-result";



export interface IExamDetails {
  examTitle: string;
  studentResults: StudentResult[];
  totalStudents: number;
}