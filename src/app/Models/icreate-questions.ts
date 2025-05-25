import { QuestionType } from "./question-type";

export interface ICreateQuestions {
     questionBody: string,
     questionType: QuestionType,
     questionMark: number,
     correctAnswer: string,
     options: string[];
}

