import { QuestionType } from './../../../Models/question-type';
import { routes } from './../../../app.routes';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ICreateQuestions } from '../../../Models/icreate-questions';
import { AddExamService } from '../../../Services/add-exam.service';

@Component({
  selector: 'app-add-exam',
  imports: [ReactiveFormsModule, CommonModule,FormsModule,RouterLink],
  templateUrl: './add-exam.component.html',
  styleUrl: './add-exam.component.css'
})
export class AddExamComponent {

  questionType = QuestionType;
  hours: number = 0;
  minutes: number = 0;

  questions: ICreateQuestions[] = [];
  questionIDs: number[] = [];

  constructor(
    private addExamService: AddExamService,
    private router: Router
  ) { }

  ExamForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    durationHours: new FormControl(0, [Validators.required, Validators.min(0)]),
    durationMinutes: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(59)]),
    duration: new FormControl('', Validators.required),
    teacherId: new FormControl('261ecd44-7a4e-461b-915c-7b699d76d248', Validators.required),
    examQuestionsIDs: new FormControl<number[]>([]) });

   get getTitle() {
    return this.ExamForm.controls['title'];
  }

  get getDuration() {
    return this.ExamForm.controls['duration'];
  }

  get questionCount(): number {
  return this.questionIDs.length;
}


 AddExam() {
  const hours = this.ExamForm.value.durationHours || 0;
  const minutes = this.ExamForm.value.durationMinutes || 0;
  const durationString = `${this.pad(hours)}:${this.pad(minutes)}:00`;

  this.ExamForm.patchValue({ 
    duration: durationString,
    examQuestionsIDs: this.questionIDs,
  });

  if (this.ExamForm.valid) {
    this.addExamService.AddExam(this.ExamForm.value).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['/T/home']);
      }
    });
  }
  else {
    console.log('Form is invalid. Errors:');
    Object.keys(this.ExamForm.controls).forEach(key => {
      const controlErrors = this.ExamForm.get(key)?.errors;
      if (controlErrors) {
        console.log(`- ${key}:`, controlErrors);
      }
    });
    this.ExamForm.markAllAsTouched();
  }
}

  
pad(num: number): string {
  return num < 10 ? `0${num}` : `${num}`;
}



  /*  Question */
  options = new FormArray([
  new FormControl('', Validators.required),
  new FormControl('', Validators.required)
  ]);

  QuestionForm = new FormGroup({
    questionBody: new FormControl('', Validators.required),
    questionType: new FormControl(this.questionType.MultipleChoice, Validators.required),
    questionMark: new FormControl(0, Validators.required),
    correctAnswer: new FormControl('', Validators.required),
    options: this.options,
  });

onQuestionTypeChange(){
  const Questiontype = this.QuestionForm.value.questionType;
  this.options.clear();

  if(Questiontype===this.questionType.TrueFalse){
     this.QuestionForm.patchValue({ correctAnswer: 'True' });
  }
  else{
    this.options.push(new FormControl('', Validators.required));
    this.options.push(new FormControl('', Validators.required));
  }
}
addOption() {
  this.options.push(new FormControl('', Validators.required));
}

removeOption(index: number) {
  this.options.removeAt(index);
}

  AddQuestion() {
    if (this.QuestionForm.valid) {
      const question: ICreateQuestions = this.QuestionForm.value as ICreateQuestions;
      

      this.addExamService.AddQuestion(question).subscribe({
        next: (res) => {
          if (res.isPass) {
            const NewQuestionId = res.data;
            this.questionIDs.push(NewQuestionId);
            console.log('Question added with ID:', NewQuestionId);
            this.resetQuestionForm();

          } else {
            console.error('Question not added ');
          }
        },
        error: (err) => {
          console.error('Error adding question:', err);
        }
      });
    }
    else {
      console.log('Form is invalid');
      this.QuestionForm.markAllAsTouched();
    }
  }

 private resetQuestionForm() {
    this.QuestionForm.reset({
      questionType: QuestionType.MultipleChoice,
      questionMark: 1
    });
    this.options.clear();
    this.addOption();
    this.addOption();
  }

}
