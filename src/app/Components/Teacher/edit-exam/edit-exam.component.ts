import { AddExamService } from './../../../Services/add-exam.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UpdateExamService } from '../../../Services/update-exam.service';
import { QuestionType } from '../../../Models/question-type';
import { ICreateQuestions } from '../../../Models/icreate-questions';

@Component({
  selector: 'app-edit-exam',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './edit-exam.component.html',
  styleUrls: ['./edit-exam.component.css']
})
export class EditExamComponent {
  examId: any;
  examData: any;
  examForm: FormGroup;
  selectedQuestions: number[] = [];
  questionDetails: any[] = [];
  questionType = QuestionType;
  questions: ICreateQuestions[] = [];
  questionIDs: number[] = [];
  showAddQuestionForm = false;

  constructor(
    private _UpdateExamService: UpdateExamService,
    private addExamService: AddExamService,
    private router: Router,
    private _ActivatedRoute: ActivatedRoute,
    private _fb: FormBuilder
  ) {
    this.examForm = this._fb.group({
      title: ['', Validators.required],
      duration: ['', [Validators.required, Validators.pattern(/^\d+:\d{2}:\d{2}$/)]],
      questions: this._fb.array([])
    });

    this.QuestionForm = this._fb.group({
      questionBody: ['', Validators.required],
      questionType: [this.questionType.MultipleChoice, Validators.required],
      questionMark: [1, [Validators.required, Validators.min(1)]],
      correctAnswer: ['', Validators.required],
      options: this._fb.array([
        this._fb.control('', Validators.required),
        this._fb.control('', Validators.required)
      ])
    });
  }

  get getTitle() {
    return this.examForm.controls['title'];
  }

  get getDuration() {
    return this.examForm.controls['duration'];
  }

  get questionsArray(): FormArray {
    return this.examForm.get('questions') as FormArray;
  }

  get options(): FormArray {
    return this.QuestionForm.get('options') as FormArray;
  }

  QuestionForm: FormGroup;

  ngOnInit(): void {
    this.examId = this._ActivatedRoute.snapshot.paramMap.get('id');
    this.loadExamData();
  }

  loadExamData() {
    this._UpdateExamService.ShowExamById(this.examId).subscribe({
      next: (res) => {
        this.examData = res.data;
        this.questionDetails = res.data.questions;
        this.selectedQuestions = this.questionDetails.map((q: any) => q.questionId);
        
        this.examForm.patchValue({
          title: res.data.examTitle,
          duration: res.data.duration,
        });

        const questionArray = this.examForm.get('questions') as FormArray;
        this.questionDetails.forEach(q => {
          questionArray.push(this._fb.group({
            id: [q.questionId],
            body: [q.questionBody],
            type: [q.questionType],
            mark: [q.questionMark],
            options: [q.options || []]
          }));
        });
      },
      error: (err) => console.error(err)
    });
  }

  removeQuestion(index: number) {
    this.questionsArray.removeAt(index);
    this.selectedQuestions.splice(index, 1);
  }

  onQuestionTypeChange() {
    const questionType = this.QuestionForm.value.questionType;
    this.options.clear();

    if (questionType === this.questionType.TrueFalse) {
      this.QuestionForm.patchValue({ correctAnswer: 'True' });
    } else {
      this.options.push(this._fb.control('', Validators.required));
      this.options.push(this._fb.control('', Validators.required));
    }
  }

  addOption() {
    this.options.push(this._fb.control('', Validators.required));
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
            this.questionsArray.push(this._fb.group({
              id: [NewQuestionId],
              body: [question.questionBody],
              type: [question.questionType],
              mark: [question.questionMark],
              options: [question.options || []]
            }));
            this.resetQuestionForm();
            this.showAddQuestionForm = false;
          }
        },
        error: (err) => console.error('Error adding question:', err)
      });
    } else {
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

  toggleAddQuestionForm() {
    this.showAddQuestionForm = !this.showAddQuestionForm;
    if (!this.showAddQuestionForm) {
      this.resetQuestionForm();
    }
  }

  saveExam() {
    if (this.examForm.invalid) return;

    const updatedExam = {
      examId: this.examId,
      title: this.examForm.value.title,
      duration: this.examForm.value.duration,
      questionID: this.questionsArray.controls.map(q => q.value.id)
    };

    this._UpdateExamService.EditExam(this.examId, updatedExam).subscribe({
      next: res => {
        if (res === false) {
          alert('Failed to update exam.');
          return;
        }
        alert('Exam updated successfully');
        this.router.navigate(['/T/home']);
      },
      error: err => console.error('Error updating exam:', err)
    });
  }
}